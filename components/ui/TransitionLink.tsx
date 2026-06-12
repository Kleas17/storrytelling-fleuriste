"use client";

import Link from "next/link";
import { type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from "react";
import { usePageTransition } from "@/components/providers/TransitionProvider";

interface TransitionLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
}

/** Lien interne avec transition de page rideau (GSAP). */
export default function TransitionLink({
  href,
  children,
  onClick,
  ...rest
}: TransitionLinkProps) {
  const { navigate } = usePageTransition();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    // Laisse les ouvertures en nouvel onglet / modificateurs au navigateur.
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }
    e.preventDefault();
    navigate(href);
  };

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
