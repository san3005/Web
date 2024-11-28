"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FeedbackForm from "@/components/ui/feedbackform";
import PulsatingButton from "@/components/ui/pulsating-button";
import { ModalProvider } from "@/components/ui/animated-modal";

const FloatingFeedbackButton: React.FC = () => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  const handleFeedbackClick = () => {
    setShowFeedbackForm(true);
    document.body.style.overflow = "hidden";
  };

  const closeFeedbackForm = () => {
    setShowFeedbackForm(false);
    document.body.style.overflow = "auto";
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeFeedbackForm();
    }
  };

  return (
    <ModalProvider>
      <AnimatePresence>
        {!showFeedbackForm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-8 right-8 z-50"
          >
            <PulsatingButton
              pulseColor="rgba(147, 51, 234, 0.5)"
              duration="2s"
              onClick={handleFeedbackClick}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl transition-all duration-200"
            >
              Give Feedback
            </PulsatingButton>
          </motion.div>
        )}

        {showFeedbackForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50"
            aria-hidden={!showFeedbackForm}
            aria-modal="true"
            role="dialog"
            onClick={handleBackdropClick}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-11/12 max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <FeedbackForm onClose={closeFeedbackForm} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ModalProvider>
  );
};

export default FloatingFeedbackButton;
