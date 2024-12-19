"use client";

import { motion } from "framer-motion";
import React, { useCallback } from "react";

interface WaveformSeekerProps {
  progress: number;
  onSeek: (time: number) => void;
  duration: number;
}

export function WaveformSeeker({
  progress,
  onSeek,
  duration,
}: WaveformSeekerProps) {
  const wavePoints = 120; // Increased for smoother waves
  const amplitude = 8; // Subtle wave height
  const frequency = 0.25; // Gentle wave frequency

  // Generate the wave path dynamically
  const generateWavePath = useCallback(
    (offset: number) => {
      let path = `M 0 ${50 + Math.sin(offset) * amplitude} `;

      for (let i = 0; i <= wavePoints; i++) {
        const x = (i / wavePoints) * 100;
        const y = 50 + Math.sin(i * frequency + offset) * amplitude;
        path += `L ${x} ${y} `;
      }

      return path;
    },
    [amplitude, frequency, wavePoints]
  );

  const handleSeek = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const seekPercentage = x / rect.width;
      onSeek(seekPercentage * duration);
    },
    [onSeek, duration]
  );

  return (
    <div className="relative w-full h-12 group">
      {/* SVG Waveform */}
      <svg
        className="w-full h-full cursor-pointer"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        onClick={handleSeek}
      >
        {/* Background Wave */}
        <motion.path
          d={generateWavePath(0)}
          fill="none"
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="1.5"
          animate={{
            d: [
              generateWavePath(0),
              generateWavePath(Math.PI),
              generateWavePath(Math.PI * 2),
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Progress Wave */}
        <motion.path
          d={generateWavePath(0)}
          fill="none"
          stroke="url(#waveGradient)"
          strokeWidth="2"
          clipPath="url(#progressClip)"
          animate={{
            d: [
              generateWavePath(0),
              generateWavePath(Math.PI),
              generateWavePath(Math.PI * 2),
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Gradient Definition */}
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#A855F7" />
          </linearGradient>
          <clipPath id="progressClip">
            <rect x="0" y="0" width={`${progress}%`} height="100" />
          </clipPath>
        </defs>

        {/* Seek Handle */}
        <motion.circle
          cx={`${progress}%`}
          cy="50"
          r="4"
          fill="white"
          stroke="#38BDF8"
          strokeWidth="1.5"
          className="opacity-100 transition-transform group-hover:scale-125"
        />
      </svg>

      {/* Progress Overlay */}
      <div
        className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500/20 to-purple-500/10 pointer-events-none"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
