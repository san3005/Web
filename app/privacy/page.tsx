import Footer from "@/components/ui/footer";
import Navbar from "./navbar";
// import { Shield, Lock, FileText } from "lucide-react";

export default function PrivacyPage() {
  // const privacyPoints = [
  //   {
  //     title: "HIPAA Compliance",
  //     description:
  //       "We adhere to all HIPAA regulations to protect your health information.",
  //     icon: <Shield className="h-8 w-8 text-[#FF7043]" />,
  //   },
  //   {
  //     title: "Data Encryption",
  //     description:
  //       "All data is encrypted in transit and at rest using industry-standard protocols.",
  //     icon: <Lock className="h-8 w-8 text-[#FF7043]" />,
  //   },
  //   {
  //     title: "Limited Data Use",
  //     description:
  //       "We only use your data for the purposes explicitly stated in our privacy policy.",
  //     icon: <FileText className="h-8 w-8 text-[#FF7043]" />,
  //   },
  // ];

  return (
    <div className="flex flex-col min-h-screen bg-[#FFF5E1]">
      <Navbar />

      <main className="flex-grow flex items-center justify-center">
        <span className="text-[#FF7043] text-5xl font-bold">
          {" "}
          Under Construction{" "}
        </span>
      </main>
      <Footer />
    </div>

    // // <div className="flex flex-col min-h-screen bg-[#FFF5E1]">
    // //   <Navbar />

    // //   <main className="flex-grow">
    // //     <span className="text-[#FF7043]"> Under Construction </span>
    //     {/* <section className="w-full py-24 bg-white text-center">
    //       <div className="container mx-auto px-4 md:px-6">
    //         <h1 className="text-5xl font-bold tracking-tighter text-[#4A4A4A]">
    //           Your Privacy is Our
    //           <p> </p>
    //           <span className="text-[#FF7043]">Top Priority</span>
    //         </h1>
    //         <p className="mt-4 mx-auto max-w-[700px] text-lg text-[#8B4513]">
    //           At MindMatrix, we understand the importance of protecting your
    //           personal and health information. Our privacy practices are
    //           designed to comply with HIPAA regulations and ensure the
    //           confidentiality, integrity, and availability of your data.
    //         </p>
    //       </div>
    //     </section>

    //     <section className="w-full bg-[#FFF5E1] pb-20">
    //       <div className="container mx-auto px-4 sm:px-2 md:px-4">
    //         <h2 className="text-3xl mt-8 sm:text-2xl md:text-3xl font-bold tracking-tighter text-center text-[#4A4A4A] mb-12">
    //           Our Privacy Commitments
    //         </h2>

    //         <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
    //           {privacyPoints.map((point, index) => (
    //             <div
    //               key={index}
    //               className="flex rounded-3xl flex-col items-center hover:shadow-xl text-center bg-white p-6 shadow-md max-w-[400px] mx-auto min-h-[250px]"
    //             >
    //               <div className="mb-4">{point.icon}</div>
    //               <h4 className="text-xl font-bold mt-4 text-[#4A4A4A]">
    //                 {point.title}
    //               </h4>
    //               <p className="text-sm text-[#4A4A4A] mt-2">
    //                 {point.description}
    //               </p>
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //     </section>

    //     <section className="w-full py-12 bg-white">
    //       <div className="container mx-auto px-4 md:px-6">
    //         <h2 className="text-3xl font-bold tracking-tighter text-center text-[#4A4A4A] mb-8">
    //           HIPAA Compliance Details
    //         </h2>
    //         <div className="max-w-[800px] mx-auto">
    //           <p className="text-[#8B4513] mb-4">
    //             As a provider of mental health technology, we are committed to
    //             maintaining HIPAA compliance:
    //           </p>
    //           <ul className="list-disc pl-6 text-[#8B4513] space-y-2">
    //             <li>
    //               We implement technical safeguards to protect electronic
    //               protected health information (ePHI).
    //             </li>
    //             <li>
    //               We conduct regular risk assessments to identify potential
    //               vulnerabilities in our systems.
    //             </li>
    //             <li>We maintain audit trails of all access to ePHI.</li>
    //             <li>
    //               We have policies and procedures in place for breach
    //               notification in the unlikely event of a data breach.
    //             </li>
    //             <li>
    //               Our staff undergoes regular HIPAA training to ensure they
    //               understand and follow all necessary procedures.
    //             </li>
    //             <li>
    //               We have appointed a Privacy Officer responsible for developing
    //               and implementing our privacy policies and procedures.
    //             </li>
    //           </ul>
    //           <p className="text-[#8B4513] mt-4">
    //             For more detailed information about our privacy practices or to
    //             request access to your information Please contact our team.
    //           </p>
    //         </div>
    //       </div>
    //     </section> */}
    //   </main>

    // </div>
  );
}
