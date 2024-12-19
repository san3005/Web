export default function HowItWorks() {
  return (
    <section className="w-full py-0 md:py-2 lg:pt-0 lg:pb-4 bg-white flex justify-center md:pb-4 sm:pb-4">
      <div className="w-[100%] max-h-full px-0 md:px-1">
        {/* Uncomment either light blue or lavender background */}
        <div className="border border-gray-200 rounded-3xl bg-[#E3EDF7] pt-0 md:p-12">
          {" "}
          {/* Light Blue Background */}
          {/* <div className="border border-gray-200 rounded-3xl bg-[#E6E6FA] p-8 md:p-12"> */}{" "}
          {/* Lavender Background */}
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#4B4453]">
              How it works
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              MindMatrix is a personalized mental health assistant, leveraging
              all interactions to deliver real-time psychometric analysis and
              insights. .
            </p>
          </div>
          <div className="mx-auto grid gap-8 sm:grid-cols-1 md:grid-cols-3 md:gap-12 lg:gap-16 items-start pt-8 md:pt-10">
            {/* Step 1 */}
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="relative">
                {/* <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white border border-gray-300">
                  <Download className="h-8 w-8 text-[#4B4453]" />
                </div> */}
                {/* <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-sm text-white">
                  1
                </div> */}
              </div>
              <h3 className="text-xl font-bold text-[#4B4453]">
                Multi-Modal Analysis{" "}
              </h3>
              <p className="text-gray-700 text-sm md:text-base">
                Captures nuances from both visual and audio cues, providing a
                more comprehensive view of mental health. By analyzing facial
                expressions, vocal tone, and speech patterns, the system
                captures complex states contributing to a holistic understanding
                of mental health.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="relative">
                {/* <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white border border-gray-300">
                  <Lock className="h-8 w-8 text-[#4B4453]" />
                </div> */}
                {/* <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-sm text-white">
                  2
                </div> */}
              </div>
              <h3 className="text-xl font-bold text-[#4B4453]">
                Session Summaries{" "}
              </h3>
              <p className="text-gray-700 text-sm md:text-base">
                Receive summarized insights for each session, designed to
                highlight key shifts in mental health. These summaries allow
                patients and practitioners to track changes over time, fostering
                a better understanding of the mental health journey and
                supporting more informed care decisions.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="relative">
                {/* <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white border border-gray-300">
                  <Plus className="h-8 w-8 text-[#4B4453]" />
                </div> */}
                {/* <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-sm text-white">
                  3
                </div> */}
              </div>
              <h3 className="text-xl font-bold text-[#4B4453]">
                AI-Powered Psychometric Insights{" "}
              </h3>
              <p className="text-gray-700 text-sm md:text-base">
                Leverages advanced AI-driven psychometric insights to gain a
                deeper understanding of behavioral patterns. The system provides
                interpretations based on data, uncovering underlying
                psychological factors and offering a new perspective on mental
                health.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
