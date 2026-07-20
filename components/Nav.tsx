"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

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
  const [isOpen, setIsOpen] = useState(false);

  // Close mobile menu when pathname changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className="sticky top-0 z-50 bg-white/90 dark:bg-gray-950/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 transition-colors duration-200"
    >
      <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo / Name */}
        <Link
          href="/"
          className="text-[15px] font-semibold text-gray-900 dark:text-gray-100 tracking-tight hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-150 z-50 relative"
          aria-label="Home"
        >
          Gaurav
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-2">
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
                          ? "text-gray-900 dark:text-gray-100 font-medium"
                          : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800",
                      ].join(" ")}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {label}
                      {isActive && (
                        <span
                          className="absolute bottom-0 left-3 right-3 h-[2px] bg-blue-600 dark:bg-blue-500 rounded-full"
                          aria-hidden="true"
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="w-px h-4 bg-gray-200 dark:bg-gray-800 mx-1"></div>
          <ThemeToggle />
        </div>

        {/* Mobile Nav Toggle */}
        <div className="flex md:hidden items-center gap-2 z-50 relative">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-[100%] left-0 w-full bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 shadow-lg py-2 px-4 flex flex-col gap-1 z-40">
          {navLinks.slice(1).map(({ href, label }) => {
            const isActive =
              href === "/"
                ? pathname === "/"
                : pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={[
                  "text-[15px] px-4 py-2.5 rounded-md transition-colors",
                  isActive
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 font-medium"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100",
                ].join(" ")}
                aria-current={isActive ? "page" : undefined}
              >
                {label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
