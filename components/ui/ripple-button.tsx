"use client";

import React, { MouseEvent, useEffect, useState } from "react";

interface RippleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  rippleColor?: string;
  duration?: string;
}

const RippleButton = React.forwardRef<HTMLButtonElement, RippleButtonProps>(
  (
    {
      className = "",
      children,
      rippleColor = "rgba(0, 0, 0, 0.3)", // Default ripple color
      duration = "600ms", // Ripple animation duration
      onClick,
      ...props
    },
    ref
  ) => {
    const [ripples, setRipples] = useState<
      Array<{ x: number; y: number; size: number; key: number }>
    >([]);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      createRipple(event);
      onClick?.(event);
    };

    const createRipple = (event: MouseEvent<HTMLButtonElement>) => {
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;

      const newRipple = { x, y, size, key: Date.now() };
      setRipples((prevRipples) => [...prevRipples, newRipple]);
    };

    useEffect(() => {
      if (ripples.length > 0) {
        const timeout = setTimeout(() => {
          setRipples((prevRipples) => prevRipples.slice(1));
        }, parseInt(duration));
        return () => clearTimeout(timeout);
      }
    }, [ripples, duration]);

    return (
      <button
        className={`relative overflow-hidden rounded-full px-6 py-3 font-semibold text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-300 ${className}`}
        onClick={handleClick}
        ref={ref}
        {...props}
      >
        <span className="relative z-10">{children}</span>
        <span className="absolute inset-0 pointer-events-none">
          {ripples.map((ripple) => (
            <span
              key={ripple.key}
              className="absolute animate-rippling rounded-full"
              style={{
                width: `${ripple.size}px`,
                height: `${ripple.size}px`,
                top: `${ripple.y}px`,
                left: `${ripple.x}px`,
                backgroundColor: rippleColor,
                animationDuration: duration,
              }}
            ></span>
          ))}
        </span>
      </button>
    );
  }
);

RippleButton.displayName = "RippleButton";

export default RippleButton;
