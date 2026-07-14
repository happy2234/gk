import Link from "next/link";
import { Mail, BookOpen } from "lucide-react";
import { getSiteConfig } from "@/lib/content";

// Inline SVG brand icons — lucide-react doesn't ship brand icons
function GithubIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}
function LinkedinIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function ScholarIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 3L1 9l4 2.18V17c0 1.1 3.13 3 7 3s7-1.9 7-3v-5.82L20 9l-8 4.82L4.27 9.5 12 5.34l7.73 4.16L18 10.09v-.09l-6 3.6L5 10V9l7-4.18zM19 11.18l1 .55V17c0 1.1-3.13 3-7 3v-2c2.76 0 5-.9 5-1V11.18z" />
    </svg>
  );
}

function FooterIcon({ id }: { id: string }) {
  switch (id) {
    case "email":    return <Mail size={16} strokeWidth={1.75} aria-hidden="true" />;
    case "github":   return <GithubIcon />;
    case "linkedin": return <LinkedinIcon />;
    case "scholar":  return <ScholarIcon />;
    case "x":        return <XIcon />;
    default:         return <BookOpen size={16} strokeWidth={1.75} aria-hidden="true" />;
  }
}

export default function Footer() {
  const site = getSiteConfig();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#E5E7EB] mt-24">
      <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[13px] text-[#9CA3AF] m-0">
          © {year} Gaurav
        </p>

        <nav aria-label="Footer navigation">
          <ul className="flex items-center gap-4 list-none m-0 p-0">
            {site.socialLinks.map(({ id, label, href, external }) => (
              <li key={id}>
                <a
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="text-[#9CA3AF] hover:text-[#111827] transition-colors duration-150 flex items-center"
                >
                  <FooterIcon id={id} />
                </a>
              </li>
            ))}

            {/* Divider */}
            <li aria-hidden="true" className="w-px h-4 bg-[#E5E7EB]" />

            <li>
              <Link
                href="/contact"
                className="text-[13px] text-[#9CA3AF] hover:text-[#111827] transition-colors duration-150"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
