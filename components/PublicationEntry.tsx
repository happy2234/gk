"use client";

import { useState } from "react";
import {
  FileText,
  Code2,
  Clipboard,
  Check,
  Link as LinkIcon,
} from "lucide-react";
import Badge from "./Badge";
import ExternalLink from "./ExternalLink";
import type { Publication } from "@/lib/content";

interface PublicationEntryProps {
  publication: Publication;
}

export default function PublicationEntry({ publication }: PublicationEntryProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyBibtex = async () => {
    if (!publication.bibtex) return;
    try {
      await navigator.clipboard.writeText(publication.bibtex);
    } catch {
      const el = document.createElement("textarea");
      el.value = publication.bibtex;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <article className="py-5 border-b border-gray-200 dark:border-gray-800 last:border-b-0">
      <div className="flex items-start gap-3 mb-1.5">
        <h3 className="text-[15px] font-semibold text-gray-900 dark:text-gray-100 leading-snug m-0 flex-1">
          {publication.title}
        </h3>
        <Badge
          label={publication.status}
          variant="status"
          status={publication.status as "published" | "accepted" | "in-review" | "in-prep"}
        />
      </div>

      <p className="text-[13px] text-gray-500 dark:text-gray-400 m-0 mb-2 leading-relaxed">
        {publication.authors.join(", ")}
        {" · "}
        <span className="text-gray-700 dark:text-gray-300">{publication.venue}</span>
        {" · "}
        {publication.year}
      </p>

      {publication.abstract && (
        <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed m-0 mb-3 line-clamp-2 break-words">
          {publication.abstract}
        </p>
      )}

      {/* Action links — icon + label, never icon-only for accessibility */}
      <div className="flex flex-wrap items-center gap-3">
        {publication.pdfLink && (
          <ExternalLink
            href={publication.pdfLink}
            className="text-[12px] font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 gap-1"
            aria-label={`PDF: ${publication.title}`}
          >
            <FileText size={13} strokeWidth={1.75} aria-hidden="true" />
            PDF
          </ExternalLink>
        )}
        {publication.arxivLink && (
          <ExternalLink
            href={publication.arxivLink}
            className="text-[12px] font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 gap-1"
            aria-label={`arXiv: ${publication.title}`}
          >
            {/* arXiv branded text mark — plain text is most reliable */}
            <span className="font-serif italic text-[11px]" aria-hidden="true">ar</span>
            arXiv
          </ExternalLink>
        )}
        {publication.codeLink && (
          <ExternalLink
            href={publication.codeLink}
            className="text-[12px] font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 gap-1"
            aria-label={`Code: ${publication.title}`}
          >
            <Code2 size={13} strokeWidth={1.75} aria-hidden="true" />
            Code
          </ExternalLink>
        )}
        {publication.doi && (
          <ExternalLink
            href={`https://doi.org/${publication.doi}`}
            className="text-[12px] font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 gap-1"
            aria-label={`DOI: ${publication.title}`}
          >
            <LinkIcon size={13} strokeWidth={1.75} aria-hidden="true" />
            DOI
          </ExternalLink>
        )}
        {publication.bibtex && (
          <button
            onClick={handleCopyBibtex}
            className="inline-flex items-center gap-1 text-[12px] font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors duration-150 cursor-pointer bg-transparent border-none p-0"
            aria-label={`Copy BibTeX: ${publication.title}`}
            id={`copy-bibtex-${publication.title.replace(/\s+/g, "-").toLowerCase().slice(0, 30)}`}
          >
            {copied ? (
              <>
                <Check size={13} strokeWidth={2} className="text-green-600" aria-hidden="true" />
                <span className="text-green-600">Copied</span>
              </>
            ) : (
              <>
                <Clipboard size={13} strokeWidth={1.75} aria-hidden="true" />
                BibTeX
              </>
            )}
          </button>
        )}
      </div>
    </article>
  );
}
