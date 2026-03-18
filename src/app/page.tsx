import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import { resumeData } from "@/data/resume";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center w-full">
      <Hero />
      <div className="w-full flex justify-center">
        <div className="w-full flex flex-col gap-2">
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
        </div>
      </div>
      <footer className="w-full py-8 text-center text-sm text-zinc-500">
        &copy; {new Date().getFullYear()} {resumeData.personal.name}. All rights
        reserved.
      </footer>
    </main>
  );
}
