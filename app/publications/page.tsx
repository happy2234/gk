import type { Metadata } from "next";
import PublicationEntry from "@/components/PublicationEntry";
import { getAllPublications } from "@/lib/content";
import type { Publication } from "@/lib/content";

export const metadata: Metadata = {
  title: "Publications — Gaurav Kumar",
  description:
    "Research publications by Gaurav Kumar — IEEE, Taylor & Francis, and IJRASET.",
};

type Tier = {
  label: string;
  status: Publication["status"];
  color: string;
  dot: string;
  emptyHint: string;
};

const TIERS: Tier[] = [
  {
    label: "Published",
    status: "published",
    color: "#16A34A",
    dot: "#16A34A",
    emptyHint: "No published work yet.",
  },
  {
    label: "Accepted",
    status: "accepted",
    color: "#2563EB",
    dot: "#2563EB",
    emptyHint: "No accepted papers at the moment.",
  },
  {
    label: "Under Review",
    status: "in-review",
    color: "#B45309",
    dot: "#D97706",
    emptyHint: "Nothing currently under review.",
  },
  {
    label: "In Preparation",
    status: "in-prep",
    color: "#6B7280",
    dot: "#9CA3AF",
    emptyHint: "No manuscripts in preparation.",
  },
];

export default function PublicationsPage() {
  const all = getAllPublications();

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 animate-fade-in">
      <h1
        className="text-[2.5rem] font-bold text-[#111827] leading-tight mb-2"
        style={{ letterSpacing: "-0.02em" }}
      >
        Publications
      </h1>

      <div className="flex flex-col gap-12 mt-10">
        {TIERS.map((tier) => {
          const pubs = all.filter((p) => p.status === tier.status);
          return (
            <section key={tier.status} aria-label={`${tier.label} publications`}>
              {/* Tier heading */}
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="inline-block w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: tier.dot }}
                  aria-hidden="true"
                />
                <h2
                  className="text-[13px] font-semibold uppercase tracking-widest"
                  style={{ color: tier.color, letterSpacing: "0.1em" }}
                >
                  {tier.label}
                </h2>
                <span className="text-[12px] font-medium text-[#9CA3AF] tabular-nums">
                  ({pubs.length})
                </span>
                <div className="flex-1 h-px bg-[#E5E7EB]" aria-hidden="true" />
              </div>

              {pubs.length === 0 ? (
                <p className="text-[13px] text-[#9CA3AF] italic pl-5">
                  {tier.emptyHint}
                </p>
              ) : (
                <div className="border border-[#E5E7EB] rounded-[8px] px-5 divide-y divide-[#E5E7EB]">
                  {pubs.map((pub) => (
                    <PublicationEntry key={pub.title} publication={pub} />
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
