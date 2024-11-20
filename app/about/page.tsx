import Image from "next/image";
import Foooter from "@/components/ui/footer";
import Navbar from "@/components/ui/navbar";

export default function AboutPage() {
  const teamMembers = {
    leader: {
      name: "Dr. Sekharan",
      role: "Professor",
      image: "/Professor Illustration.png", // Correct path in public directory
    },
    coreTeam: [
      {
        name: "Santhosh G.",
        role: "Task Research Worker",
        image: "/Profile Picture Illustration.png", // Correct path in public directory
      },
      {
        name: "Balakrishna Kilaru",
        role: "Task Research Worker",
        image: "/Male Avatar.png", // Correct path in public directory
      },
    ],
  };

  return (
    <div>
      <Navbar />

      <main className="flex flex-col min-h-screen -mt-16">
        <section className="w-full  md:py-24 lg:py-32 bg-gradient-to-b from-[#FFF5E1] via-[#FFD8A8] to-[#FFC1C1] text-center">
          <div className="container px-4 md:px-6">
            <h1 className="text-4xl font-bold tracking-tighter text-[#4A4A4A] sm:text-5xl">
              About{" "}
              <span className="bg-gradient-to-r from-[#FFA726] via-[#FF7043] to-[#FF7043] text-transparent bg-clip-text">
                Us{" "}
              </span>
            </h1>
            <p className="mt-4 mx-auto font-semibold max-w-[700px] text-[#8B4513] md:text-xl">
              Our team is developing advanced AI tools that analyze emotions,
              behavior patterns, and psychometric data.
            </p>
          </div>
        </section>

        {/* Team Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center text-[#4A4A4A] sm:text-4xl md:text-5xl">
              Meet Our Team
            </h2>

            {/* Leader */}
            <div className="flex flex-col items-center text-center mt-16 mb-12">
              <Image
                src={teamMembers.leader.image}
                alt={teamMembers.leader.name}
                width={200}
                height={200}
                className="rounded-full"
              />
              <h3 className="text-2xl font-bold mt-4 text-[#4A4A4A]">
                {teamMembers.leader.name}
              </h3>
              <p className="text-lg text-[#FF7043] font-semibold">
                {teamMembers.leader.role}
              </p>
            </div>

            {/* Core Team */}
            <div className="grid gap-12 sm:grid-cols-2">
              {teamMembers.coreTeam.map((member) => (
                <div
                  key={member.name}
                  className="flex flex-col items-center text-center"
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={160}
                    height={160}
                    className="rounded-full"
                  />
                  <h4 className="text-xl font-bold mt-4 text-[#4A4A4A]">
                    {member.name}
                  </h4>
                  <p className="text-[#FFA726] font-semibold">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Foooter />
    </div>
  );
}
