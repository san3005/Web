"use client";

import React, { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle, XCircle } from "lucide-react";

// ---------------------
// 1) QUESTIONS AND SUBSCALES
// ---------------------

const ghq28Questions: string[] = [
  "Have you been feeling perfectly well and in good health?",
  "Have you been feeling in need of a good tonic?",
  "Have you been feeling run down and out of sorts?",
  "Have you felt that you are ill?",
  "Have you been getting any pains in your head?",
  "Have you been getting a feeling of tightness or pressure in your head?",
  "Have you been having hot or cold spells?",
  "Have you lost much sleep over worry?",
  "Have you had difficulty staying asleep once you are off?",
  "Have you been feeling constantly under strain?",
  "Have you been getting edgy and bad-tempered?",
  "Have you been getting scared or panicky for no good reason?",
  "Have you found everything getting on top of you?",
  "Have you been feeling nervous and strung-up all the time?",
  "Have you been managing to keep yourself busy and occupied?",
  "Have you been taking longer over the things you do?",
  "Have you felt on the whole you were doing things well?",
  "Have you been satisfied with the way you've carried out your tasks?",
  "Have you felt that you are playing a useful part in things?",
  "Have you felt capable of making decisions about things?",
  "Have you been able to enjoy your normal day-to-day activities?",
  "Have you been thinking of yourself as a worthless person?",
  "Have you felt that life is entirely hopeless?",
  "Have you felt that life isn’t worth living?",
  "Have you thought of the possibility that you might make away with yourself?",
  "Have you found at times you couldn’t do anything because your nerves were too bad?",
  "Have you found yourself wishing you were dead and away from it all?",
  "Have you found that the idea of taking your own life kept coming into your mind?",
];

// Subscale definitions, each with question indices relevant to that subscale
const ghq28Subscales = [
  {
    name: "Somatic Symptoms",
    questions: [0, 1, 2, 3, 4, 5, 6],
  },
  {
    name: "Anxiety/Insomnia",
    questions: [7, 8, 9, 10, 11, 12, 13],
  },
  {
    name: "Social Dysfunction",
    questions: [14, 15, 16, 17, 18, 19, 20],
  },
  {
    name: "Severe Depression",
    questions: [21, 22, 23, 24, 25, 26, 27],
  },
];

// Each response option is mapped to a numeric value
const responseOptions: { value: number; label: string }[] = [
  { value: 0, label: "Not at all" },
  { value: 1, label: "No more than usual" },
  { value: 2, label: "Rather more than usual" },
  { value: 3, label: "Much more than usual" },
];

// ---------------------
// 2) BROCHURE LINKS
// ---------------------
// Adjust these file paths to where your brochures are stored (e.g. /public/brochures/...).
// The key matches the subscale name exactly, so ensure the strings match.
const brochureLinks: { [key: string]: { name: string; url: string }[] } = {
  "Somatic Symptoms": [{ name: "Somatic Symptoms Brochure", url: "/D1.pdf" }],
  "Anxiety/Insomnia": [
    { name: "Anxiety Brochure", url: "/D3.pdf" },
    { name: "Insomnia Brochure", url: "/D2.pdf" },
  ],
  "Social Dysfunction": [
    { name: "Social Dysfunction Brochure", url: "/D4.pdf" },
  ],
  "Severe Depression": [{ name: "Severe Depression Brochure", url: "/D5.pdf" }],
};

