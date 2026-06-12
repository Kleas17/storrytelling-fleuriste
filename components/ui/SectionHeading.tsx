"use client";

import { gsap, SplitText } from "@/lib/gsap";
import { useGsapScope, prefersReducedMotion } from "@/hooks/useGsap";

interface SectionHeadingProps {
  label?: string;
  titre: string;
  className?: string;
  align?: "left" | "center";
  dark?: boolean;
}

/** Titre de section avec reveal SplitText (lignes masquées, bas → haut). */
export default function SectionHeading({
  label,
  titre,
  className = "",
  align = "left",
  dark = false,
}: SectionHeadingProps) {
  const scope = useGsapScope<HTMLDivElement>(() => {
    if (prefersReducedMotion()) return;
    const heading = scope.current?.querySelector(".sh-titre");
    if (!heading) return;

    const split = new SplitText(heading, {
      type: "lines",
      linesClass: "sh-line",
    });
    split.lines.forEach((line) => {
      const wrap = document.createElement("div");
      wrap.className = "split-line-mask";
      line.parentNode?.insertBefore(wrap, line);
      wrap.appendChild(line);
    });

    gsap.from(split.lines, {
      yPercent: 110,
      duration: 1,
      stagger: 0.1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: scope.current,
        start: "top 82%",
        once: true,
      },
    });

    gsap.from(".sh-label", {
      opacity: 0,
      y: 10,
      duration: 0.8,
      delay: 0.15,
      scrollTrigger: {
        trigger: scope.current,
        start: "top 82%",
        once: true,
      },
    });
  });

  return (
    <div
      ref={scope}
      className={`${align === "center" ? "text-center" : ""} ${className}`}
    >
      {label && (
        <p
          className={`sh-label mb-4 font-caps text-sm uppercase tracking-[0.25em] ${
            dark ? "text-sienne" : "text-sienne"
          }`}
        >
          {label}
        </p>
      )}
      <h2
        className={`sh-titre text-balance font-display text-4xl font-semibold leading-[1.1] md:text-6xl ${
          dark ? "text-ivoire" : "text-mousse"
        }`}
      >
        {titre}
      </h2>
    </div>
  );
}
