import React from "react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`mb-8 ${className}`}>
      <h2
        className="text-[1.75rem] font-semibold text-gray-900 dark:text-gray-100 leading-tight m-0"
        style={{ letterSpacing: "-0.01em" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-[15px] text-gray-500 dark:text-gray-400 m-0 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
