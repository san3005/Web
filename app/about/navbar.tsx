"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image"; // Changed from {Image}

const menuItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  // { name: "Features", href: "/#features" },
  { name: "How it Works", href: "/#HowItworks" },
  { name: "Privacy", href: "/privacy" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav
      className={`sticky top-0  z-50 transition-all duration-300 ${
        isScrolled
          ? "rounded-2xl bg-white/30 backdrop-blur-md shadow-lg border-b border-white/20"
          : " bg-white/60 backdrop-blur-md shadow-lg border-b border-white/20"
      } w-full`}
    >
      <div className="max-w-full  px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-black">
              <Image
                className="w-[4rem] h-15"
                src="/logo1.png"
                alt="logo"
                width={900}
                height={600}
              />
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <motion.span
                  className={`px-3 py-2 text-lg font-semibold transition-all duration-300 ${
                    pathname === item.href
                      ? "text-black"
                      : "text-gray-700 hover:text-black"
                  }`}
                  whileHover={{
                    y: -5,
                    opacity: 1,
                  }}
                  initial={{ opacity: 0.8, y: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                  {item.name}
                </motion.span>
              </Link>
            ))}
          </div>
          <div className="md:hidden flex items-center">
            <button
              className="p-2 text-xl font-bold text-black hover:text-gray-900 focus:outline-none"
              onClick={toggleMenu}
              aria-expanded={isOpen}
              aria-label="Toggle menu"
            >
              <motion.div
                className="w-6 h-6 flex flex-col justify-around"
                initial={false}
                animate={isOpen ? "open" : "closed"}
              >
                <motion.span
                  className="w-6 h-0.5 bg-black block"
                  variants={{
                    closed: { rotate: 0, translateY: 0 },
                    open: { rotate: 45, translateY: 8 },
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="w-6 h-0.5 bg-black block"
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 },
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="w-6 h-0.5 bg-black block"
                  variants={{
                    closed: { rotate: 0, translateY: 0 },
                    open: { rotate: -45, translateY: -8 },
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/20 backdrop-blur-md rounded-lg mt-2 shadow-md">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className={`block px-3 py-2 text-lg font-semibold transition-all duration-300 ${
                      pathname === item.href
                        ? "text-black"
                        : "text-gray-700 hover:text-black"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