// ---------------------
// 3) MAIN COMPONENT
// ---------------------
export default function GHQ28Questionnaire() {
  // Number of questions in total
  const totalQuestions = ghq28Questions.length;

  // Local states to manage the questionnaire flow and results
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [responses, setResponses] = useState<number[]>(
    new Array(totalQuestions).fill(-1)
  );
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [analysis, setAnalysis] = useState<{
    totalSeverity: string;
    subscaleSeverities: { [key: string]: string };
    affectedCategories: string[];
    unaffectedCategories: string[];
  } | null>(null);

  // Handles the user's choice in the current question
  const handleResponse = (value: string) => {
    const selectedValue = parseInt(value);
    const updatedResponses = [...responses];
    updatedResponses[currentQuestion] = selectedValue;
    setResponses(updatedResponses);

    // Move to next question automatically after selecting an option
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  // Helper function to determine severity based on a subscale or overall average
  const calculateSeverity = (score: number): string => {
    if (score <= 6) return "Low";
    if (score <= 11) return "Moderate";
    return "High";
  };

  // Analyze the responses for each subscale
  const analyzeResponses = (responses: number[]) => {
    const subscaleScores: { [key: string]: number } = {};
    const subscaleSeverities: { [key: string]: string } = {};
    const affectedCategories: string[] = [];
    const unaffectedCategories: string[] = [];

    // Calculate each subscale's score and severity
    ghq28Subscales.forEach((subscale) => {
      const score = subscale.questions.reduce(
        (acc, q) => acc + responses[q],
        0
      );
      subscaleScores[subscale.name] = score;

      const severity = calculateSeverity(score);
      subscaleSeverities[subscale.name] = severity;

      if (severity === "Low") {
        unaffectedCategories.push(subscale.name);
      } else {
        affectedCategories.push(subscale.name);
      }
    });

    // Total average is the total sum divided by 4 (since 4 subscales)
    const totalScore = Object.values(subscaleScores).reduce(
      (acc, score) => acc + score,
      0
    );
    const totalSeverity = calculateSeverity(totalScore / 4);

    return {
      totalSeverity,
      subscaleSeverities,
      affectedCategories,
      unaffectedCategories,
    };
  };

  // Final submission: check all questions answered, then analyze
  const handleSubmit = () => {
    if (responses.some((response) => response < 0)) {
      alert("Please answer all questions before submitting.");
      return;
    }
    const analysisResult = analyzeResponses(responses);
    setAnalysis(analysisResult);
    setIsSubmitted(true);
  };

  // Retake the questionnaire from scratch
  const handleRetake = () => {
    setResponses(new Array(totalQuestions).fill(-1));
    setAnalysis(null);
    setIsSubmitted(false);
    setCurrentQuestion(0);
  };

  // Progress bar calculation
  const progressPercentage = ((currentQuestion + 1) / totalQuestions) * 100;

  // ---------------------
  // 4) RENDER
  // ---------------------
  return (
    <div className="min-h-screen rounded-2xl bg-[#fff] items-start justify-center p-4 text-[#4A4A4A]">
      {/* Heading / Intro Section */}
      <section className="w-full py-24 bg-white text-center">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-5xl font-bold tracking-tighter text-[#4A4A4A]">
            Pre-Screening Questionnaire
            <p></p>
            <span className="text-[#FF7043]">
              Understand Your Current Emotional and Psychological State
            </span>
          </h1>
          <p className="mt-4 mx-auto max-w-[700px] text-lg text-[#8B4513]">
            This pre-screening questionnaire is designed to provide a quick
            overview of your emotional well-being. It aims to identify areas
            that may benefit from additional attention or support. While this is
            not a diagnostic tool, it can help you reflect on your current state
            and decide whether further evaluation or professional consultation
            may be helpful. Your responses are private and can be used as a
            starting point for deeper conversations with a professional.
          </p>
        </div>
      </section>

      <Card className="w-full max-w-3xl mx-auto my-8 p-6 rounded-2xl shadow-lg bg-[#FFF4E1]">
        {/* If NOT submitted, show the questionnaire */}
        {!isSubmitted ? (
          <>
            <CardHeader className="mb-4">
              <CardTitle className="text-4xl font-bold text-[#4A4A4A]">
                GHQ-28 Mental Health Questionnaire
              </CardTitle>
              <CardDescription className="text-2xl text-[#4A4A4A]">
                Question {currentQuestion + 1} of {totalQuestions}
              </CardDescription>
            </CardHeader>

            <CardContent>
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 ">
                <div
                  className="bg-[rgb(255,112,67)] h-2.5 rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>

              {/* Current Question + Options */}
              <div className="mb-6">
                <Label className="block mt-3 font-semibold text-xl mb-2">
                  {ghq28Questions[currentQuestion]}
                </Label>
                <RadioGroup
                  value={
                    responses[currentQuestion] >= 0
                      ? responses[currentQuestion].toString()
                      : ""
                  }
                  onValueChange={handleResponse}
                  className="space-y-2"
                >
                  {responseOptions.map((option) => (
                    <div key={option.value} className="flex items-center">
                      <RadioGroupItem
                        value={option.value.toString()}
                        id={`q${currentQuestion}_option${option.value}`}
                      />
                      <Label
                        htmlFor={`q${currentQuestion}_option${option.value}`}
                        className="ml-2"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </CardContent>

            {/* Navigation Buttons */}
            <CardFooter className="flex justify-between">
              <Button
                onClick={() =>
                  setCurrentQuestion((prev) => Math.max(prev - 1, 0))
                }
                disabled={currentQuestion === 0}
                variant="outline"
              >
                Previous
              </Button>
              {currentQuestion === totalQuestions - 1 ? (
                <Button
                  onClick={handleSubmit}
                  disabled={responses[currentQuestion] < 0}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    if (responses[currentQuestion] >= 0) {
                      setCurrentQuestion((prev) => prev + 1);
                    } else {
                      alert("Please select an option before proceeding.");
                    }
                  }}
                  disabled={responses[currentQuestion] < 0}
                  className="text-[#4A4A4A]"
                >
                  Next
                </Button>
              )}
            </CardFooter>
          </>
        ) : (
          // If submitted, show the RESULTS
          <>
            <CardHeader className="mb-4">
              <CardTitle className="text-2xl font-bold">
                GHQ-28 Results
              </CardTitle>
              <CardDescription className="text-[#4A4A4A]">
                Your questionnaire analysis
              </CardDescription>
            </CardHeader>

            <CardContent>
              {/* Overall Severity Alert */}
              <Alert
                variant={
                  analysis?.totalSeverity === "High" ? "destructive" : "default"
                }
                className="mb-6 flex items-center space-x-2"
              >
                {analysis?.totalSeverity === "High" ? (
                  <>
                    <XCircle className="h-5 w-5 text-red-500" />
                    <div>
                      <AlertTitle>
                        High Severity of Mental Health Concerns
                      </AlertTitle>
                      <AlertDescription>
                        Your responses indicate a high level of mental health
                        concerns. It is strongly recommended to consult with a
                        healthcare professional.
                      </AlertDescription>
                    </div>
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <AlertTitle>
                        {analysis?.totalSeverity === "Moderate"
                          ? "Moderate"
                          : "Low"}{" "}
                        Severity of Mental Health Concerns
                      </AlertTitle>
                      <AlertDescription>
                        {analysis?.totalSeverity === "Moderate"
                          ? "Your responses indicate some mental health concerns. Consider discussing these with a healthcare professional."
                          : "Your responses indicate a low level of mental health concerns. Continue to monitor your mental health and seek support if needed."}
                      </AlertDescription>
                    </div>
                  </>
                )}
              </Alert>

              {/* Categories with Low Severity vs. Areas of Concern */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Unaffected Categories */}
                {analysis && analysis.unaffectedCategories.length > 0 && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                    <div className="flex items-center mb-2">
                      <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
                      <h3 className="text-lg font-semibold">
                        Low Severity Areas:
                      </h3>
                    </div>
                    <ul className="list-disc list-inside text-green-700">
                      {analysis.unaffectedCategories.map((category, index) => (
                        <li key={index}>{category}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Affected Categories */}
                {analysis && analysis.affectedCategories.length > 0 && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                    <div className="flex items-center mb-2">
                      <XCircle className="h-6 w-6 text-red-500 mr-2" />
                      <h3 className="text-lg font-semibold">
                        Areas of Concern:
                      </h3>
                    </div>
                    <ul className="list-disc list-inside text-red-700">
                      {analysis.affectedCategories.map((category, index) => (
                        <li key={index}>
                          {category} - {analysis.subscaleSeverities[category]}{" "}
                          Severity
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Detailed Breakdown for Each Subscale */}
              <div className="space-y-6">
                {ghq28Subscales.map((subscale) => (
                  <div
                    key={subscale.name}
                    className="p-4 bg-gray-50 border border-gray-200 rounded-md"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">{subscale.name}:</span>
                      <span className="font-bold">
                        {analysis?.subscaleSeverities[subscale.name]} Severity
                      </span>
                    </div>
                    {/* Visual Severity Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${
                          analysis?.subscaleSeverities[subscale.name] === "High"
                            ? "bg-red-500"
                            : analysis?.subscaleSeverities[subscale.name] ===
                                "Moderate"
                              ? "bg-yellow-500"
                              : "bg-green-500"
                        }`}
                        style={{
                          width: `${
                            analysis?.subscaleSeverities[subscale.name] ===
                            "High"
                              ? 100
                              : analysis?.subscaleSeverities[subscale.name] ===
                                  "Moderate"
                                ? 66
                                : 33
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recommendations & PDF Brochures */}
              {analysis && analysis.affectedCategories.length > 0 && (
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                  <h3 className="text-lg font-semibold mb-2">
                    Recommendations:
                  </h3>
                  <p className="text-black">
                    Based on your responses, it is recommended to consult with a
                    healthcare professional to discuss your mental health,
                    especially in the areas of concern mentioned above.
                  </p>

                  {/* Display brochures for each affected category */}
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Helpful Resources:</h4>
                    <ul className="list-disc list-inside space-y-2">
                      {analysis.affectedCategories.map((category) => {
                        const pdfLinks = brochureLinks[category];
                        if (!pdfLinks || pdfLinks.length === 0) return null; // Skip if no brochures

                        return (
                          <li key={category}>
                            <span className="font-semibold">{category}:</span>
                            <ul className="list-disc list-inside ml-4">
                              {pdfLinks.map((link, index) => (
                                <li key={index}>
                                  <a
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline hover:text-blue-800"
                                  >
                                    {link.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>

            {/* Retake Button */}
            <CardFooter className="flex justify-center">
              <Button onClick={handleRetake} variant="outline">
                Retake Questionnaire
              </Button>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
}
