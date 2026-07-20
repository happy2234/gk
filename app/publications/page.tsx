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
  colorClass: string;
  dotClass: string;
  emptyHint: string;
};

const TIERS: Tier[] = [
  {
    label: "Published",
    status: "published",
    colorClass: "text-green-600 dark:text-green-500",
    dotClass: "bg-green-600 dark:bg-green-500",
    emptyHint: "No published work yet.",
  },
  {
    label: "Accepted",
    status: "accepted",
    colorClass: "text-blue-600 dark:text-blue-500",
    dotClass: "bg-blue-600 dark:bg-blue-500",
    emptyHint: "No accepted papers at the moment.",
  },
  {
    label: "Under Review",
    status: "in-review",
    colorClass: "text-amber-700 dark:text-amber-500",
    dotClass: "bg-amber-600 dark:bg-amber-500",
    emptyHint: "Nothing currently under review.",
  },
  {
    label: "In Preparation",
    status: "in-prep",
    colorClass: "text-gray-600 dark:text-gray-400",
    dotClass: "bg-gray-400 dark:bg-gray-500",
    emptyHint: "No manuscripts in preparation.",
  },
];

export default function PublicationsPage() {
  const all = getAllPublications();

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 animate-fade-in">
      <h1
        className="text-[2.5rem] font-bold text-gray-900 dark:text-gray-100 leading-tight mb-2"
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
                  className={`inline-block w-2 h-2 rounded-full flex-shrink-0 ${tier.dotClass}`}
                  aria-hidden="true"
                />
                <h2
                  className={`text-[13px] font-semibold uppercase tracking-widest ${tier.colorClass}`}
                  style={{ letterSpacing: "0.1em" }}
                >
                  {tier.label}
                </h2>
                <span className="text-[12px] font-medium text-gray-400 dark:text-gray-500 tabular-nums">
                  ({pubs.length})
                </span>
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" aria-hidden="true" />
              </div>

              {pubs.length === 0 ? (
                <p className="text-[13px] text-gray-400 dark:text-gray-500 italic pl-5">
                  {tier.emptyHint}
                </p>
              ) : (
                <div className="border border-gray-200 dark:border-gray-800 rounded-[8px] px-5 divide-y divide-gray-200 dark:divide-gray-800">
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
