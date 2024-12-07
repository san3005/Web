"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { ConfirmationModal } from "@/components/ui/feedbackmodal";

const FeedbackForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [name, setName] = useState(""); // New state for name
  const [feedback, setFeedback] = useState("");
  const [isClosing, setIsClosing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (feedback.trim() === "") {
      alert("Please enter your feedback before submitting.");
      return;
    }

    try {
      await addDoc(collection(db, "feedback"), {
        name: name.trim() || "Anonymous", // Save name or "Anonymous"
        feedback,
        status: "Pending",
        timestamp: new Date(),
      });

      setShowConfirmation(true); // Show the confirmation modal
      setFeedback(""); // Clear the feedback input
      setName(""); // Clear the name input
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("An error occurred while submitting feedback. Please try again.");
    }
  };

  const handleClose = () => {
    setFeedback("");
    setName(""); // Clear the name input
    setShowConfirmation(false); // Close modal
    setIsClosing(true); // Animate feedback form closure
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <>
      {!showConfirmation && (
        <div
          className={`p-6 bg-white/60 backdrop-blur-md rounded-3xl shadow-lg relative transform transition-all duration-300 ${
            isClosing ? "opacity-0 scale-90" : "opacity-100 scale-100"
          }`}
        >
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-transform duration-300 hover:rotate-90 hover:scale-110 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <h2 className="text-lg font-semibold mb-4 text-gray-900">
            Provide Your Feedback
          </h2>
          <form onSubmit={handleSubmit}>
            <label className="block mb-4">
              <span className="text-gray-700">Name (Optional):</span>
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleNameChange}
                placeholder="Enter your name (optional)"
                className="w-full mt-2 p-4 border border-gray-300 rounded-xl bg-white/70 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </label>
            <label className="block mb-4">
              <span className="text-gray-700">Feedback:</span>
              <textarea
                name="feedback"
                value={feedback}
                onChange={handleFeedbackChange}
                placeholder="Enter your feedback here..."
                required
                className="w-full mt-2 p-4 border border-gray-300 rounded-xl bg-white/70 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
              ></textarea>
            </label>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setFeedback("")}
                className="mr-2 bg-gray-300 rounded-xl text-gray-700 px-4 py-2 hover:bg-gray-400 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 transition-all duration-200"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}

      <AnimatePresence>
        {showConfirmation && <ConfirmationModal onClose={handleClose} />}
      </AnimatePresence>
    </>
  );
};

export default FeedbackForm;
