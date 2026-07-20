import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import CurrentlyCard from "@/components/CurrentlyCard";
import ProjectCard from "@/components/ProjectCard";
import PublicationEntry from "@/components/PublicationEntry";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import {
  getCurrently,
  getFeaturedProjects,
  getRecentPublications,
  getResume,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Gaurav Kumar — ML Engineer & AI/ML Researcher",
  description:
    "ML Engineer and M.Tech AI/ML student. Working on adversarial robustness, uncertainty estimation, and computer vision. Author of 3 IEEE/IJRASET publications and 1 Taylor & Francis book chapter.",
};

// Content is now sourced from content/resume.json — edit that file to update
// "Currently Using" and "Open-Source Experience" sections.

export default function HomePage() {
  const currently = getCurrently();
  const featuredProjects = getFeaturedProjects(3);
  const recentPublications = getRecentPublications(2);
  const resume = getResume();

  // Flip to true once you drop /public/profile.jpg
  const hasPhoto = true;

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 animate-fade-in">

      {/* ── 1. Hero ──────────────────────────────────────────────────────────── */}
      <section className="mb-16" aria-label="Introduction">
        <div className="flex flex-col sm:flex-row sm:items-start gap-6">
          {/* Profile photo — LEFT side */}
          <div className="flex-shrink-0">
            {hasPhoto ? (
              <Image
                src="/profile.jpg"
                alt="Gaurav Kumar"
                width={96}
                height={96}
                className="rounded-full object-cover border-2 border-gray-200 dark:border-gray-800 shadow-sm"
                priority
              />
            ) : (
              <div
                className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex flex-col items-center justify-center gap-1 cursor-default select-none"
                title="Add /public/profile.jpg to show your photo here"
                aria-label="Profile photo placeholder"
              >
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="text-gray-400 dark:text-gray-500"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span className="text-[9px] text-gray-400 dark:text-gray-500 font-medium leading-tight text-center px-1">
                  Add photo
                </span>
              </div>
            )}
          </div>

          {/* Text — RIGHT side */}
          <div className="flex-1 min-w-0">
            <h1
              className="text-[2.5rem] font-bold text-gray-900 dark:text-gray-100 leading-tight mb-4"
              style={{ letterSpacing: "-0.02em" }}
            >
              ML Engineer &amp; AI/ML researcher.
            </h1>
            <p className="text-[17px] text-gray-700 dark:text-gray-300 leading-relaxed max-w-[60ch] mb-0">
              M.Tech student at Manav Rachna, working on adversarial robustness,
              uncertainty estimation, and computer vision. Author of{" "}
              <span className="font-medium text-gray-900 dark:text-gray-100">
                3 IEEE/IJRASET publications
              </span>{" "}
              and a{" "}
              <span className="font-medium text-gray-900 dark:text-gray-100">
                Taylor &amp; Francis book chapter on GANs
              </span>
              . Open to research collaborations and internships.
            </p>
          </div>
        </div>
      </section>



      {/* ── 2. Currently Working On ──────────────────────────────────────────── */}
      {currently.items.length > 0 && (
        <section className="mb-16" aria-label="Currently working on">
          <CurrentlyCard items={currently.items} updatedAt={currently.updatedAt} />
        </section>
      )}

      {/* ── 3. Currently Using ───────────────────────────────────────────────── */}
      <section className="mb-16" aria-label="Currently using">
        <div className="border border-gray-200 dark:border-gray-800 rounded-[8px] overflow-hidden">
          {/* Card header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
            <h2 className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
              Currently Using
            </h2>
          </div>

          {/* Rows */}
          <div className="px-5 py-4 flex flex-col gap-3" role="list">
            {resume.currentlyUsing.map(({ category, items }) => (
              <div
                key={category}
                className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4"
                role="listitem"
              >
                {/* Category label */}
                <span className="sm:w-32 flex-shrink-0 text-[11px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide leading-relaxed">
                  {category}
                </span>
                {/* Items */}
                <div className="flex flex-wrap gap-1.5">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="text-[12px] text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-2 py-0.5 rounded-md leading-none"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── 4. Featured Projects ─────────────────────────────────────────────── */}
      {featuredProjects.length > 0 && (
        <section className="mb-16" aria-label="Featured projects">
          <div className="flex items-center justify-between mb-8">
            <SectionHeading
              title="Projects"
              subtitle="Selected work in ML, systems, and research."
              className="mb-0"
            />
            <Link
              href="/projects"
              className="text-[14px] text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-150 flex-shrink-0"
            >
              All projects →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      )}

      {/* ── 5. Featured Publications ─────────────────────────────────────────── */}
      {recentPublications.length > 0 && (
        <section className="mb-16" aria-label="Featured publications">
          <div className="flex items-center justify-between mb-6">
            <SectionHeading
              title="Publications"
              subtitle="Recent research output."
              className="mb-0"
            />
            <Link
              href="/publications"
              className="text-[14px] text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-150 flex-shrink-0"
            >
              All publications →
            </Link>
          </div>
          <div className="border border-gray-200 dark:border-gray-800 rounded-[8px] px-5 divide-y divide-gray-200 dark:divide-gray-800">
            {recentPublications.map((pub) => (
              <PublicationEntry key={pub.title} publication={pub} />
            ))}
          </div>
        </section>
      )}

      {/* ── 6. Open-Source Experience — supporting evidence, below the fold ──── */}
      <section className="mb-16" aria-label="Open-source experience">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest whitespace-nowrap">
            Open-Source Experience
          </h2>
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" aria-hidden="true" />
        </div>

        <div className="flex flex-col gap-5">
          {resume.openSource.map((item) => (
            <div
              key={item.role}
              className="flex flex-col sm:flex-row sm:items-start gap-4 pl-5 border-l-2 border-gray-200 dark:border-gray-800"
            >
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-2 mb-1">
                  <span className="text-[14px] font-semibold text-gray-900 dark:text-gray-100">
                    {item.role}
                  </span>
                  <span className="text-[13px] text-blue-600 dark:text-blue-400 font-medium">
                    {item.org}
                  </span>
                </div>
                <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed m-0">
                  {item.description}
                </p>
              </div>
              <span className="text-[12px] text-gray-400 dark:text-gray-500 flex-shrink-0 sm:pt-0.5 tabular-nums whitespace-nowrap">
                {item.period}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 7. CTA row ───────────────────────────────────────────────────────── */}
      <section
        className="flex flex-col sm:flex-row gap-3 pt-8 border-t border-gray-200 dark:border-gray-800"
        aria-label="Call to action"
      >
        <Button href="/resume" variant="primary" id="cta-resume">
          View Resume
        </Button>
        <Button href="/contact" variant="secondary" id="cta-contact">
          Get in Touch
        </Button>
      </section>

    </div>
  );
}
