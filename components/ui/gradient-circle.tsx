"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GradientCircleProps {
  isActive?: boolean;
  isSpeaking?: boolean;
  className?: string;
}

export function GradientCircle({
  isActive,
  isSpeaking,
  className,
}: GradientCircleProps) {
  return (
    <motion.div
      className={cn("relative w-16 h-16", className)}
      animate={{
        scale: isActive ? [1, 1.05, 1] : 1,
      }}
      transition={{
        duration: 1,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    >
      <motion.div
        className={cn(
          "absolute inset-0 rounded-full",
          "bg-gradient-to-r from-[#0072F5] via-[#00B7FF] to-[#00D1FF]"
        )}
        animate={{
          rotate: isActive ? 360 : 0,
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className={cn(
          "absolute inset-1 rounded-full bg-black",
          "flex items-center justify-center"
        )}
      >
        <motion.div
          className={cn(
            "w-12 h-12 rounded-full",
            "bg-gradient-to-r from-[#0072F5] to-[#00B7FF]",
            "flex items-center justify-center"
          )}
          animate={{
            scale: isSpeaking ? [1, 1.1, 1] : 1,
          }}
          transition={{
            duration: 0.3,
            repeat: Infinity,
          }}
        >
          <div className="w-10 h-10 rounded-full bg-black" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
