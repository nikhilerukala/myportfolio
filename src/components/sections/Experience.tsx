"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/data/resume";

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight mb-4 text-white">Work Experience</h2>
        </motion.div>

        <div className="space-y-12">
          {resumeData.experience.map((exp, index) => (
             <motion.div 
               key={index}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: index * 0.1 }}
               className="card-hover grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 p-4 -ml-4 rounded-xl transition-all duration-300 hover:bg-white/[0.04] hover:bg-violet-500/5 border border-transparent hover:border-violet-500/20"
             >
                <div className="md:col-span-1 text-zinc-500 text-sm font-medium pt-1">
                  {exp.duration}
                </div>
                <div className="md:col-span-3 flex flex-col">
                  <h3 className="text-xl font-semibold text-zinc-100 mb-1">{exp.role}</h3>
                  <h4 className="text-base text-zinc-400 mb-4">{exp.company}</h4>
                  <ul className="space-y-3">
                    {exp.achievements.map((item, i) => (
                      <li key={i} className="text-zinc-400 leading-relaxed text-sm md:text-base flex gap-3">
                        <span className="text-zinc-600 mt-1.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
             </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
