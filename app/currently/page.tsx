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
  { label: string; color: string; bg: string }
> = {
  paper: {
    label: "Paper",
    color: "#7C3AED",
    bg: "#EDE9FE",
  },
  project: {
    label: "Project",
    color: "#2563EB",
    bg: "#DBEAFE",
  },
  coursework: {
    label: "Coursework",
    color: "#059669",
    bg: "#D1FAE5",
  },
  goal: {
    label: "Goal",
    color: "#D97706",
    bg: "#FEF3C7",
  },
};

const STATUS_META: Record<
  CurrentlyItem["status"],
  { label: string; dotClass: string }
> = {
  active: { label: "Active", dotClass: "bg-[#2563EB] animate-pulse-dot" },
  paused: { label: "Paused", dotClass: "bg-[#D1D5DB]" },
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
      className="border border-[#E5E7EB] rounded-[10px] p-5 hover:border-[#D1D5DB] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-all duration-200"
      style={{ background: "#FAFAFA" }}
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
                className="text-[15px] font-medium text-[#111827] hover:text-[#2563EB] transition-colors duration-150 underline underline-offset-2 decoration-[#E5E7EB] hover:decoration-[#2563EB] leading-snug"
              >
                {item.title}
                <span className="inline-block ml-1 opacity-50" aria-hidden="true">↗</span>
              </a>
            ) : (
              <span className="text-[15px] font-medium text-[#111827] leading-snug">
                {item.title}
              </span>
            )}
          </div>

          {/* Note */}
          {item.note && (
            <p className="text-[13px] text-[#6B7280] m-0 mt-1 leading-relaxed">
              {item.note}
            </p>
          )}

          {/* Badges */}
          <div className="flex items-center gap-2 mt-3">
            {/* Type badge */}
            <span
              className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
              style={{ color: type.color, backgroundColor: type.bg }}
            >
              {type.label}
            </span>

            {/* Status badge */}
            <span
              className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                item.status === "active"
                  ? "text-[#2563EB] bg-[#DBEAFE]"
                  : "text-[#6B7280] bg-[#F3F4F6]"
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
                ? "bg-[#2563EB] animate-pulse-dot"
                : "bg-[#D1D5DB]"
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
            isStale ? "text-[#EF4444]" : "text-[#9CA3AF]"
          }`}
        >
          {isStale ? "⚠ " : ""}Last updated: {formatDate(updatedAt)}
          {isStale && ` (${days} days ago)`}
        </p>
      </div>

      {/* Content */}
      {!hasItems ? (
        <div className="text-center py-20 border border-dashed border-[#E5E7EB] rounded-[12px]">
          <p className="text-[15px] text-[#6B7280]">
            Nothing listed yet. Edit{" "}
            <code className="text-[13px] bg-[#F3F4F6] px-1.5 py-0.5 rounded">
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
                  className="text-[11px] font-semibold uppercase tracking-widest mb-4"
                  style={{ color: meta.color }}
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
      <div className="mt-16 pt-8 border-t border-[#E5E7EB]">
        <p className="text-[13px] text-[#9CA3AF]">
          Inspired by{" "}
          <a
            href="https://nownownow.com/about"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#6B7280] hover:text-[#2563EB] transition-colors duration-150 underline underline-offset-2"
          >
            /now pages
          </a>
          . ·{" "}
          <Link
            href="/"
            className="text-[#6B7280] hover:text-[#2563EB] transition-colors duration-150"
          >
            ← Back home
          </Link>
        </p>
      </div>
    </div>
  );
}
