"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowRight, Download } from "lucide-react";
import { resumeData } from "@/data/resume";
import Link from "next/link";

export default function Hero() {
  const socialLinks = [
    { href: resumeData.personal.github, icon: Github, label: "GitHub" },
    { href: resumeData.personal.linkedin, icon: Linkedin, label: "LinkedIn" },
  ].filter((link) => link.href && link.href !== "#");

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center pt-24 pb-12 px-6">
      <div className="w-full max-w-7xl mx-auto flex flex-col items-start justify-center">
        
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
           className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-medium text-zinc-300">Available for new opportunities</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl tracking-tight font-bold mb-6 text-white"
        >
          Building digital <br/>
          <span className="text-zinc-600">experiences.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-zinc-400 max-w-4xl mb-10 leading-relaxed"
        >
          Hi, I&apos;m <strong className="text-zinc-100 font-medium">{resumeData.personal.name}</strong>, a {resumeData.personal.title}. I specialize in crafting robust, high-performance web applications with clean architecture and beautiful interfaces.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center gap-4 md:gap-6"
        >
          <Link href="#projects" className="group flex items-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-zinc-200 transition-colors">
            View Projects <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
          </Link>
          <a
            href={resumeData.personal.resumePdf}
            download
            className="group flex items-center gap-2 px-6 py-3 rounded-lg font-medium border border-white/20 text-white hover:bg-white/10 hover:border-cyan-500/50 transition-all duration-300"
          >
            <Download size={18} className="group-hover:scale-110 transition-transform" />
            Download Resume
          </a>
          <div className="flex items-center gap-5 px-6">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="text-zinc-400 hover:text-white transition-colors">
                <Icon size={20} />
              </a>
            ))}
            <a href={`mailto:${resumeData.personal.email}`} className="text-zinc-400 hover:text-white transition-colors">
              <Mail size={20} />
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
