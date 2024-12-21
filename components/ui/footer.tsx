// import Link from "next/link";
// import { Github, Twitter, Facebook, Instagram } from "lucide-react";

export default function Foooter() {
  return (
    <section className="w-full border-t -mt-8 bg-[#f4f7f8] text-[#4A4A4A] py-8 rounded-xl">
      <div className="container mx-auto text-center -top-10">
        <p className="text-sm font-semibold mb-4">
          Transform conversational sessions into Assistive Insights{" "}
        </p>
        {/* <div className="flex justify-center gap-6 mb-4">
          <Link href="#" className="hover:text-[#4A4A4A]">
            <Twitter className="h-5 w-5" />
          </Link>
          <Link href="#" className="hover:text-[#4A4A4A]">
            <Github className="h-5 w-5" />
          </Link>
          <Link href="#" className="hover:text-[#4A4A4A]">
            <Facebook className="h-5 w-5" />
          </Link>
          <Link href="#" className="hover:text-[#4A4A4A]">
            <Instagram className="h-5 w-5" />
          </Link>
        </div> */}
        <p className="text-xs text-[#6A6A6A]">
          © 2024 AI. All rights reserved.
        </p>
      </div>
    </section>
  );
}
