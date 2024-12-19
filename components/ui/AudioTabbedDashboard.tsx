"use client";

import React, { useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { cn } from "@/lib/utils";
import EnglishPlayer from "@/components/ui/englishaudio";
import SpanishPlayer from "@/components/ui/Spanishaudio";

export default function Component() {
  const [activeTab, setActiveTab] = useState("english");
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  const x = useMotionValue(0);
  const springX = useSpring(x, {
    stiffness: 100,
    damping: 30,
    mass: 1,
  });

  useEffect(() => {
    x.set(activeTab === "english" ? 0 : 200); // Adjust this value based on your tab width
  }, [activeTab, x]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="rounded-3xl flex flex-col items-center mx-auto">
      <motion.div
        className="bg-[#F9F9F9] rounded-3xl shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Tabs Section */}
        <header className="relative flex justify-center mb-6 top-2">
          <div className="relative flex space-x-6 bg-[#E8E8E8] p-1 rounded-3xl w-[400px]">
            {/* Sliding Background */}
            <motion.div
              className="absolute top-1 bottom-1 rounded-full"
              style={{
                backgroundColor:
                  activeTab === "english" ? "#2A6F97" : "#ff6b2c",
                width: "calc(51% - 8px)", // Ensure this width matches the button's width
                x: springX,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            {["english", "spanish"].map((tab) => (
              <motion.button
                key={tab}
                className={cn(
                  "relative z-10 flex-1 py-2 rounded-full font-semibold transition-colors",
                  activeTab === tab ? "text-white" : "text-gray-700"
                )}
                onClick={() => handleTabChange(tab)}
                onMouseEnter={() => setHoveredTab(tab)}
                onMouseLeave={() => setHoveredTab(null)}
                animate={{
                  scale: hoveredTab === tab ? 1.05 : 1,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {tab === "english" ? "English Version" : "Spanish Version"}
              </motion.button>
            ))}
          </div>
        </header>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "english" ? <EnglishPlayer /> : <SpanishPlayer />}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
