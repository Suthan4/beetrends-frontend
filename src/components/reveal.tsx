"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type ElementType,
} from "react";

/**
 * Mirrors the original site's `.rv` scroll-reveal behavior:
 * elements below the fold start hidden/offset, then fade+rise in
 * once they cross the viewport threshold. Elements already in view
 * on load are never hidden (avoids content flashing for users who
 * land mid-page).
 */
export default function Reveal({
  children,
  className = "",
  as: Tag = "div",
  id,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  id?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [hideInitially, setHideInitially] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      setInView(true);
      return;
    }

    if (el.getBoundingClientRect().top > window.innerHeight) {
      setHideInitially(true);
    } else {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      className={`transition-all duration-700 ease-out ${
        hideInitially && !inView
          ? "opacity-0 translate-y-6"
          : "opacity-100 translate-y-0"
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
