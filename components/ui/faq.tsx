import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type FAQItem = {
  question: string;
  answer: string;
};

const faqData: FAQItem[] = [
  {
    question: "What is MindMatrix?",
    answer:
      "MindMatrix is an advanced technology designed to provide real-time psychometric analysis and insights through interactive sessions. It analyzes facial expressions, vocal tones, and speech patterns to offer a comprehensive understanding of an individual's emotional and mental health.",
  },
  {
    question: "How does MindMatrix work?",
    answer:
      "MindMatrix uses multi-modal input analysis to examine both visual and audio signals. It captures facial expressions, vocal tones, and speech patterns to detect emotional nuances and provide a holistic view of mental health.",
  },
  {
    question: "What are the key features of MindMatrix?",
    answer:
      "Key features of MindMatrix include multi-modal input analysis (examining both visual and audio signals), session summaries (providing concise overviews of each session), and AI-powered psychometric insights (interpreting emotional and behavioral patterns).",
  },
  {
    question: "Who can benefit from using MindMatrix?",
    answer:
      "MindMatrix can benefit mental health professionals, therapists, counselors, and individuals seeking to gain deeper insights into their emotional and mental well-being.",
  },
  {
    question: "Is MindMatrix a replacement for traditional therapy?",
    answer:
      "No, MindMatrix is not a replacement for traditional therapy. It's a tool designed to complement and enhance the work of mental health professionals by providing additional insights and data.",
  },
];

// const faqData: FAQItem[] = [
//   {
//     question: "What is MindMatrix?",
//     answer:
//       "MindMatrix is an advanced technology designed to provide real-time psychometric analysis and insights through interactive sessions. It analyzes facial expressions, vocal tones, and speech patterns to offer a comprehensive understanding of an individual's emotional and mental health.",
//   },
//   {
//     question: "How does MindMatrix work?",
//     answer:
//       "MindMatrix uses multi-modal analysis to examine both visual and audio signals. It captures facial expressions, vocal tones, and speech patterns to detect emotional nuances and provide a holistic view of mental health.",
//   },
//   {
//     question: "What are the key features of MindMatrix?",
//     answer:
//       "Key features of MindMatrix include multi-modal analysis (examining both visual and audio signals), session summaries (providing concise overviews of each session), and AI-powered psychometric insights (interpreting emotional and behavioral patterns).",
//   },
//   {
//     question: "Who can benefit from using MindMatrix?",
//     answer:
//       "MindMatrix can benefit mental health professionals, therapists, counselors, and individuals seeking to gain deeper insights into their emotional and mental well-being.",
//   },
//   {
//     question: "Is MindMatrix a replacement for traditional therapy?",
//     answer:
//       "No, MindMatrix is not a replacement for traditional therapy. It's a tool designed to complement and enhance the work of mental health professionals by providing additional insights and data.",
//   },
//   {
//     question: "How accurate are MindMatrix's insights?",
//     answer:
//       "MindMatrix uses advanced AI technology to provide accurate insights. However, as with any AI-based tool, its insights should be interpreted in conjunction with professional expertise and not used as a sole diagnostic tool.",
//   },
//   {
//     question: "How is my data protected when using MindMatrix?",
//     answer:
//       "MindMatrix takes data privacy seriously. All data is encrypted and stored securely. For specific details about data protection measures, please contact MindMatrix directly or refer to their privacy policy.",
//   },
// ];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="w-full max-w-3xl mx-auto pb-70 z-50 bg-white">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Frequently Asked Questions
      </h1>
      <div className="space-y-4 pb-20">
        {faqData.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg">
            <button
              className="flex justify-between items-center w-full p-4 text-left"
              onClick={() => toggleItem(index)}
            >
              <span className="font-medium text-gray-700">{item.question}</span>
              {openItems.includes(index) ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>
            {openItems.includes(index) && (
              <div className="p-4 pt-0">
                <p className="text-gray-600">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
