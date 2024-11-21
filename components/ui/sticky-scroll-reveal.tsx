"use client";

import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { BorderBeam } from "@/components/ui/border-beam"; // Adjust path as necessary

const linearGradients = ["linear-gradient(to bottom right, #C4B5FD, #E0C3FC)"];
export const StickyScroll = ({
  contentClassName,
}: {
  contentClassName?: string;
}) => {
  const content = [
    {
      title: "Multi-Modal Analysis",
      description:
        "Capture emotional nuances from both visual and audio cues, providing a more comprehensive view of mental health. By analyzing facial expressions, vocal tone, and speech patterns, the system captures complex emotional states that contribute to a holistic understanding of mental health.",
      component: <BorderBeam />,
    },
    {
      title: "Session Summaries",
      description:
        "Receive summarized insights for each session, designed to highlight key shifts in emotional and mental health. These summaries allow patients and practitioners to track changes over time, fostering a better understanding of the mental health journey and supporting more informed care decisions.",
    },
    {
      title: "AI-Powered Psychometric Insights",
      description:
        "Leverage advanced AI-driven psychometric insights to gain a deeper understanding of emotional and behavioral patterns. The system provides interpretations based on emotional and behavioral data, helping practitioners and patients uncover underlying psychological factors, and offering a new perspective on mental health.",
      component: <BorderBeam />, // White background component for the second car
    },
  ];

  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) =>
        Math.abs(latest - breakpoint) < Math.abs(latest - cardsBreakpoints[acc])
          ? index
          : acc,
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  const backgroundColors = ["#F8F5FF"];

  const [backgroundGradient, setBackgroundGradient] = useState(
    linearGradients[0]
  );
  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard]); // Removed `linearGradients` from dependencies

  return (
    <motion.div
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      className="h-[32rem] overflow-y-auto -top-10 flex justify-center relative space-x-10 rounded-3xl p-10 hide-scrollbar"
      ref={ref}
    >
      <div className="relative flex items-start px-4 ">
        <div className="max-w-2xl ">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-20">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="text-3xl font-bold text-[#4A3F55]"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="text-lg text-[#6D5A7A] max-w-sm mt-4"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      <div
        style={{ background: backgroundGradient }}
        className={cn(
          "hidden lg:block h-60 w-80 rounded-md bg-white sticky top-10 overflow-hidden",
          contentClassName
        )}
      >
        {content[activeCard].component ?? null}
      </div>
    </motion.div>
  );
};
