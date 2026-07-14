import Link from "next/link";
import Badge from "./Badge";
import ExternalLink from "./ExternalLink";
import type { Project } from "@/lib/content";

// Inline SVG GitHub icon — lucide-react doesn't ship brand icons
function GithubIcon() {
  return (
    <svg width={13} height={13} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article
      className="group border border-[#E5E7EB] rounded-[8px] p-5 bg-white hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all duration-150 flex flex-col gap-3"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-[15px] font-semibold text-[#111827] leading-snug m-0 group-hover:text-[#2563EB] transition-colors duration-150">
          <Link href={`/projects/${project.slug}`} className="no-underline">
            {project.title}
          </Link>
        </h3>
        <Badge
          label={project.status}
          variant="status"
          status={project.status === "active" ? "active" : "archived"}
        />
      </div>

      <p className="text-[13px] text-[#6B7280] leading-relaxed m-0 line-clamp-2">
        {project.summary}
      </p>

      <div className="flex flex-wrap gap-1.5 mt-auto">
        {project.tags.map((tag) => (
          <Badge key={tag} label={tag} />
        ))}
      </div>

      {(project.github || project.demo) && (
        <div className="flex items-center gap-4 pt-1 border-t border-[#F3F4F6]">
          {project.github && (
            <ExternalLink
              href={project.github}
              className="text-[12px] font-medium text-[#6B7280] hover:text-[#111827] gap-1.5"
              aria-label={`GitHub: ${project.title}`}
            >
              <GithubIcon />
              GitHub
            </ExternalLink>
          )}
          {project.demo && (
            <ExternalLink
              href={project.demo}
              className="text-[12px] font-medium text-[#2563EB] hover:text-[#1D4ED8] gap-1.5"
              aria-label={`Demo: ${project.title}`}
            >
              Demo
            </ExternalLink>
          )}
        </div>
      )}
    </article>
  );
}
