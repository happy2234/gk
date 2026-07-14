import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import ExternalLink from "@/components/ExternalLink";
import { getAllProjects, getProjectBySlug } from "@/lib/content";

function GithubIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    openGraph: { title: project.title, description: project.summary },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const bodyHtml = project.body
    ? project.body
        .split("\n\n")
        .map((block) => {
          if (block.startsWith("## ")) return `<h2>${block.slice(3)}</h2>`;
          if (block.startsWith("### ")) return `<h3>${block.slice(4)}</h3>`;
          return `<p>${block}</p>`;
        })
        .join("")
    : null;

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 animate-fade-in">
      <nav aria-label="Breadcrumb" className="mb-8">
        <Link
          href="/projects"
          className="text-[14px] text-[#6B7280] hover:text-[#111827] transition-colors duration-150"
        >
          ← Projects
        </Link>
      </nav>

      <div className="mb-10">
        <div className="flex items-start gap-3 mb-3">
          <h1
            className="text-[2rem] font-bold text-[#111827] leading-tight flex-1"
            style={{ letterSpacing: "-0.01em" }}
          >
            {project.title}
          </h1>
          <Badge
            label={project.status}
            variant="status"
            status={project.status === "active" ? "active" : "archived"}
          />
        </div>
        <p className="text-[16px] text-[#6B7280] leading-relaxed mb-4">
          {project.summary}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.map((tag) => (
            <Badge key={tag} label={tag} />
          ))}
        </div>
        <div className="flex gap-3 flex-wrap">
          {project.github && (
            <ExternalLink
              href={project.github}
              id={`github-${project.slug}`}
              className="text-[13px] font-medium text-[#6B7280] hover:text-[#111827] border border-[#E5E7EB] px-3 py-1.5 rounded-[6px] gap-1.5 hover:border-[#D1D5DB] transition-all duration-150"
              aria-label={`GitHub: ${project.title}`}
            >
              <GithubIcon />
              GitHub
            </ExternalLink>
          )}
          {project.demo && (
            <ExternalLink
              href={project.demo}
              id={`demo-${project.slug}`}
              className="text-[13px] font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] px-3 py-1.5 rounded-[6px] gap-1.5 transition-all duration-150"
              aria-label={`Demo: ${project.title}`}
            >
              Live Demo
            </ExternalLink>
          )}
        </div>
      </div>

      {bodyHtml && (
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: bodyHtml }}
        />
      )}
    </div>
  );
}
