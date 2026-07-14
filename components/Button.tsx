import React from "react";
import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  external?: boolean;
  className?: string;
  type?: "button" | "submit";
  id?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  ghost: "btn-ghost",
};

const base =
  "inline-flex items-center gap-2 px-4 py-2 rounded-[6px] text-[14px] font-medium transition-all duration-150 cursor-pointer no-underline leading-none";

export default function Button({
  children,
  href,
  onClick,
  variant = "secondary",
  external = false,
  className = "",
  type = "button",
  id,
}: ButtonProps) {
  const classes = `${base} ${variantStyles[variant]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a
          id={id}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {children}
        </a>
      );
    }
    return (
      <Link id={id} href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      className={classes}
    >
      {children}
    </button>
  );
}
