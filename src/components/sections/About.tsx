"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/data/resume";

export default function About() {
  const primaryEducation = resumeData.education[0]?.degree ?? "";

  return (
    <section id="about" className="py-24 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold tracking-tight mb-6 text-white">About Me</h2>
          <p className="text-zinc-400 leading-relaxed text-lg mb-8">
            {resumeData.personal.bio}
          </p>
          <div className="flex gap-10">
             <div>
               <h3 className="text-sm font-semibold text-zinc-100 mb-1">Location</h3>
               <p className="text-zinc-400">{resumeData.personal.location}</p>
             </div>
             <div>
               <h3 className="text-sm font-semibold text-zinc-100 mb-1">Education</h3>
               <p className="text-zinc-400">{primaryEducation}</p>
             </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-4"
        >
          {resumeData.personal.stats.map((stat, i) => (
            <div key={i} className="card-hover p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex flex-col justify-center transition-all duration-300 hover:bg-zinc-800/80 hover:border-cyan-500/25 hover:shadow-[0_0_20px_-5px_rgba(6,182,212,0.15)]">
              <span className="text-3xl font-bold text-zinc-100 mb-2">{stat.value}</span>
              <span className="text-sm text-zinc-500 font-medium">{stat.label}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
