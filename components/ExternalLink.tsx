import { ExternalLink as ExternalLinkIcon } from "lucide-react";
import React from "react";

interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
  "aria-label"?: string;
}

/**
 * Every outbound link gets a consistent ↗ icon automatically.
 * Sized at 12px so it sits inline with text without dominating.
 */
export default function ExternalLink({
  href,
  children,
  className = "",
  id,
  "aria-label": ariaLabel,
}: ExternalLinkProps) {
  return (
    <a
      id={id}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={`inline-flex items-center gap-1 transition-colors duration-150 ${className}`}
    >
      {children}
      <ExternalLinkIcon
        size={11}
        strokeWidth={2}
        className="opacity-60 flex-shrink-0"
        aria-hidden="true"
      />
    </a>
  );
}
