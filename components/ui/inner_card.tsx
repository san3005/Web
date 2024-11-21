"use client";

import React, { useRef } from "react";
import { AnimatedBeam } from "@/components/ui/animated-beam";

// Circle component with labels and directional clarity
const CircleWithLabel = ({ refProp, icon, label, color }) => (
  <div className="flex flex-col items-center space-y-2">
    <div
      ref={refProp}
      className={`flex items-center justify-center rounded-full border-2 bg-white p-2 shadow-md`}
      style={{
        width: "70px",
        height: "70px",
        borderColor: color,
        boxShadow: `0 0 10px ${color}`,
      }}
    >
      {icon}
    </div>
    <span className="text-sm font-medium text-gray-700">{label}</span>
  </div>
);

export function MultiModalAnalysisDemo() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const textRef = useRef(null);
  const aiRef = useRef(null);
  const insightsRef = useRef(null);

  return (
    <div
      className="relative flex flex-col items-center justify-center p-8 rounded-lg bg-gray-100"
      ref={containerRef}
      style={{
        border: "1px solid #E5E7EB",
      }}
    >
      {/* Input Nodes */}
      <div className="flex space-x-8">
        <CircleWithLabel
          refProp={videoRef}
          icon={<Icons.video />}
          label="Video Input"
          color="#6B46C1"
        />
        <CircleWithLabel
          refProp={audioRef}
          icon={<Icons.audio />}
          label="Audio Input"
          color="#3182CE"
        />
        <CircleWithLabel
          refProp={textRef}
          icon={<Icons.text />}
          label="Text Input"
          color="#38A169"
        />
      </div>

      {/* AI Processing Node */}
      <div className="flex justify-center my-8">
        <CircleWithLabel
          refProp={aiRef}
          icon={<Icons.ai />}
          label="AI Processing"
          color="#D69E2E"
        />
      </div>

      {/* Output Node */}
      <div className="flex justify-center">
        <CircleWithLabel
          refProp={insightsRef}
          icon={<Icons.insight />}
          label="Insights"
          color="#E53E3E"
        />
      </div>

      {/* Arrows for Data Flow */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={videoRef}
        toRef={aiRef}
        duration={2}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={audioRef}
        toRef={aiRef}
        duration={2}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={textRef}
        toRef={aiRef}
        duration={2}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={aiRef}
        toRef={insightsRef}
        duration={2}
      />
    </div>
  );
}

// Updated Icons
const Icons = {
  video: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8 text-purple-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14m0-4v4m0-4H5a2 2 0 00-2 2v4a2 2 0 002 2h10m0-8v4" />
    </svg>
  ),
  audio: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8 text-blue-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path d="M9 19V6l-7 3v6m16.857-7.857A4.486 4.486 0 0121 10.5v3a4.486 4.486 0 01-1.143 3.357M9 15a4.5 4.5 0 109 0v-6a4.5 4.5 0 00-9 0z" />
    </svg>
  ),
  text: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8 text-green-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path d="M7 10h10m-6 4h6M7 6h10" />
    </svg>
  ),
  ai: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8 text-yellow-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 16v4M12 4v4M16 12h4M4 12h4" />
    </svg>
  ),
  insight: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8 text-red-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" />
    </svg>
  ),
};
