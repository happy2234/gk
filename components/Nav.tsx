"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/currently", label: "Currently" },
  { href: "/projects", label: "Projects" },
  { href: "/research", label: "Research" },
  { href: "/publications", label: "Publications" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-[#E5E7EB]"
      style={{ transition: "background 150ms ease-out" }}
    >
      <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo / Name */}
        <Link
          href="/"
          className="text-[15px] font-semibold text-[#111827] tracking-tight hover:text-[#2563EB] transition-colors duration-150"
          aria-label="Home"
        >
          Gaurav
        </Link>

        {/* Nav links */}
        <nav aria-label="Main navigation">
          <ul className="flex items-center gap-1 list-none m-0 p-0">
            {navLinks.slice(1).map(({ href, label }) => {
              const isActive =
                href === "/"
                  ? pathname === "/"
                  : pathname === href || pathname.startsWith(href + "/");
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={[
                      "text-[14px] px-3 py-1.5 rounded-md transition-colors duration-150 relative",
                      isActive
                        ? "text-[#111827] font-medium"
                        : "text-[#6B7280] hover:text-[#111827]",
                    ].join(" ")}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {label}
                    {isActive && (
                      <span
                        className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#2563EB] rounded-full"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
