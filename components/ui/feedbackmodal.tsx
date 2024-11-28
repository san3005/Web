"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export function ConfirmationModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center "
      onClick={onClose} // Close on background click
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="p-6 bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-4 flex justify-center"
        >
          <CheckCircle className="w-16 h-16 text-purple-500" />
        </motion.div>
        <h2 className="text-lg font-semibold text-center mb-2 text-gray-900">
          Thank You!
        </h2>
        <p className="text-gray-700 text-center mb-4">
          Your feedback has been submitted successfully.
        </p>
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 transition-all duration-200"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
