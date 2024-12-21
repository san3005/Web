"use client";

import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import BoxReveal from "@/components/ui/box-reveal";
import Navbar from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import Howitworks from "@/components/ui/how-it-works";
// import { StickyScrollRevealDemo } from "@/components/ui/StickyScrollRevealDemo";
import Foooter from "@/components/ui/footer";
import TabbedDashboard from "@/components/ui/TabbedDashboard";
import FloatingFeedbackButton from "@/components/ui/FloatingFeedbackButton";
import AcceptedReviews from "@/components/ui/acceptedreviews";
import AudioTabbedDashboard from "@/components/ui/AudioTabbedDashboard";
import FAQ from "@/components/ui/faq";

export default function Home() {
  const scrollToDemo = () => {
    const section = document.querySelector("#video-analysis");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  const scrollTolearn = () => {
    const section = document.querySelector("#HowItworks");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="flex flex-col gap-4">
      <FloatingFeedbackButton />

      {/* Navbar always accessible at the top */}
      <Navbar />

      <div className="h-screen relative -top-20" id="hero">
        {/* Hero Section */}
        <BackgroundGradientAnimation
          gradientBackgroundStart="rgb(224, 255, 255)" // Light Cyan for Calmness
          gradientBackgroundEnd="rgb(255, 182, 193)" // Light Pink for Excitement
          firstColor="224, 255, 255" // Light Cyan for Calmness
          secondColor="255, 250, 205" // Lemon Chiffon for Joy
          thirdColor="216, 191, 216" // Thistle for Sadness
          fourthColor="255, 160, 122" // Light Salmon for Mild Anger
          fifthColor="255, 182, 193" // Light Pink for Excitement
          pointerColor="255, 250, 205" // Lemon Chiffon for Joyful Pointer
          blendingValue="overlay"
          interactive={true}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-800 z-40 rounded-3xl">
            <main className="container px-4 py-16 md:py-24 lg:py-32 ">
              <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
                <BoxReveal boxColor="#E8C6D4" duration={0.5}>
                  <div className="font-semibold">
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl pb-10">
                      <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        MindMatrix
                      </span>
                    </h1>
                    <p>
                      A state-of-the-art technology that leverages artificial
                      intelligence to deliver real-time insights. Discover
                      deeper connections with MindMatrix. We use research-based
                      technologies to understand
                    </p>
                    <ul>
                      <li>
                        <strong>&#8226; Expressions</strong>
                      </li>
                      <li>
                        <strong>&#8226; Tone</strong>
                      </li>
                      <li>
                        <strong>&#8226; Speech </strong>
                      </li>
                    </ul>
                  </div>
                </BoxReveal>

                <p className="pt-6">
                  <strong>Wellness Insights:</strong>
                </p>
                <p>
                  Captures the essence of human wellness to offer meaningful
                  feedback.
                </p>

                <p className="pt-4">
                  <strong>Enhancing Support:</strong>
                </p>
                <ul>
                  <li>&#8226; Deepen understanding</li>
                  <li>&#8226; Foster genuine connections</li>
                  <li>
                    &#8226; Embark on a compassionate journey toward wellness
                  </li>
                </ul>

                <BoxReveal boxColor="#E8C6D4" duration={0.5}>
                  <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
                      {/* Primary Button */}
                      <button
                        className="px-6 py-2 rounded-full bg-gray-100 text-lg font-semibold text-gray-800 transition-all duration-300 shadow-none hover:shadow-[0_0px_8px_rgba(0,0,0,0.15)] hover:bg-gray-200 hover:text-gray-900"
                        onClick={scrollTolearn}
                      >
                        Learn More
                      </button>

                      {/* Secondary Button */}
                      <Button
                        variant="outline"
                        className="border-purple-300 rounded-3xl font-semibold text-lg text-black hover:bg-purple-100 hover:text-purple-600 h-12 px-8"
                        onClick={scrollToDemo} // Add click event to scroll
                      >
                        Watch Demo
                      </Button>
                    </div>
                  </div>
                </BoxReveal>
              </div>
            </main>
          </div>
        </BackgroundGradientAnimation>
        {/* How It Works Section */}
        <div id="video-analysis" className="bg-white -top-30 pb-2">
          <TabbedDashboard />
        </div>
        <div id="" className="bg-white -mt-10  ">
          <AudioTabbedDashboard />
        </div>
        <div id="HowItworks">
          <Howitworks />
        </div>
        <div className=" bg-[#fff]  pb-5 ">
          <div className="bg-[#Fff] rounded-3xl">
            <AcceptedReviews />
          </div>
        </div>

        <div className="bg-[#fff] " id="features">
          {/* <StickyScrollRevealDemo /> */}
        </div>
        <div className="bg-[#fff] mb-30 pb-30">
          <FAQ />
        </div>
        <Foooter />
        {/* Add more sections with IDs */}
      </div>
    </div>
  );
}
