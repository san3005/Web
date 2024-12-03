"use client";

import React from "react";

import { cn } from "@/lib/utils";

interface PulsatingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pulseColor?: string;
  duration?: string;
}

export default function PulsatingButton({
  className,
  children,
  pulseColor = "rgba(128, 90, 213, 0.5)", // Light purple pulse effect
  duration = "1.5s",
  ...props
}: PulsatingButtonProps) {
  return (
    <button
      className={cn(
        "relative text-center cursor-pointer flex justify-center items-center rounded-full text-white bg-purple-600 px-6 py-3 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl",
        className
      )}
      style={
        {
          "--pulse-color": pulseColor,
          "--duration": duration,
        } as React.CSSProperties
      }
      {...props}
    >
      {/* Button Content */}
      <div className="relative z-10 font-medium">{children}</div>

      {/* Pulsating Background */}
      <div
        className="absolute top-1/2 left-1/2 w-full h-full  bg-inherit animate-pulse -translate-x-1/2 -translate-y-1/2 rounded-xl"
        style={{
          animationDuration: duration,
          backgroundColor: pulseColor,
        }}
      ></div>
    </button>
  );
}
