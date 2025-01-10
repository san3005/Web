"use client";

import { useConversation } from "@11labs/react";
import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, X } from "lucide-react";
import { GradientCircle } from "@/components/ui/gradient-circle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Conversation() {
  const [isOpen, setIsOpen] = useState(false);

  // Initialize conversation with event handlers
  const conversation = useConversation({
    onConnect: () => console.log("Connected to conversation"),
    onDisconnect: () => console.log("Disconnected from conversation"),
    onMessage: (message) => console.log("Message received:", message),
    onError: (error) => {
      console.error("Socket error:", error);
    },
  });

  // Start conversation session
  const startConversation = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });

      await conversation.startSession({
        agentId: "5qH427HJtbwwmQEvQeCB", // Replace with your valid agentId
      });
      console.log("Conversation started successfully");
    } catch (error) {
      console.error("Failed to start conversation:", error);
    }
  }, [conversation]);

  // Stop conversation session
  const stopConversation = useCallback(async () => {
    try {
      await conversation.endSession();
      console.log("Conversation stopped successfully");
    } catch (error) {
      console.error("Failed to stop conversation:", error);
    }
  }, [conversation]);

  const isConnected = conversation.status === "connected";

  return (
    <div className="fixed bottom-8 left-8 z-50 flex flex-col items-center">
      {/* Main conversation UI */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mb-4 bg-black bg-opacity-80 p-4 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col items-center gap-4">
              {/* Gradient circle indicator */}
              <GradientCircle
                isActive={isConnected}
                isSpeaking={conversation.isSpeaking}
              />

              {/* Control buttons */}
              <div className="flex gap-2">
                <Button
                  onClick={startConversation}
                  disabled={isConnected}
                  size="sm"
                  className="bg-gradient-to-r from-[#0072F5] to-[#00B7FF] hover:opacity-90"
                >
                  Start
                </Button>
                <Button
                  onClick={stopConversation}
                  disabled={!isConnected}
                  size="sm"
                  variant="destructive"
                  className="bg-gradient-to-r from-[#0072F5] to-[#00B7FF] hover:opacity-90"
                >
                  Stop
                </Button>
              </div>

              {/* Connection status */}
              <div className="flex items-center gap-2 text-xs text-gray-300">
                <div
                  className={cn(
                    "w-1.5 h-1.5 rounded-full",
                    isConnected ? "bg-green-400" : "bg-gray-500"
                  )}
                />
                {isConnected ? "Connected" : "Disconnected"}
                {isConnected && (
                  <span className="ml-1">
                    • {conversation.isSpeaking ? "Speaking" : "Listening"}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating action button */}
      <motion.button
        className="bg-gradient-to-r from-[#0072F5] via-[#00B7FF] to-[#00D1FF] rounded-full p-3 shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Mic className="w-6 h-6 text-white" />
        )}
      </motion.button>
    </div>
  );
}
