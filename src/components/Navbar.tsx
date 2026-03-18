"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Allura } from "next/font/google";
import { Menu, X, Download } from "lucide-react";
import { resumeData } from "@/data/resume";

const allura = Allura({
  subsets: ["latin"],
  weight: "400",
});

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const brandName = resumeData.personal.name.replace(/\s+/g, ".");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (!navRef.current) {
        return;
      }

      const target = event.target as Node | null;
      if (target && !navRef.current.contains(target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [isOpen]);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 w-full z-50 transition-all duration-200 ${scrolled ? "bg-[#09090b]/80 backdrop-blur-md border-b border-white/5" : "bg-transparent"}`}
    >
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className={`${allura.className} text-[2.35rem] leading-none text-white drop-shadow-[0_2px_12px_rgba(255,255,255,0.08)] hover:opacity-80 transition-opacity`}
        >
          {brandName}
        </Link>
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors">
              {link.name}
            </Link>
          ))}
          <a
            href={resumeData.personal.resumePdf}
            download
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/30 hover:border-cyan-500/50 transition-all duration-300"
          >
            <Download size={16} />
            Resume
          </a>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-zinc-400 hover:text-white">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#09090b] border-b border-white/5 flex flex-col p-4 shadow-lg">
          {navLinks.map((link) => (
             <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="px-4 py-3 text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 rounded-md">
               {link.name}
             </Link>
          ))}
          <a href={resumeData.personal.resumePdf} download onClick={() => setIsOpen(false)} className="flex items-center gap-2 px-4 py-3 mt-2 text-sm font-medium text-cyan-400 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/10">
            <Download size={16} /> Download Resume
          </a>
        </div>
      )}
    </nav>
  );
}
