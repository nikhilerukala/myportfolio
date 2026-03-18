"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/data/resume";
import { LayoutTemplate, Database, PenTool, Layout, Terminal } from "lucide-react";

const DEVICON_CDN = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "frontend":
      return <LayoutTemplate className="w-5 h-5 text-primary" />;
    case "backend":
      return <Terminal className="w-5 h-5 text-secondary" />;
    case "css":
      return <PenTool className="w-5 h-5 text-pink-400" />;
    case "database":
      return <Database className="w-5 h-5 text-blue-400" />;
    default:
      return <Layout className="w-5 h-5 text-white" />;
  }
};

const skillToDevicon: Record<string, string> = {
  HTML: "html5",
  JavaScript: "javascript",
  TypeScript: "typescript",
  "React.js": "react",
  "Next.js": "nextjs",
  "Vue.js": "vuejs",
  "Nuxt.js": "nuxtjs",
  "Tailwind CSS": "tailwindcss",
  Bootstrap: "bootstrap",
  "Material UI": "materialui",
  "Material Tailwind CSS UI": "tailwindcss",
  "Daisy UI": "sass",
  "Ant Design": "react",
  "Node.js": "nodejs",
  "Express.js": "express",
  Laravel: "laravel",
  PostgreSQL: "postgresql",
  MongoDB: "mongodb",
  SQLite: "sqlite",
  MySQL: "mysql",
  Git: "git",
  Redux: "redux",
  Pinia: "/skills/pinia.svg",
  "Inertia.js": "vuejs",
  "REST APIs": "express",
};

function getSkillImage(skill: string) {
  const icon = skillToDevicon[skill];
  if (!icon) return null;
  if (icon.startsWith("/")) return icon;
  return `${DEVICON_CDN}/${icon}/${icon}-original.svg`;
}

export default function Skills() {
  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  const categories = Object.keys(resumeData.skills) as Array<keyof typeof resumeData.skills>;

  return (
    <section id="skills" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">Technical Arsenal</h2>
          <p className="text-white/50 max-w-2xl mx-auto mb-6">
            A carefully curated stack of modern technologies designed to build scalable, high-performance web applications.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {["react", "nextjs", "vuejs", "typescript", "tailwindcss", "nodejs", "postgresql", "git"].map((icon) => (
              <div
                key={icon}
                className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300"
              >
                <img
                  src={`${DEVICON_CDN}/${icon}/${icon}-original.svg`}
                  alt=""
                  className="w-8 h-8 md:w-10 md:h-10 object-contain opacity-90 hover:opacity-100"
                  width={40}
                  height={40}
                />
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {categories.map((category) => (
            <motion.div
              key={category}
              variants={itemVariants}
              className="card-hover glass p-8 rounded-3xl transition-all duration-300 group border border-white/10 hover:bg-cyan-500/10 hover:border-cyan-500/30 hover:shadow-[0_0_25px_-5px_rgba(6,182,212,0.15)]"
            >
              <div className="flex items-center gap-3 mb-6 mix-blend-screen">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 shadow-inner">
                  {getCategoryIcon(category)}
                </div>
                <h3 className="capitalize text-xl font-bold tracking-tight">
                  {category}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {resumeData.skills[category].map((skill, idx) => {
                  const iconUrl = getSkillImage(skill);
                  return (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm hover:scale-105 hover:bg-white hover:text-black transition-all cursor-default shadow-sm"
                    >
                      {iconUrl ? (
                        <img
                          src={iconUrl}
                          alt=""
                          className="w-5 h-5 object-contain flex-shrink-0"
                          width={20}
                          height={20}
                        />
                      ) : null}
                      <span>{skill}</span>
                    </span>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
