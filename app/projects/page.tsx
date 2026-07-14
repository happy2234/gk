import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import SectionHeading from "@/components/SectionHeading";
import { getAllProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "ML, systems, and research projects by Gaurav — from distributed training to space networks.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();
  const active = projects.filter((p) => p.status === "active");
  const archived = projects.filter((p) => p.status === "archived");

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 animate-fade-in">
      <h1
        className="text-[2.5rem] font-bold text-[#111827] leading-tight mb-3"
        style={{ letterSpacing: "-0.02em" }}
      >
        Projects
      </h1>
      <p className="text-[17px] text-[#6B7280] mb-12 max-w-[60ch] leading-relaxed">
        Research prototypes, open-source tools, and engineering projects.
      </p>

      {active.length > 0 && (
        <section className="mb-12" aria-label="Active projects">
          <SectionHeading title="Active" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {active.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      )}

      {archived.length > 0 && (
        <section aria-label="Archived projects">
          <SectionHeading
            title="Archived"
            subtitle="Completed or no longer actively maintained."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {archived.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
