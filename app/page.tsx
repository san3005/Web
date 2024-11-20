"use client";

import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import BoxReveal from "@/components/ui/box-reveal";
import Navbar from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import Howitworks from "@/components/ui/how-it-works";
import Demo from "@/components/ui/demo";
import VideoAnalysisDashboard from "@/components/ui/demo";
import { StickyScrollRevealDemo } from "@/components/ui/StickyScrollRevealDemo";
import Foooter from "@/components/ui/footer";
import TabbedDashboard from "@/components/ui/TabbedDashboard";

export default function Home() {
  const scrollToDemo = () => {
    const section = document.querySelector("#video-analysis");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="flex flex-col gap-4">
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
            <main className="container px-4 py-16 md:py-24 lg:py-32">
              <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
                <BoxReveal boxColor="#E8C6D4" duration={0.5}>
                  <p className="text-lg text-muted-foreground">
                    From video to insight—integrating emotions, speech, and
                    psychometrics for better care.
                  </p>
                </BoxReveal>

                <BoxReveal boxColor="#E8C6D4" duration={0.5}>
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                    Transform{" "}
                    <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                      Emotions{" "}
                    </span>
                    into Actionable Insights
                  </h1>
                </BoxReveal>

                <BoxReveal boxColor="#E8C6D4" duration={0.5}>
                  <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
                      {/* Primary Button */}
                      <button className="px-6 py-2 rounded-full bg-gray-100 text-lg font-semibold text-gray-800 transition-all duration-300 shadow-none hover:shadow-[0_0px_8px_rgba(0,0,0,0.15)] hover:bg-gray-200 hover:text-gray-900">
                        Learn More
                      </button>

                      {/* Secondary Button */}
                      <Button
                        variant="outline"
                        className="border-purple-300 rounded-3xl font-semibold text-lg text-black hover:bg-purple-100 hover:text-purple-600 h-12 px-8"
                        onClick={scrollToDemo} // Add click event to scroll
                      >
                        Watch free demo
                      </Button>
                    </div>
                  </div>
                </BoxReveal>
              </div>
            </main>
          </div>
        </BackgroundGradientAnimation>

        {/* How It Works Section */}
        <div id="video-analysis" className="bg-white -top-30 ">
          <TabbedDashboard />
        </div>
        <div id="HowItworks">
          <Howitworks />
        </div>
        <div className="bg-[#fff] " id="features">
          <StickyScrollRevealDemo />
        </div>
        <Foooter />
        {/* Add more sections with IDs */}
      </div>
    </div>
  );
}
