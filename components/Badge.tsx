import React from "react";
import { CheckCircle, Clock, FileEdit, Archive, PauseCircle, Activity } from "lucide-react";

type BadgeVariant = "status" | "tag";
type StatusType = "active" | "published" | "accepted" | "in-review" | "in-prep" | "archived" | "paused";

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  status?: StatusType;
  className?: string;
}

const statusConfig: Record<
  StatusType,
  { style: string; text: string; Icon: React.FC<{ size: number; strokeWidth: number }> }
> = {
  // Green = "done / in the world" — deliberate single exception to one-accent rule
  published: {
    style: "bg-green-50 text-green-700 border-green-200",
    text: "Published",
    Icon: CheckCircle,
  },
  // Blue (#2563EB family) = accepted
  accepted: {
    style: "bg-blue-50 text-[#2563EB] border-blue-200",
    text: "Accepted",
    Icon: CheckCircle,
  },
  // Amber = under scrutiny / waiting
  "in-review": {
    style: "bg-amber-50 text-amber-700 border-amber-200",
    text: "In Review",
    Icon: Clock,
  },
  // Gray = draft / not started
  "in-prep": {
    style: "bg-[#F3F4F6] text-[#6B7280] border-[#E5E7EB]",
    text: "In Prep",
    Icon: FileEdit,
  },
  // Blue = active/ongoing — Activity icon reads "in progress", not "done"
  active: {
    style: "bg-blue-50 text-[#2563EB] border-blue-200",
    text: "Active",
    Icon: Activity,
  },
  archived: {
    style: "bg-[#F3F4F6] text-[#6B7280] border-[#E5E7EB]",
    text: "Archived",
    Icon: Archive,
  },
  paused: {
    style: "bg-[#F3F4F6] text-[#6B7280] border-[#E5E7EB]",
    text: "Paused",
    Icon: PauseCircle,
  },
};

const base =
  "inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md border leading-none whitespace-nowrap";

export default function Badge({
  label,
  variant = "tag",
  status,
  className = "",
}: BadgeProps) {
  if (variant === "status" && status) {
    const { style, text, Icon } = statusConfig[status];
    return (
      <span className={`${base} ${style} ${className}`}>
        {/* Icon + text — never icon-only, for accessibility */}
        <Icon size={11} strokeWidth={2} aria-hidden="true" />
        {text}
      </span>
    );
  }

  // Tag chip — plain text, no icon
  return (
    <span
      className={`${base} bg-[#F3F4F6] text-[#374151] border-[#E5E7EB] ${className}`}
    >
      {label}
    </span>
  );
}
