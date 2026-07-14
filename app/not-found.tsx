import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/Button";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24 flex flex-col items-start animate-fade-in">
      <p className="text-[12px] font-semibold text-[#6B7280] uppercase tracking-widest mb-3">
        404
      </p>
      <h1
        className="text-[2.5rem] font-bold text-[#111827] leading-tight mb-4"
        style={{ letterSpacing: "-0.02em" }}
      >
        Page not found
      </h1>
      <p className="text-[17px] text-[#6B7280] mb-8 max-w-[50ch] leading-relaxed">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <div className="flex gap-3">
        <Button href="/" variant="primary" id="not-found-home">
          Go Home
        </Button>
        <Button href="/contact" variant="secondary" id="not-found-contact">
          Contact
        </Button>
      </div>
    </div>
  );
}
