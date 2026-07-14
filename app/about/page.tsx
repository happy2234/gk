import type { Metadata } from "next";
import { getAbout } from "@/lib/content";
import type { AboutTimeline } from "@/lib/content";

export const metadata: Metadata = {
  title: "About — Gaurav Kumar",
  description:
    "ML Engineer pursuing M.Tech in AI/ML. Working on adversarial robustness, uncertainty estimation, and computer vision. Author of 3 IEEE/IJRASET publications.",
};

// Reusable timeline list — used for both Education and Experience
function Timeline({ items }: { items: AboutTimeline[] }) {
  return (
    <ol className="list-none m-0 p-0 flex flex-col gap-0">
      {items.map((item, i) => (
        <li key={i} className="flex gap-6 relative pb-8 last:pb-0">
          {/* Connecting line */}
          {i < items.length - 1 && (
            <span
              className="absolute left-[5px] top-2.5 bottom-0 w-px bg-[#E5E7EB]"
              aria-hidden="true"
            />
          )}
          {/* Dot */}
          <span
            className="w-[11px] h-[11px] rounded-full border-2 border-[#2563EB] bg-white flex-shrink-0 mt-1.5 relative z-10"
            aria-hidden="true"
          />
          <div className="flex-1 min-w-0">
            <p className="text-[12px] text-[#6B7280] uppercase tracking-wide font-medium m-0 mb-0.5">
              {item.period}
            </p>
            <p className="text-[15px] font-semibold text-[#111827] m-0 leading-snug">
              {item.role}
            </p>
            <p className="text-[14px] text-[#2563EB] m-0 mb-1">{item.org}</p>
            {item.note && (
              <p className="text-[14px] text-[#6B7280] m-0 leading-relaxed">
                {item.note}
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function AboutPage() {
  const about = getAbout();

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 animate-fade-in">
      <h1
        className="text-[2.5rem] font-bold text-[#111827] leading-tight mb-8"
        style={{ letterSpacing: "-0.02em" }}
      >
        About
      </h1>

      {/* Bio */}
      <section className="mb-14" aria-label="Biography">
        <div className="prose max-w-[68ch]">
          {about.bio.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </section>

      {/* Education & Experience — two separate sections side by side on md+ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-14">
        {/* Education */}
        <section aria-label="Education">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-widest whitespace-nowrap">
              Education
            </h2>
            <div className="flex-1 h-px bg-[#E5E7EB]" aria-hidden="true" />
          </div>
          <Timeline items={about.education} />
        </section>

        {/* Experience */}
        <section aria-label="Experience">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-widest whitespace-nowrap">
              Experience
            </h2>
            <div className="flex-1 h-px bg-[#E5E7EB]" aria-hidden="true" />
          </div>
          <Timeline items={about.experience} />
        </section>
      </div>

      {/* Skills */}
      <section aria-label="Skills">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-widest whitespace-nowrap">
            Skills
          </h2>
          <div className="flex-1 h-px bg-[#E5E7EB]" aria-hidden="true" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {Object.entries(about.skills).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-[12px] font-semibold text-[#6B7280] uppercase tracking-wide mb-2">
                {category}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="text-[13px] bg-[#F3F4F6] text-[#374151] px-2.5 py-1 rounded-md border border-[#E5E7EB]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
