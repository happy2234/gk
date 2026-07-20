import type { Metadata } from "next";
import Link from "next/link";
import { getCurrently } from "@/lib/content";
import type { CurrentlyItem } from "@/lib/content";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Currently — Gaurav",
  description:
    "What I'm actively working on right now: research, projects, coursework, and goals.",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

const TYPE_META: Record<
  CurrentlyItem["type"],
  { label: string; colorClass: string; bgClass: string }
> = {
  paper: {
    label: "Paper",
    colorClass: "text-purple-700 dark:text-purple-400",
    bgClass: "bg-purple-100 dark:bg-purple-900/30",
  },
  project: {
    label: "Project",
    colorClass: "text-blue-600 dark:text-blue-400",
    bgClass: "bg-blue-100 dark:bg-blue-900/30",
  },
  coursework: {
    label: "Coursework",
    colorClass: "text-green-600 dark:text-green-400",
    bgClass: "bg-green-100 dark:bg-green-900/30",
  },
  goal: {
    label: "Goal",
    colorClass: "text-amber-600 dark:text-amber-400",
    bgClass: "bg-amber-100 dark:bg-amber-900/30",
  },
};

const STATUS_META: Record<
  CurrentlyItem["status"],
  { label: string; dotClass: string }
> = {
  active: { label: "Active", dotClass: "bg-blue-600 dark:bg-blue-500 animate-pulse-dot" },
  paused: { label: "Paused", dotClass: "bg-gray-300 dark:bg-gray-600" },
};

function daysSince(dateStr: string): number {
  const now = new Date();
  const then = new Date(dateStr);
  return Math.floor((now.getTime() - then.getTime()) / (1000 * 60 * 60 * 24));
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ─── Item Card ────────────────────────────────────────────────────────────────

function CurrentlyItemCard({ item }: { item: CurrentlyItem }) {
  const type = TYPE_META[item.type];
  const status = STATUS_META[item.status];

  return (
    <div
      className="border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 rounded-[10px] p-5 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-md dark:hover:shadow-gray-800/50 transition-all duration-200"
    >
      <div className="flex items-start gap-3">
        {/* Status dot */}
        <span
          className={`w-2 h-2 rounded-full mt-[6px] flex-shrink-0 ${status.dotClass}`}
          aria-label={status.label}
        />

        <div className="flex-1 min-w-0">
          {/* Title */}
          <div className="flex flex-wrap items-start gap-2 mb-1">
            {item.link ? (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[15px] font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-150 underline underline-offset-2 decoration-gray-200 dark:decoration-gray-700 hover:decoration-blue-600 dark:hover:decoration-blue-400 leading-snug"
              >
                {item.title}
                <span className="inline-block ml-1 opacity-50" aria-hidden="true">↗</span>
              </a>
            ) : (
              <span className="text-[15px] font-medium text-gray-900 dark:text-gray-100 leading-snug">
                {item.title}
              </span>
            )}
          </div>

          {/* Note */}
          {item.note && (
            <p className="text-[13px] text-gray-500 dark:text-gray-400 m-0 mt-1 leading-relaxed">
              {item.note}
            </p>
          )}

          {/* Badges */}
          <div className="flex items-center gap-2 mt-3">
            {/* Type badge */}
            <span
              className={`text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${type.colorClass} ${type.bgClass}`}
            >
              {type.label}
            </span>

            {/* Status badge */}
            <span
              className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                item.status === "active"
                  ? "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30"
                  : "text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800"
              }`}
            >
              {status.label}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const SECTION_ORDER: CurrentlyItem["type"][] = [
  "paper",
  "project",
  "coursework",
  "goal",
];

export default function CurrentlyPage() {
  const currently = getCurrently();
  const { items, updatedAt } = currently;

  const days = daysSince(updatedAt);
  const isStale = days > 60;
  const hasItems = items.length > 0;

  // Group by type
  const grouped = SECTION_ORDER.reduce<
    Record<CurrentlyItem["type"], CurrentlyItem[]>
  >(
    (acc, type) => {
      acc[type] = items.filter((i) => i.type === type);
      return acc;
    },
    { paper: [], project: [], coursework: [], goal: [] }
  );

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 animate-fade-in">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2.5 mb-4">
          <span
            className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
              items.some((i) => i.status === "active")
                ? "bg-blue-600 dark:bg-blue-500 animate-pulse-dot"
                : "bg-gray-300 dark:bg-gray-600"
            }`}
            aria-hidden="true"
          />
          <SectionHeading
            title="Currently"
            subtitle="What I'm actively working on right now."
            className="mb-0"
          />
        </div>

        {/* Updated timestamp */}
        <p
          className={`text-[13px] mt-2 ${
            isStale ? "text-red-500" : "text-gray-400 dark:text-gray-500"
          }`}
        >
          {isStale ? "⚠ " : ""}Last updated: {formatDate(updatedAt)}
          {isStale && ` (${days} days ago)`}
        </p>
      </div>

      {/* Content */}
      {!hasItems ? (
        <div className="text-center py-20 border border-dashed border-gray-200 dark:border-gray-800 rounded-[12px]">
          <p className="text-[15px] text-gray-500 dark:text-gray-400">
            Nothing listed yet. Edit{" "}
            <code className="text-[13px] bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">
              content/currently.json
            </code>{" "}
            to add items.
          </p>
        </div>
      ) : (
        <div className="space-y-12">
          {SECTION_ORDER.map((type) => {
            const sectionItems = grouped[type];
            if (sectionItems.length === 0) return null;
            const meta = TYPE_META[type];

            return (
              <section key={type} aria-label={`${meta.label} items`}>
                <h2
                  className={`text-[11px] font-semibold uppercase tracking-widest mb-4 ${meta.colorClass}`}
                >
                  {meta.label}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {sectionItems.map((item, i) => (
                    <CurrentlyItemCard key={i} item={item} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}

      {/* Footer hint */}
      <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
        <p className="text-[13px] text-gray-400 dark:text-gray-500">
          Inspired by{" "}
          <a
            href="https://nownownow.com/about"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-150 underline underline-offset-2"
          >
            /now pages
          </a>
          . ·{" "}
          <Link
            href="/"
            className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-150"
          >
            ← Back home
          </Link>
        </p>
      </div>
    </div>
  );
}
