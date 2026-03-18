import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { resumeData } from "@/data/resume";

type ProjectCard = {
  title: string;
  description: string;
  techStack: string[];
  github: string;
  live: string;
  company?: string;
};

const allProjects: ProjectCard[] = [
  ...resumeData.projects,
  ...resumeData.moreProjects,
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#09090b] px-6 pb-24 pt-32 text-zinc-100">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.24em] text-cyan-400/80">
              Projects Archive
            </p>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
              More Work, More Experiments
            </h1>
            <p className="max-w-2xl text-zinc-400">
              A broader project list beyond the featured section. This page
              includes current items from the portfolio plus a few more
              projects.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 self-start rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-zinc-200 transition-colors hover:bg-white/10"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {allProjects.map((project, index) => (
            <article
              key={`${project.title}-${index}`}
              className="flex h-full flex-col rounded-3xl border border-zinc-800 bg-zinc-900/70 p-7 transition-all duration-300 hover:border-cyan-500/30 hover:bg-zinc-900"
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    {project.title}
                  </h2>
                  {project.company ? (
                    <p className="mt-1 text-sm text-cyan-300/80">
                      {project.company}
                    </p>
                  ) : null}
                </div>

                <div className="flex gap-3">
                  {project.github && project.github !== "#" ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.title} GitHub`}
                      className="text-zinc-500 transition-colors hover:text-zinc-200"
                    >
                      <Github size={18} />
                    </a>
                  ) : null}
                  {project.live && project.live !== "#" ? (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.title} Live Demo`}
                      className="text-zinc-500 transition-colors hover:text-zinc-200"
                    >
                      <ExternalLink size={18} />
                    </a>
                  ) : null}
                </div>
              </div>

              <p className="mb-6 flex-grow leading-relaxed text-zinc-400">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={`${project.title}-${tech}`}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
