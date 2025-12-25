"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Register GSAP plugin safely on client
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BeeTrendsLanding() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  // FIX: reference the actual <img> element rendered by next/image
  const imageRef = useRef<HTMLImageElement | null>(null);

  useLayoutEffect(() => {
    if (!rootRef.current || !heroRef.current || !imageRef.current) return;

    const ctx = gsap.context(() => {
      // HERO IMAGE PARALLAX (animate the actual image element)
      gsap.fromTo(
        imageRef.current!,
        { y: 0 },
        {
          y: 120,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current!,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // FADE-UP ANIMATIONS
      gsap.utils.toArray<HTMLElement>(".fade-up").forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={rootRef}
      className="bg-neutral-950 text-neutral-100 overflow-hidden"
    >
      {/* HERO SECTION */}
      <section
        ref={heroRef}
        className="relative h-screen w-full flex items-center justify-center"
      >
        <div className="absolute inset-0 overflow-hidden">
          <Image
            ref={imageRef}
            src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2400&auto=format&fit=crop"
            alt="BeeTrends Apparel"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-90 will-change-transform"
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>

        <div className="relative z-10 max-w-6xl px-6 text-center">
          <h1 className="fade-up text-5xl md:text-[12rem] font-light tracking-tight">
            Bee Trends
          </h1>
          <p className="fade-up mt-6 text-lg md:text-xl text-neutral-300 max-w-3xl mx-auto">
            Custom T-shirts, branded apparel & promotional wear engineered for
            quality, durability, and timeless style.
          </p>
          <div className="fade-up mt-10 flex justify-center gap-6">
            <button className="rounded-full bg-white text-black px-8 py-3 text-sm tracking-wide hover:bg-neutral-200 transition">
              Explore Collections
            </button>
            <button className="rounded-full border border-white/30 px-8 py-3 text-sm tracking-wide hover:border-white transition">
              Start Custom Order
            </button>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="fade-up text-4xl md:text-5xl font-light">
              Precision-Driven Apparel Manufacturing
            </h2>
            <p className="fade-up mt-6 text-neutral-400 leading-relaxed">
              We are a leading manufacturer of custom T-shirts, branded apparel,
              and promotional wear. From concept to production, BeeTrends
              delivers tailor-made solutions with absolute professionalism.
            </p>
            <p className="fade-up mt-4 text-neutral-400">
              Dependable. Stylish. Premium. Every order. Every time.
            </p>
          </div>
          <div className="relative h-[420px] rounded-3xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1800&auto=format&fit=crop"
              alt="Premium Fabric"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* PARALLAX FEATURE STRIP */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1593032465175-481ac7f401a0?q=80&w=2400&auto=format&fit=crop"
            alt="Manufacturing"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-neutral-950/60" />
        </div>
        <h3 className="fade-up relative z-10 text-3xl md:text-5xl font-light text-center max-w-4xl px-6">
          Engineered for Teams, Events & Retail Brands Worldwide
        </h3>
      </section>

      {/* FEATURES */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          {["Premium Fabrics", "Advanced Printing", "Scalable Production"].map(
            (item) => (
              <div
                key={item}
                className="fade-up rounded-3xl border border-white/10 p-10 bg-white/5 backdrop-blur"
              >
                <h4 className="text-xl font-medium mb-4">{item}</h4>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  Crafted with attention to detail, optimized for durability,
                  and designed to elevate your brand presence.
                </p>
              </div>
            )
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 text-center">
        <h2 className="fade-up text-4xl md:text-5xl font-light">
          Let’s Build Your Brand in Fabric
        </h2>
        <p className="fade-up mt-6 text-neutral-400 max-w-2xl mx-auto">
          From bulk corporate orders to premium retail lines, BeeTrends makes
          customization effortless and exceptional.
        </p>
        <div className="relative inline-block group">
          <button className="fade-up mt-10 rounded-full bg-white text-black px-10 py-4 text-sm tracking-wide hover:bg-neutral-200 transition">
            Contact BeeTrends
          </button>

          {/* Tooltip */}
          <div
            className="
      pointer-events-none
      absolute left-1/2 -translate-x-1/2
      top-4
      opacity-0 scale-95
      group-hover:opacity-100 group-hover:scale-100
      transition-all duration-300 ease-out
      bg-neutral-900 text-white
      text-xs tracking-wide
      px-4 py-2 rounded-full
      shadow-xl
      whitespace-nowrap
    "
          >
            📞 +91 98945 05545
            {/* Pointer */}
            <span
              className="
        absolute left-1/2 -translate-x-1/2
        -bottom-1
        w-2 h-2
        bg-neutral-900
        rotate-45
      "
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-10 text-center text-sm text-neutral-500">
        © {new Date().getFullYear()} BeeTrends. Premium Custom Apparel
        Manufacturing.
      </footer>
    </main>
  );
}
