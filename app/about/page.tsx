import Image from "next/image";
import Footer from "@/components/ui/footer";
import Navbar from "./navbar";
import { Mail } from "lucide-react";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Chandra N Sekharan",
      role: "Professor",
      workingAt: "TAMUCC",

      image: "/Professor Illustration.png", // No 'public/' prefix
      email: "chandra.sekharan@tamucc.edu",
    },
    {
      name: "Santosh G.",
      role: "Task Research Worker",
      workingAt: "TAMUCC",
      image: "/Male Avatar.png", // No 'public/' prefix
      email: "venkata.gurajada@tamucc.edu",
      linkedin: "https://linkedin.com/in/aaron",
    },
    {
      name: "Bala K.",
      role: "Task Research Worker",
      workingAt: "TAMUCC",

      image: "/Profile Picture Illustration.png", // No 'public/' prefix
      email: "nisarg@example.com",
      linkedin: "https://linkedin.com/in/nisarg",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#FFF5E1]">
      <Navbar />

      <main className="flex-grow">
        <section className="w-full py-24 bg-white text-center">
          <div className="container mx-auto px-4 md:px-6">
            <h1 className="text-5xl font-bold tracking-tighter text-[#4A4A4A]">
              We&#39;re building
              <p> </p>
              <span className="text-[#FF7043]">
                Emotional AI tools that empower mental health
              </span>
            </h1>
            <p className="mt-4 mx-auto max-w-[700px] text-lg text-[#8B4513]">
              Our mission is to tackle the challenges in emotional AI
              applications for mental health by delivering a user-friendly and
              intuitive design. We aim to create solutions that provide
              actionable insights while offering a natural and empathetic
              experience, making emotional analysis a valuable tool rather than
              a complex task.
            </p>
          </div>
        </section>

        <section className="w-full bg-[#FFF5E1] pb-20">
          <div className="container mx-auto px-4 sm:px-2 md:px-4">
            <h2 className="text-3xl mt-8 sm:text-2xl md:text-3xl font-bold tracking-tighter text-center text-[#4A4A4A] mb-12">
              Meet Our Team
            </h2>

            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] justify-items-center">
              {teamMembers.map((member) => (
                <div
                  key={member.name}
                  className="flex rounded-3xl flex-col items-center hover:shadow-xl text-center bg-white p-6  shadow-md max-w-[400px] mx-auto min-h-[250px]"
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={100}
                    height={100}
                    className="rounded-full object-cover"
                  />
                  <h4 className="text-xl font-bold mt-4 text-[#4A4A4A]">
                    {member.name}
                  </h4>
                  <p className="text-[#FFA726] font-semibold">{member.role}</p>
                  <p className="text-sm text-[#4A4A4A]">
                    Working at: {member.workingAt}
                  </p>

                  <div className="flex space-x-4 mt-4">
                    <a
                      href={`mailto:${member.email}`}
                      className="text-[#FF7043] hover:underline"
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#FF7043] hover:underline"
                    >
                      {/* <Linkedin className="h-5 w-5" /> */}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
