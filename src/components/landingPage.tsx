"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type FormEvent,
} from "react";
import Image from "next/image";
import Reveal from "./reveal";

/* -------------------------------------------------------------------------
   beetrends — landing page
   Converted from the static index.html into Next.js + TypeScript + Tailwind.

   Setup checklist:
   1. Copy assets/img/* into /public/img/, assets/fonts/* into /public/fonts/
   2. Append globals-additions.css to src/app/globals.css
   3. Put Reveal.tsx next to this file
   4. This component is a client component (uses hooks) — drop it straight
      into page.tsx: `<LandingPage />`
   ------------------------------------------------------------------------- */

const NAV_LINKS = [
  { href: "#top", label: "Home" },
  { href: "#story", label: "Our Story" },
  { href: "#tiruppur", label: "Why Tiruppur" },
  { href: "#collections", label: "Collections" },
  { href: "#kids", label: "For Kids" },
];

const SECTION_IDS = [
  "top",
  "story",
  "tiruppur",
  "collections",
  "kids",
  "people",
];

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const [showToTop, setShowToTop] = useState(false);

  // active nav link on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -55% 0px" },
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // back-to-top visibility
  useEffect(() => {
    const onScroll = () => setShowToTop(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="bt-grain bg-[var(--paper)] text-[var(--ink)] font-[Space_Grotesk,sans-serif] overflow-x-hidden">
      <Nav
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        activeSection={activeSection}
      />
      <Hero />
      <Ribbon />
      <Manifesto />
      <Founders />
      <Tiruppur />
      <Mark />
      <Collections />
      <Kids />
      <People />
      <Footer />
      <BackToTop show={showToTop} />
    </div>
  );
}

/* ============================== NAV ============================== */

function Nav({
  menuOpen,
  setMenuOpen,
  activeSection,
}: {
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  activeSection: string;
}) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-[var(--paper)]/[.86] backdrop-blur-md border-b border-black/[.08]">
      <div className="max-w-[1240px] mx-auto flex items-center justify-between gap-[18px] px-[clamp(18px,4vw,44px)] py-[14px]">
        <a href="#top" className="flex items-center gap-3">
          <Image
            src="/img/logo-ink.png"
            alt="beetrends mark"
            width={22}
            height={22}
            className="h-[22px] w-auto"
          />
          <span className="bt-serif font-semibold text-[21px] tracking-tight">
            bee<b className="text-[var(--honey-deep)]">trends</b>
          </span>
        </a>

        <div
          className={`md:flex md:static md:flex-row md:gap-[clamp(16px,2.6vw,34px)] md:items-center md:translate-y-0 md:border-b-0 md:bg-transparent
          fixed inset-x-0 top-[57px] flex-col gap-[22px] bg-[var(--paper)] border-b border-black/10 px-[clamp(18px,4vw,44px)] pt-[26px] pb-[34px]
          transition-transform duration-300 ease-out
          ${menuOpen ? "translate-y-0" : "-translate-y-[130%] md:translate-y-0"}`}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`text-[11px] tracking-[.18em] uppercase font-medium transition-opacity hover:opacity-100 hover:text-[var(--terra)] ${
                activeSection === link.href.slice(1)
                  ? "opacity-100 text-[var(--terra)]"
                  : "opacity-80"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#people"
            onClick={() => setMenuOpen(false)}
            className="border-[1.5px] border-[var(--ink)] rounded-full px-[18px] py-2 text-[11px] tracking-[.18em] uppercase font-medium opacity-100 transition-colors hover:bg-[var(--ink)] hover:text-[var(--paper)] w-fit"
          >
            Contact Us
          </a>
        </div>

        <button
          aria-label="Menu"
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-1.5"
        >
          <span
            className={`block w-6 h-0.5 bg-[var(--ink)] my-[5px] transition-transform ${
              menuOpen ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-[var(--ink)] my-[5px] transition-opacity ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-[var(--ink)] my-[5px] transition-transform ${
              menuOpen ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>
    </nav>
  );
}

/* ============================== HERO ============================== */

function Hero() {
  return (
    <header
      id="top"
      className="relative min-h-[100svh] flex items-end overflow-hidden"
    >
      <div className="absolute inset-0">
        <Image
          src="/img/hero.jpg"
          alt="beetrends oversized hoodie"
          fill
          priority
          className="object-cover object-[50%_8%]"
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(250,245,236,.5)_0%,rgba(250,245,236,0)_32%,rgba(16,13,9,.1)_62%,rgba(16,13,9,.68)_100%)]" />
      <div className="relative z-[2] w-full pb-[clamp(40px,7vw,90px)] text-[var(--paper)] max-w-[1240px] mx-auto px-[clamp(18px,4vw,44px)]">
        <h1 className="bt-serif font-semibold text-[clamp(64px,13vw,168px)] leading-[.94] tracking-tight">
          beetrends
        </h1>
        <div className="mt-4 text-[clamp(16px,2.2vw,24px)] font-light">
          Woven in Tiruppur. Worn by the world.
        </div>
        <div className="mt-[clamp(22px,3.5vw,40px)] flex gap-3 flex-wrap">
          <a
            href="#collections"
            className="inline-block rounded-full px-7 py-3.5 text-xs tracking-[.16em] uppercase font-semibold bg-[var(--honey)] text-[var(--ink)] transition-colors hover:bg-[var(--paper)]"
          >
            Explore collections
          </a>
          <a
            href="#story"
            className="inline-block rounded-full px-7 py-3.5 text-xs tracking-[.16em] uppercase font-semibold border-[1.5px] border-[var(--paper)]/70 text-[var(--paper)] transition-colors hover:bg-[var(--paper)]/[.16]"
          >
            Our story
          </a>
        </div>
        <div className="mt-[clamp(22px,3.5vw,40px)] border-t-2 border-dashed border-[var(--paper)]/50 pt-[18px] flex justify-between gap-3.5 flex-wrap">
          <span className="text-[clamp(10px,1.1vw,12px)] tracking-[.22em] uppercase font-medium">
            Tees · Polos · Hoodies · Athleisure
          </span>
          <span className="text-[clamp(10px,1.1vw,12px)] tracking-[.22em] uppercase font-medium">
            Men · Women · Kids
          </span>
        </div>
      </div>
    </header>
  );
}

/* ============================== RIBBON ============================== */

function Ribbon() {
  const text =
    "Tees · Polos · Hoodies · Athleisure ✦ Made in Tiruppur ✦ Men · Women · Kids ✦ Be the trend ✦ ";
  return (
    <div
      className="bg-[var(--honey)] text-[var(--ink)] overflow-hidden py-[13px]"
      aria-hidden="true"
    >
      <div className="bt-ribbon-track flex w-max">
        <span className="whitespace-nowrap text-[12.5px] tracking-[.22em] uppercase font-semibold">
          {text}
        </span>
        <span className="whitespace-nowrap text-[12.5px] tracking-[.22em] uppercase font-semibold">
          {text}
        </span>
      </div>
    </div>
  );
}

/* ============================== MANIFESTO ============================== */

function Manifesto() {
  return (
    <section
      id="story"
      className="bg-[var(--ink)] text-[var(--paper)] py-[clamp(64px,10vw,130px)]"
    >
      <div className="max-w-[1240px] mx-auto px-[clamp(18px,4vw,44px)] grid grid-cols-1 md:grid-cols-[1.35fr_1fr] gap-[clamp(20px,3vw,44px)] items-stretch">
        <Reveal className="flex flex-col justify-center">
          <span className="text-[11.5px] tracking-[.24em] uppercase font-medium text-[var(--honey)]">
            Why we exist
          </span>
          <h2 className="bt-serif font-normal text-[clamp(28px,4vw,48px)] leading-[1.22] mt-[26px]">
            We grew up where{" "}
            <em className="italic text-[var(--honey)] font-medium">cotton</em>{" "}
            grows.
            <br />
            Now we make what the world wears.
          </h2>
          <div className="mt-[26px] text-[clamp(15px,1.5vw,17px)] leading-[1.8] font-light text-[var(--paper)]/[.82] max-w-[620px] space-y-4">
            <p>
              For decades, one small city in Tamil Nadu has quietly made the
              t-shirts, polos and hoodies sold under the world&apos;s biggest
              labels. The cloth left. The name never did.
            </p>
            <p>
              <b className="text-[var(--paper)] font-medium">beetrends</b> was
              started by two children of farmers — a mother of two who refused
              to watch fashion happen from the sidelines, and an engineer who
              believes the best factories on earth are the ones he grew up next
              to — to finally put a name of its own on Tiruppur&apos;s craft.
            </p>
            <p>
              Not a label that hides where it comes from. A brand that leads
              with it.
            </p>
          </div>
          <div className="mt-9">
            <hr className="border-none border-t-2 border-dashed border-[var(--honey)] mb-[18px]" />
            <div className="bt-serif italic text-[clamp(17px,1.9vw,22px)] text-[var(--honey)]">
              &quot;Built on a woman&apos;s ambition. Backed by a city&apos;s
              craft.&quot;
            </div>
          </div>
        </Reveal>
        <Reveal className="grid grid-rows-3 md:grid-rows-3 grid-cols-3 md:grid-cols-1 gap-4 min-h-[200px] md:min-h-[560px]">
          <TilePlain
            src="/img/pexels-khalifa-yahaya-650488521-36029426.jpg"
            alt="Women's knitwear"
          />
          <TilePlain
            src="/img/pexels-neva-szpigel-624981873-19359948.jpg"
            alt="Men's tee"
          />
          <TilePlain
            src="/img/pexels-mirzagraphy-28771911.jpg"
            alt="Kids streetwear"
            position="50% 25%"
            className="hidden sm:block"
          />
        </Reveal>
      </div>
    </section>
  );
}

function TilePlain({
  src,
  alt,
  position = "50% 50%",
  className = "",
}: {
  src: string;
  alt: string;
  position?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-[18px] overflow-hidden bg-[var(--sand)] ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-700 hover:scale-[1.045]"
        style={{ objectPosition: position }}
      />
    </div>
  );
}

/* ============================== FOUNDERS ============================== */

function Founders() {
  return (
    <section className="py-[clamp(64px,10vw,130px)]">
      <div className="max-w-[1240px] mx-auto px-[clamp(18px,4vw,44px)]">
        <Reveal>
          <span className="text-[11.5px] tracking-[.24em] uppercase font-medium text-[var(--terra)]">
            The founders — Kurukkalpatti × Tiruppur
          </span>
          <h2 className="bt-serif font-medium text-[clamp(34px,5.4vw,64px)] leading-[1.04] tracking-tight mt-[18px]">
            Two children of the soil.{" "}
            <em className="italic text-[var(--honey-deep)]">One brand.</em>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(16px,2.4vw,28px)] mt-[clamp(30px,5vw,56px)]">
          <FounderCol
            img="/img/founder-ramadevi.jpg"
            name="Ramadevi S."
            role="Co-founder — Brand & Product"
            email="sramadevi0209@gmail.com"
            bio={
              <>
                A{" "}
                <b className="font-semibold text-[var(--ink)]">
                  farmer&apos;s daughter from Kurukkalpatti
                </b>{" "}
                and a mother of two, Ramadevi started beetrends because watching
                the clothing industry from the outside was no longer enough. She
                wanted her mark on it: her taste, her standards, her name on the
                label. She leads product and design direction with the patience
                of a farm — and the impatience of someone who has waited long
                enough.
              </>
            }
            quote="My father raised crops season after season. I'm raising a brand the same way — no shortcuts."
            quoteWho="Ramadevi — Co-founder"
            quoteBg="bg-[var(--honey-deep)]"
          />
          <FounderCol
            img="/img/founder-yashwanth.jpg"
            name="Yashwanth J."
            role="Co-founder — Operations & Sourcing"
            email="yashwanthj3010@gmail.com"
            bio={
              <>
                A{" "}
                <b className="font-semibold text-[var(--ink)]">
                  farmer&apos;s son and an engineer
                </b>
                , Yashwanth grew up in Tiruppur&apos;s orbit, watching
                world-class garments leave home wearing someone else&apos;s
                name. Joining hands with Ramadevi was his answer: build the
                brand here, own the quality here. He runs sourcing and
                production, and treats a delivery date the way his father
                treated the monsoon — not optional.
              </>
            }
            quote="Tiruppur already makes the world's best knitwear. All that was missing was our own name on it."
            quoteWho="Yashwanth — Co-founder"
            quoteBg="bg-[var(--ink)]"
          />
        </div>
      </div>
    </section>
  );
}

function FounderCol({
  img,
  name,
  role,
  email,
  bio,
  quote,
  quoteWho,
  quoteBg,
}: {
  img: string;
  name: string;
  role: string;
  email: string;
  bio: ReactNode;
  quote: string;
  quoteWho: string;
  quoteBg: string;
}) {
  return (
    <Reveal className="flex flex-col gap-[clamp(16px,2.4vw,28px)]">
      <div className="relative rounded-[18px] overflow-hidden aspect-[4/4.6]">
        <Image
          src={img}
          alt={name}
          fill
          className="object-cover object-[50%_14%]"
        />
        <div className="absolute inset-x-0 bottom-0 px-[22px] pt-[60px] pb-5 bg-[linear-gradient(to_top,rgba(16,13,9,.8),rgba(16,13,9,0))] text-[var(--paper)]">
          <span className="text-[10px] uppercase tracking-[.24em] font-medium text-[var(--honey)]">
            {role}
          </span>
          <h3 className="bt-serif font-semibold text-[clamp(22px,2.4vw,28px)] mt-1">
            {name}
          </h3>
          <p className="text-[13px] opacity-85 mt-[3px]">{email}</p>
        </div>
      </div>
      <div className="bg-[var(--sand)] rounded-[18px] p-[clamp(22px,2.8vw,32px)] text-[clamp(14px,1.45vw,16px)] leading-[1.75] font-light text-[var(--ink-soft)] flex-1">
        <p>{bio}</p>
      </div>
      <div
        className={`${quoteBg} rounded-[18px] p-[clamp(22px,2.8vw,32px)] text-[var(--paper)]`}
      >
        <div className="bt-serif-soft italic text-[clamp(17px,1.9vw,21px)] leading-[1.45] font-medium">
          &quot;{quote}&quot;
        </div>
        <div className="mt-3.5 text-[10px] tracking-[.2em] uppercase opacity-80">
          {quoteWho}
        </div>
      </div>
    </Reveal>
  );
}

/* ============================== TIRUPPUR ============================== */

function Tiruppur() {
  const stats = [
    {
      big: "~90",
      small: "%",
      text: "of India's cotton knitwear exports come from this one city.",
      bg: "bg-[var(--ink)] text-[var(--paper)]",
      p: "text-[var(--paper)]/75",
    },
    {
      big: "$4",
      small: "B+",
      text: "in garments shipped worldwide from Tiruppur every year.",
      bg: "bg-[var(--honey)]",
      p: "text-[var(--ink-soft)]",
    },
    {
      big: "6L",
      small: "+",
      text: "skilled hands — six lakh people employed across the cluster.",
      bg: "bg-[var(--terra)] text-[var(--paper)]",
      p: "text-[var(--paper)]/85",
    },
    {
      big: "10k",
      small: "+",
      text: "knitting, dyeing and garmenting units within a few kilometres of each other — a full supply chain in one postcode.",
      bg: "bg-[var(--sand)]",
      p: "text-[var(--ink-soft)]",
    },
  ];
  return (
    <section id="tiruppur" className="pb-[clamp(64px,10vw,130px)]">
      <div className="max-w-[1240px] mx-auto px-[clamp(18px,4vw,44px)]">
        <Reveal>
          <span className="text-[11.5px] tracking-[.24em] uppercase font-medium text-[var(--terra)]">
            Where we make
          </span>
          <h2 className="bt-serif font-medium text-[clamp(34px,5.4vw,64px)] leading-[1.04] tracking-tight mt-[18px]">
            Tiruppur: the city the world{" "}
            <em className="italic text-[var(--honey-deep)]">
              gets dressed in.
            </em>
          </h2>
          <p className="mt-[18px] text-[clamp(15px,1.6vw,18px)] leading-[1.7] font-light text-[var(--ink-soft)] max-w-[720px]">
            Most people have never heard of it. Almost everyone has worn it.
            Tiruppur is India&apos;s knitwear capital — a dense ecosystem of
            spinners, knitters, dyers and stitchers that global brands have
            trusted for forty years. It is our home ground and our unfair
            advantage.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-[clamp(14px,2vw,24px)] mt-[clamp(30px,5vw,56px)]">
          {stats.map((s) => (
            <Reveal
              key={s.big}
              className={`rounded-[18px] p-[clamp(22px,2.6vw,32px)] min-h-[170px] md:min-h-[220px] flex flex-col ${s.bg}`}
            >
              <div className="bt-serif font-semibold text-[clamp(44px,5.5vw,68px)] tracking-tight">
                {s.big}
                <small className="text-[.5em] font-medium">{s.small}</small>
              </div>
              <p
                className={`mt-auto pt-5 text-[clamp(13px,1.35vw,15px)] leading-[1.55] ${s.p}`}
              >
                {s.text}
              </p>
            </Reveal>
          ))}
          <Reveal className="col-span-2 bg-[var(--sand)] rounded-[18px] relative overflow-hidden p-[clamp(22px,2.6vw,32px)] min-h-[300px] md:min-h-0">
            <svg
              viewBox="0 92 320 112"
              preserveAspectRatio="xMidYMax meet"
              aria-hidden="true"
              className="absolute left-0 right-0 bottom-0 w-full h-[58%]"
            >
              <path
                d="M30,168 C95,120 185,102 288,102"
                fill="none"
                stroke="#b4552d"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeDasharray="6 6"
              />
              <path
                d="M30,168 C110,150 200,140 288,138"
                fill="none"
                stroke="#e0a028"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeDasharray="6 6"
              />
              <path
                d="M30,168 C120,182 210,180 288,174"
                fill="none"
                stroke="#1a1611"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeDasharray="6 6"
              />
              <g transform="translate(292,102)">
                <path d="M0,-4.6 L9.5,0 L0,4.6 z" fill="#b4552d" />
              </g>
              <g transform="translate(292,138) rotate(-1)">
                <path d="M0,-4.6 L9.5,0 L0,4.6 z" fill="#e0a028" />
              </g>
              <g transform="translate(292,174) rotate(-4)">
                <path d="M0,-4.6 L9.5,0 L0,4.6 z" fill="#1a1611" />
              </g>
              <circle cx="30" cy="168" r="5.5" fill="#1a1611" />
              <circle
                cx="30"
                cy="168"
                r="11"
                fill="none"
                stroke="#1a1611"
                strokeWidth="1.3"
                opacity=".35"
              />
              <circle
                cx="30"
                cy="168"
                r="17"
                fill="none"
                stroke="#1a1611"
                strokeWidth="1"
                opacity=".15"
              />
              <text
                x="30"
                y="196"
                textAnchor="middle"
                fontFamily="Space Grotesk"
                fontSize="9.5"
                letterSpacing="2"
                fill="#b4552d"
                fontWeight="600"
              >
                TIRUPPUR
              </text>
            </svg>
            <div className="relative z-[2]">
              <span className="text-[11.5px] tracking-[.24em] uppercase font-medium text-[var(--terra)]">
                Tiruppur → the world
              </span>
              <p className="mt-2.5 text-[clamp(13px,1.35vw,15px)] leading-[1.6] font-light text-[var(--ink-soft)] max-w-[380px]">
                One address, every market. The same lanes that supply global
                retail now carry a name of their own.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ============================== MARK ============================== */

function Mark() {
  return (
    <section className="bg-[var(--ink)] text-[var(--paper)] py-[clamp(64px,10vw,130px)] text-center">
      <div className="max-w-[1240px] mx-auto px-[clamp(18px,4vw,44px)]">
        <Reveal>
          <span className="block text-[11.5px] tracking-[.24em] uppercase font-medium text-[var(--honey)]">
            The name &amp; the mark
          </span>
        </Reveal>
        <Reveal>
          <Image
            src="/img/logo-honey.png"
            alt="beetrends mark — a bee drawn as an infinity loop"
            width={360}
            height={360}
            className="w-[clamp(200px,32vw,360px)] mx-auto mt-[clamp(36px,5vw,64px)]"
          />
        </Reveal>
        <Reveal>
          <h2 className="bt-serif font-normal text-[clamp(22px,3.2vw,38px)] leading-[1.32] mx-auto mt-[clamp(36px,5vw,60px)] max-w-[800px]">
            A bee&apos;s wings drawn as an{" "}
            <em className="italic text-[var(--honey)]">infinity loop.</em> The
            hardest worker in nature, going endlessly to the world.
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[clamp(20px,3vw,44px)] mt-[clamp(40px,6vw,72px)] text-left">
          <Reveal>
            <span className="text-[11.5px] tracking-[.24em] uppercase font-medium text-[var(--honey)]">
              The bee
            </span>
            <p className="mt-3 text-[clamp(14px,1.4vw,16px)] leading-[1.7] font-light text-[var(--paper)]/80">
              Nothing in nature works like a bee: quietly, collectively, season
              after season. That&apos;s Tiruppur. That&apos;s a farm.
              That&apos;s us.
            </p>
          </Reveal>
          <Reveal>
            <span className="text-[11.5px] tracking-[.24em] uppercase font-medium text-[var(--honey)]">
              The infinity
            </span>
            <p className="mt-3 text-[clamp(14px,1.4vw,16px)] leading-[1.7] font-light text-[var(--paper)]/80">
              Trends change without end — and so do we. The loop is a promise to
              keep moving: new drops, new fits, no full stops.
            </p>
          </Reveal>
          <Reveal>
            <span className="text-[11.5px] tracking-[.24em] uppercase font-medium text-[var(--honey)]">
              The name
            </span>
            <p className="mt-3 text-[clamp(14px,1.4vw,16px)] leading-[1.7] font-light text-[var(--paper)]/80">
              <b className="font-medium text-[var(--paper)]">beetrends</b> reads
              two ways: the bee that works, and an instruction —{" "}
              <i>be the trend</i>. We mean both.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ============================== COLLECTIONS ============================== */

type Tile = {
  src: string;
  label: string;
  title: string;
  position?: string;
  span?: "col2" | "mcol2";
};

const TEES_TILES: Tile[] = [
  {
    src: "/img/pexels-ahcapture-29667837.jpg",
    label: "Graphic tee",
    title: "City-proof, commute-proof",
    position: "50% 40%",
    span: "col2",
  },
  {
    src: "/img/pexels-moph-29998735.jpg",
    label: "Heavyweight tee",
    title: "Colour that holds",
  },
  {
    src: "/img/pexels-vlada-karpovich-8939843.jpg",
    label: "Women's relaxed fit",
    title: "Soft structure",
  },
  {
    src: "/img/pexels-prolificpeople-37691112.jpg",
    label: "Classic crew",
    title: "Every generation",
    position: "50% 20%",
    span: "mcol2",
  },
];
const POLOS_TILES: Tile[] = [
  {
    src: "/img/pexels-artempodrez-7648381.jpg",
    label: "Club set",
    title: "Whites & brights",
    position: "50% 18%",
  },
  {
    src: "/img/pexels-bruce-taylor-322737340-17204318.jpg",
    label: "Striped knit polo",
    title: "Street side",
    position: "50% 22%",
  },
  {
    src: "/img/pexels-marceloverfe-12951795.jpg",
    label: "Classic piqué",
    title: "Clubhouse ready",
    position: "50% 12%",
    span: "mcol2",
  },
  {
    src: "/img/pexels-safari-consoler-3290243-20762259.jpg",
    label: "On course",
    title: "Made for the long game",
    position: "50% 35%",
    span: "col2",
  },
];
const HOODIES_TILES: Tile[] = [
  {
    src: "/img/pexels-cottonbro-3888209.jpg",
    label: "Zip fleece",
    title: "The cloud fit",
    position: "50% 14%",
  },
  {
    src: "/img/pexels-mahdi-chaghari-9996334-28484980.jpg",
    label: "Street heavyweight",
    title: "Made for movement",
    position: "50% 16%",
    span: "col2",
  },
  {
    src: "/img/pexels-143963679-10850111.jpg",
    label: "Zip-through",
    title: "Layer one",
    position: "50% 25%",
  },
  {
    src: "/img/pexels-david-lago-rodriguez-84330347-11663397.jpg",
    label: "Tonal fleece",
    title: "Quiet branding",
    position: "50% 30%",
    span: "mcol2",
  },
];
const ATHLEISURE_TILES: Tile[] = [
  {
    src: "/img/pexels-cottonbro-5741290.jpg",
    label: "Retro track sets",
    title: "Play never gets old",
    position: "50% 32%",
    span: "col2",
  },
  {
    src: "/img/pexels-marcelodias-2078048.jpg",
    label: "Street training",
    title: "City circuit",
    position: "50% 30%",
  },
  {
    src: "/img/pexels-mart-production-7318789.jpg",
    label: "Studio set",
    title: "Second-skin soft",
    position: "50% 28%",
  },
  {
    src: "/img/pexels-vlada-karpovich-8939931.jpg",
    label: "Every pace counts",
    title: "Made for all ages",
    position: "50% 22%",
    span: "mcol2",
  },
];

function Collections() {
  return (
    <section id="collections" className="pb-[clamp(64px,10vw,130px)]">
      <div className="max-w-[1240px] mx-auto px-[clamp(18px,4vw,44px)]">
        <Reveal>
          <span className="text-[11.5px] tracking-[.24em] uppercase font-medium text-[var(--terra)]">
            The range
          </span>
          <h2 className="bt-serif font-medium text-[clamp(34px,5.4vw,64px)] leading-[1.04] tracking-tight mt-[18px]">
            Four families.{" "}
            <em className="italic text-[var(--honey-deep)]">Every body.</em>
          </h2>
          <p className="mt-[18px] text-[clamp(15px,1.6vw,18px)] leading-[1.7] font-light text-[var(--ink-soft)] max-w-[720px]">
            Everyday knitwear for men, women and kids — cut for how this
            generation actually dresses: relaxed, layered, worn hard and worn
            often.
          </p>
          <div className="mt-6 flex gap-2.5 flex-wrap">
            {[
              ["#tees", "01 · Tees"],
              ["#polos", "02 · Polos"],
              ["#hoodies", "03 · Hoodies"],
              ["#athleisure", "04 · Athleisure"],
              ["#kids", "+ Kids"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="inline-block border-[1.5px] border-current rounded-full px-3.5 py-1.5 text-[11px] tracking-[.14em] uppercase font-medium transition-colors hover:bg-[var(--ink)] hover:text-[var(--paper)]"
              >
                {label}
              </a>
            ))}
          </div>
        </Reveal>

        <CollectionBlock
          id="tees"
          num="01 —"
          title="Tees"
          bg="/img/pexels-thesayyamhashmi-27896946.jpg"
          bgPosition="50% 28%"
          lede="The garment Tiruppur taught the world to make. Combed cotton, honest weights, cuts from boxy to classic — a tee that still looks like itself after fifty washes."
          chips={[
            "160–240 GSM",
            "100% combed cotton",
            "Bio-washed",
            "Regular · Oversized · Boxy",
          ]}
          tiles={TEES_TILES}
          note={{
            bg: "bg-[var(--ink)] text-[var(--paper)]",
            accent: "text-[var(--honey)]",
            items: [
              ["Fabric", "combed & ring-spun cotton, single jersey"],
              ["Finish", "bio-wash, pre-shrunk, side-seamed"],
              ["Print", "screen, puff & embroidery ready"],
            ],
            quote: "A tee is the brand's handshake.",
          }}
        />

        <CollectionBlock
          id="polos"
          num="02 —"
          title="Polos"
          bg="/img/pexels-cottonbro-5741291.jpg"
          bgPosition="50% 35%"
          lede="Old-money sport, new-money attitude. Piqué and tipped-collar polos that move from the court to the café — the retro-sport revival, made where piqué is a mother tongue."
          chips={[
            "Cotton piqué",
            "Tipped collars",
            "Court-to-street",
            "Men · Women",
          ]}
          tiles={POLOS_TILES}
          note={{
            bg: "bg-[var(--sand)] text-[var(--ink)]",
            accent: "text-[var(--terra)]",
            items: [
              ["Fabric", "cotton piqué & interlock knits"],
              ["Detail", "tipped collars, taped plackets"],
              ["Range", "classic, boxy & women's cropped"],
            ],
            quote: "The collar does the talking.",
          }}
        />

        <CollectionBlock
          id="hoodies"
          num="03 —"
          title="Hoodies"
          bg="/img/pexels-wolrider-27658402.jpg"
          bgPosition="50% 30%"
          lede="The generation's second skin. Brushed fleece and loopback terry in structured oversized fits — heavy enough to feel like armour, soft enough to live in."
          chips={[
            "280–400 GSM fleece",
            "Loopback terry",
            "Oversized & classic",
            "Unisex first",
          ]}
          tiles={HOODIES_TILES}
          note={{
            bg: "bg-[var(--terra)] text-[var(--paper)]",
            accent: "text-[#f5d9a8]",
            items: [
              ["Fabric", "brushed fleece & French terry"],
              ["Detail", "double-layer hoods, kangaroo pockets"],
              ["Fit", "structured oversized, drop shoulder"],
            ],
            quote: "Softness is an engineering problem.",
          }}
        />

        <CollectionBlock
          id="athleisure"
          num="04 —"
          title="Athleisure"
          bg="/img/pexels-chris-wade-ntezicimpa-564856410-32370469.jpg"
          bgPosition="50% 30%"
          lede="Clothes that don't ask what you're doing today. Squat-proof, sweat-wicking, street-legal — one wardrobe for the workout, the work call and everything between."
          chips={[
            "4-way stretch",
            "Moisture-wicking",
            "Co-ord sets",
            "All ages, all paces",
          ]}
          tiles={ATHLEISURE_TILES}
          note={{
            bg: "bg-[var(--ink)] text-[var(--paper)]",
            accent: "text-[var(--honey)]",
            items: [
              ["Fabric", "cotton-lycra & poly-blend knits"],
              ["Detail", "flatlock seams, gusseted cuts"],
              ["Range", "leggings, joggers, bras, co-ords"],
            ],
            quote: "Move first. Everything else follows.",
          }}
        />
      </div>
    </section>
  );
}

function CollectionBlock({
  id,
  num,
  title,
  bg,
  bgPosition = "50% 50%",
  lede,
  chips,
  tiles,
  note,
}: {
  id: string;
  num: string;
  title: string;
  bg: string;
  bgPosition?: string;
  lede: string;
  chips: string[];
  tiles: Tile[];
  note: {
    bg: string;
    accent: string;
    items: [string, string][];
    quote: string;
  };
}) {
  return (
    <div className="mt-[clamp(30px,5vw,56px)]">
      <Reveal
        id={id}
        as="div"
        className="relative rounded-[18px] overflow-hidden min-h-[440px] md:min-h-[72vh] max-h-[680px] flex items-end"
      >
        <div className="absolute inset-0">
          <Image
            src={bg}
            alt={title}
            fill
            className="object-cover"
            style={{ objectPosition: bgPosition }}
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(16,13,9,.3),rgba(16,13,9,0)_38%,rgba(16,13,9,.1)_60%,rgba(16,13,9,.8)_100%)]" />
        <div className="relative z-[2] p-[clamp(22px,3.4vw,48px)] text-[var(--paper)] w-full">
          <div className="bt-serif italic font-medium text-[clamp(16px,1.8vw,22px)] text-[var(--honey)]">
            {num}
          </div>
          <h3 className="bt-serif font-semibold text-[clamp(44px,7vw,88px)] leading-[.98] tracking-tight mt-1.5">
            {title}
          </h3>
          <p className="mt-3.5 text-[clamp(14px,1.5vw,17px)] leading-[1.65] font-light max-w-[560px] text-[var(--paper)]/[.92]">
            {lede}
          </p>
          <div className="mt-4.5 flex gap-2.5 flex-wrap">
            {chips.map((c) => (
              <span
                key={c}
                className="inline-block border-[1.5px] border-[var(--paper)]/60 bg-[var(--ink)]/[.28] rounded-full px-3.5 py-1.5 text-[11px] tracking-[.14em] uppercase font-medium"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[200px] md:auto-rows-[clamp(240px,30vw,380px)] gap-[clamp(14px,2vw,24px)] mt-[clamp(14px,2vw,24px)]">
        {tiles.map((t) => (
          <Reveal
            key={t.src}
            className={`relative rounded-[18px] overflow-hidden bg-[var(--sand)] group ${
              t.span === "col2"
                ? "col-span-2"
                : t.span === "mcol2"
                  ? "col-span-2 md:col-span-1"
                  : ""
            }`}
          >
            <Image
              src={t.src}
              alt={t.label}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.045]"
              style={{ objectPosition: t.position ?? "50% 50%" }}
            />
            <div className="absolute inset-x-0 bottom-0 px-5 pt-[46px] pb-4.5 bg-[linear-gradient(to_top,rgba(16,13,9,.74),rgba(16,13,9,0))] text-[var(--paper)]">
              <span className="text-[10px] text-[var(--honey)]">{t.label}</span>
              <h4 className="bt-serif font-semibold text-[clamp(17px,1.8vw,21px)] mt-1">
                {t.title}
              </h4>
            </div>
          </Reveal>
        ))}

        <Reveal
          className={`col-span-2 rounded-[18px] p-[clamp(22px,2.6vw,32px)] flex flex-col ${note.bg}`}
        >
          <span
            className={`text-[10px] tracking-[.24em] uppercase font-medium ${note.accent}`}
          >
            Build notes
          </span>
          <ul className="mt-3.5">
            {note.items.map(([k, v], i) => (
              <li
                key={k}
                className={`text-[clamp(13px,1.35vw,15px)] leading-[1.55] font-light py-2.5 ${
                  i > 0 ? "border-t border-dashed border-current/25" : ""
                }`}
              >
                <b className="font-semibold">{k}</b> — {v}
              </li>
            ))}
          </ul>
          <div
            className={`bt-serif italic text-[clamp(16px,1.7vw,19px)] leading-[1.45] mt-auto pt-4 ${note.accent}`}
          >
            &quot;{note.quote}&quot;
          </div>
        </Reveal>
      </div>
    </div>
  );
}

/* ============================== KIDS ============================== */

const KIDS_TILES: Tile[] = [
  {
    src: "/img/pexels-149576323-10853954.jpg",
    label: "Baby essentials",
    title: "Softest first",
  },
  {
    src: "/img/pexels-framesbyambro-17901179.jpg",
    label: "Playful prints",
    title: "Wash-day proof",
    position: "50% 30%",
  },
  {
    src: "/img/pexels-demidsega-18631866.jpg",
    label: "Toddler sweats",
    title: "Puddle-ready",
  },
  {
    src: "/img/pexels-jonathanborba-26509781.jpg",
    label: "Snug knits",
    title: "Nap-approved",
  },
  {
    src: "/img/pexels-mirzagraphy-28771910.jpg",
    label: "Junior streetwear",
    title: "Mini, not lesser",
    position: "50% 25%",
    span: "mcol2",
  },
];

function Kids() {
  return (
    <section id="kids" className="pb-[clamp(64px,10vw,130px)]">
      <div className="max-w-[1240px] mx-auto px-[clamp(18px,4vw,44px)]">
        <Reveal>
          <span className="text-[11.5px] tracking-[.24em] uppercase font-medium text-[var(--terra)]">
            The next generation
          </span>
          <h2 className="bt-serif font-medium text-[clamp(34px,5.4vw,64px)] leading-[1.04] tracking-tight mt-[18px]">
            Kids —{" "}
            <em className="italic text-[var(--honey-deep)]">
              the littlest trendsetters.
            </em>
          </h2>
          <p className="mt-[18px] text-[clamp(15px,1.6vw,18px)] leading-[1.7] font-light text-[var(--ink-soft)] max-w-[720px]">
            Designed by a mother of two, tested by two of the toughest critics
            alive. Soft combed cotton, prints that survive the playground, and
            absolutely nothing that itches.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[200px] md:auto-rows-[clamp(240px,30vw,380px)] gap-[clamp(14px,2vw,24px)] mt-[clamp(30px,5vw,56px)]">
          {KIDS_TILES.map((t) => (
            <Reveal
              key={t.src}
              className={`relative rounded-[18px] overflow-hidden bg-[var(--sand)] group ${
                t.span === "mcol2" ? "col-span-2 md:col-span-1" : ""
              }`}
            >
              <Image
                src={t.src}
                alt={t.label}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.045]"
                style={{ objectPosition: t.position ?? "50% 50%" }}
              />
              <div className="absolute inset-x-0 bottom-0 px-5 pt-[46px] pb-4.5 bg-[linear-gradient(to_top,rgba(16,13,9,.74),rgba(16,13,9,0))] text-[var(--paper)]">
                <span className="text-[10px] text-[var(--honey)]">
                  {t.label}
                </span>
                <h4 className="bt-serif font-semibold text-[clamp(17px,1.8vw,21px)] mt-1">
                  {t.title}
                </h4>
              </div>
            </Reveal>
          ))}
          <Reveal className="col-span-2 bg-[var(--honey)] rounded-[18px] p-[clamp(22px,2.6vw,32px)] flex flex-col">
            <span className="text-[10px] tracking-[.24em] uppercase font-medium">
              Build notes
            </span>
            <ul className="mt-3.5">
              {[
                ["Fabric", "combed cotton, gentle on skin"],
                ["Detail", "nickel-free snaps, flat seams"],
                ["Sizes", "newborn to twelve years"],
              ].map(([k, v], i) => (
                <li
                  key={k}
                  className={`text-[clamp(13px,1.35vw,15px)] leading-[1.55] font-light py-2.5 ${i > 0 ? "border-t border-dashed border-black/25" : ""}`}
                >
                  <b className="font-semibold">{k}</b> — {v}
                </li>
              ))}
            </ul>
            <div className="bt-serif italic text-[clamp(16px,1.7vw,19px)] leading-[1.45] mt-auto pt-4">
              &quot;Approved by two kids under seven.&quot;
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ============================== PEOPLE / CONTACT ============================== */

function People() {
  return (
    <section id="people" className="pb-[clamp(64px,10vw,130px)]">
      <div className="max-w-[1240px] mx-auto px-[clamp(18px,4vw,44px)]">
        <Reveal>
          <span className="text-[11.5px] tracking-[.24em] uppercase font-medium text-[var(--terra)]">
            The people &amp; the invitation
          </span>
          <h2 className="bt-serif font-medium text-[clamp(34px,5.4vw,64px)] leading-[1.04] tracking-tight mt-[18px]">
            Small team.{" "}
            <em className="italic text-[var(--honey-deep)]">Deep roots.</em>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(14px,2vw,24px)] mt-[clamp(30px,5vw,56px)]">
          <PersonCard
            img="/img/founder-ramadevi.jpg"
            name="Ramadevi S."
            role="Co-founder — Brand & Product"
            bio="Farmer's daughter from Kurukkalpatti, mother of two. The ambition the brand is built on."
            email="sramadevi0209@gmail.com"
          />
          <PersonCard
            img="/img/founder-yashwanth.jpg"
            name="Yashwanth J."
            role="Co-founder — Operations & Sourcing"
            bio="Engineer and farmer's son, rooted in the Tiruppur cluster. Keeps every promise on schedule."
            email="yashwanthj3010@gmail.com"
          />

          <Reveal className="md:col-span-2 bg-[var(--ink)] text-[var(--paper)] rounded-[18px] p-[clamp(22px,2.6vw,32px)] flex gap-[clamp(18px,3vw,44px)] items-center flex-wrap">
            <div>
              <h3 className="bt-serif font-semibold text-[clamp(19px,2vw,23px)]">
                Muhendran
              </h3>
              <div className="text-[10px] tracking-[.18em] uppercase font-medium mt-1.5 text-[var(--honey)]">
                Strategic Partner — Growth &amp; Alliances
              </div>
              <p className="text-[clamp(13px,1.35vw,14.5px)] leading-[1.6] font-light mt-2.5 max-w-[640px] text-[var(--paper)]/[.78]">
                Engineer by training, connector by instinct. Muhendran works
                alongside the founders on strategy, partnerships and taking
                beetrends to new markets.
              </p>
            </div>
            <a
              href="mailto:muhendran.work@gmail.com"
              className="text-[13px] font-medium md:ml-auto hover:text-[var(--honey)]"
            >
              muhendran.work@gmail.com
            </a>
          </Reveal>
        </div>

        <Reveal className="mt-[clamp(14px,2vw,24px)] bg-[var(--honey)] rounded-[18px] p-[clamp(30px,5vw,60px)]">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.1fr] gap-[clamp(28px,4vw,56px)] items-start">
            <div>
              <h3 className="bt-serif font-semibold text-[clamp(28px,4vw,48px)] leading-[1.12] max-w-[700px]">
                Let&apos;s build the next chapter together.
              </h3>
              <p className="text-[clamp(14px,1.5vw,17px)] leading-[1.65] mt-4 max-w-[640px] text-[var(--ink-soft)]">
                We&apos;re looking for retail partners, distributors and
                collaborators who believe great knitwear can come straight from
                the source. Private-label conversations welcome; our own label
                preferred.
              </p>
              <p className="text-[clamp(14px,1.5vw,17px)] leading-[1.65] mt-4 max-w-[640px] text-[var(--ink-soft)]">
                Tell us who you are and what you have in mind — we read every
                enquiry.
              </p>
              <div className="flex gap-3 mt-6.5 flex-wrap">
                <a
                  href="mailto:sezhungol@gmail.com"
                  className="inline-block border-[1.5px] border-[var(--ink)] rounded-full px-4 py-2 text-[clamp(12px,1.2vw,14px)] font-semibold transition-colors hover:bg-[var(--ink)] hover:text-[var(--honey)]"
                >
                  Prefer email? sezhungol@gmail.com
                </a>
                <span className="inline-block border-[1.5px] border-[var(--ink)] rounded-full px-4 py-2 text-[clamp(12px,1.2vw,14px)] font-semibold">
                  Tiruppur, Tamil Nadu, India
                </span>
              </div>
            </div>
            <EnquiryForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PersonCard({
  img,
  name,
  role,
  bio,
  email,
}: {
  img: string;
  name: string;
  role: string;
  bio: string;
  email: string;
}) {
  return (
    <Reveal className="bg-[var(--sand)] rounded-[18px] overflow-hidden flex">
      <div className="relative w-[120px] md:w-[170px] flex-none">
        <Image
          src={img}
          alt={name}
          fill
          className="object-cover object-[50%_12%]"
        />
      </div>
      <div className="p-[clamp(18px,2.2vw,26px)] flex flex-col">
        <h3 className="bt-serif font-semibold text-[clamp(19px,2vw,23px)]">
          {name}
        </h3>
        <div className="text-[10px] tracking-[.18em] uppercase font-medium mt-1.5 text-[var(--terra)]">
          {role}
        </div>
        <p className="text-[clamp(13px,1.35vw,14.5px)] leading-[1.6] font-light text-[var(--ink-soft)] mt-2.5">
          {bio}
        </p>
        <div className="mt-auto pt-3.5 text-[13px] font-medium break-all">
          <a href={`mailto:${email}`} className="hover:text-[var(--terra)]">
            {email}
          </a>
        </div>
      </div>
    </Reveal>
  );
}

/* ------------------------------ Enquiry form ------------------------------ */

type FormStatus = "idle" | "sending" | "success" | "error";

function EnquiryForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = formRef.current;
    if (!form || !form.reportValidity()) return;

    setStatus("sending");
    const formData = new FormData(form);
    const name = formData.get("name");
    formData.set("subject", `New enquiry from ${name} — beetrends website`);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      const data = await res.json();
      if (!res.ok || !data.success)
        throw new Error(data.message || "send failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border-2 border-dashed border-[var(--ink)] rounded-[18px] p-[clamp(24px,3vw,40px)] text-center">
        <h4 className="bt-serif font-semibold text-[clamp(20px,2.4vw,28px)]">
          Thank you — your enquiry is on its way. 🐝
        </h4>
        <p className="mt-2.5 text-[14.5px] leading-[1.6] text-[var(--ink-soft)]">
          We read every message and reply within a day or two.
          <br />
          In a hurry? Write to <b>sezhungol@gmail.com</b>.
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate>
      <input
        type="hidden"
        name="access_key"
        value="a46cf2d9-82a8-465a-9267-08b5cd19b33c"
      />
      <input type="hidden" name="from_name" value="beetrends website" />
      <input
        type="hidden"
        name="subject"
        value="New enquiry — beetrends website"
      />
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <Field label="Name">
          <input
            id="enqName"
            name="name"
            type="text"
            required
            autoComplete="name"
            maxLength={120}
            className={inputClass}
          />
        </Field>
        <Field label="Email">
          <input
            id="enqEmail"
            name="email"
            type="email"
            required
            autoComplete="email"
            maxLength={200}
            className={inputClass}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-3.5">
        <Field label="Company / City" hint="— optional">
          <input
            id="enqCompany"
            name="company"
            type="text"
            maxLength={160}
            className={inputClass}
          />
        </Field>
        <Field label="I'm interested in">
          <select
            id="enqInterest"
            name="interest"
            className={`${inputClass} appearance-none bg-no-repeat pr-[38px]`}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' fill='none' stroke='%231a1611' stroke-width='2'/%3E%3C/svg%3E\")",
              backgroundPosition: "right 14px center",
            }}
          >
            {[
              "Retail partnership",
              "Distribution",
              "Tees",
              "Polos",
              "Hoodies",
              "Athleisure",
              "Kids",
              "Other",
            ].map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-3.5">
        <Field label="Message">
          <textarea
            id="enqMessage"
            name="message"
            required
            maxLength={3000}
            placeholder="A line or two about you and what you're looking for…"
            className={`${inputClass} min-h-[110px] resize-y`}
          />
        </Field>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full border-none rounded-full px-7 py-[15px] bg-[var(--ink)] text-[var(--honey)] text-[12.5px] tracking-[.16em] uppercase font-semibold transition-colors hover:bg-[var(--ink-soft)] disabled:opacity-60 disabled:cursor-wait"
      >
        {status === "sending" ? "Sending…" : "Send enquiry"}
      </button>

      {status === "error" && (
        <div className="mt-3 text-[13.5px] leading-[1.55] px-3.5 py-3 rounded-xl bg-[var(--terra)]/[.14] border-[1.5px] border-dashed border-[var(--terra)]">
          Something went wrong and your enquiry was not sent. Please try again,
          or email us directly at{" "}
          <a
            href="mailto:sezhungol@gmail.com"
            className="font-semibold underline"
          >
            sezhungol@gmail.com
          </a>
          .
        </div>
      )}
    </form>
  );
}

const inputClass =
  "w-full border-[1.5px] border-[var(--ink)]/35 rounded-xl bg-[var(--paper)] text-[var(--ink)] px-3.5 py-3 text-[15px] font-normal transition-colors focus:outline-none focus:border-[var(--ink)] focus:ring-[3px] focus:ring-[var(--ink)]/[.14]";

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="mb-3.5">
      <label className="block text-[10px] tracking-[.2em] uppercase font-semibold text-[var(--ink)] mb-1.5">
        {label}{" "}
        {hint && (
          <small className="normal-case tracking-normal font-normal text-[var(--ink-soft)]">
            {hint}
          </small>
        )}
      </label>
      {children}
    </div>
  );
}

/* ============================== FOOTER ============================== */

function Footer() {
  return (
    <footer className="bg-[var(--ink)] text-[var(--paper)] pt-[clamp(56px,8vw,96px)] pb-[34px]">
      <div className="max-w-[1240px] mx-auto px-[clamp(18px,4vw,44px)] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[clamp(28px,4vw,60px)]">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/img/logo-white.png"
              alt="beetrends mark"
              width={26}
              height={26}
              className="h-[26px] w-auto"
            />
            <span className="bt-serif font-semibold text-[26px]">
              bee<b className="text-[var(--honey)]">trends</b>
            </span>
          </div>
          <div className="bt-serif italic text-[16px] text-[var(--honey)] mt-4">
            Woven in Tiruppur. Worn by the world.
          </div>
          <p className="mt-3.5 text-[13.5px] leading-[1.7] font-light text-[var(--paper)]/[.65] max-w-[300px]">
            Everyday knitwear for men, women and kids — designed and made in
            India&apos;s knitwear capital by two children of farming families.
          </p>
        </div>

        <FootCol
          title="Explore"
          links={[
            ["#top", "Home"],
            ["#story", "Our story"],
            ["#tiruppur", "Why Tiruppur"],
            ["#people", "Contact us"],
          ]}
        />
        <FootCol
          title="Collections"
          links={[
            ["#tees", "Tees"],
            ["#polos", "Polos"],
            ["#hoodies", "Hoodies"],
            ["#athleisure", "Athleisure"],
            ["#kids", "Kids"],
          ]}
        />

        <div>
          <h5 className="text-[10.5px] tracking-[.22em] uppercase text-[var(--honey)] font-medium mb-4">
            Get in touch
          </h5>
          <ul>
            <FootContact
              sub="Partnerships"
              href="mailto:sezhungol@gmail.com"
              label="sezhungol@gmail.com"
            />
            <FootContact
              sub="Ramadevi — Co-founder"
              href="mailto:sramadevi0209@gmail.com"
              label="sramadevi0209@gmail.com"
            />
            <FootContact
              sub="Yashwanth — Co-founder"
              href="mailto:yashwanthj3010@gmail.com"
              label="yashwanthj3010@gmail.com"
            />
            <li>
              <span className="block text-[10px] tracking-[.14em] uppercase text-[var(--paper)]/45 mb-0.5">
                Location
              </span>
              <span className="text-[14px] font-light text-[var(--paper)]/80">
                Tiruppur, Tamil Nadu, India
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-[clamp(18px,4vw,44px)] mt-[clamp(40px,6vw,64px)] border-t border-[var(--paper)]/[.14] pt-[22px] pr-[70px] flex justify-between gap-3 flex-wrap text-[10.5px] tracking-[.18em] uppercase text-[var(--paper)]/45">
        <span>© {new Date().getFullYear()} beetrends</span>
        <span>Be the trend.</span>
      </div>
    </footer>
  );
}

function FootCol({
  title,
  links,
}: {
  title: string;
  links: [string, string][];
}) {
  return (
    <div>
      <h5 className="text-[10.5px] tracking-[.22em] uppercase text-[var(--honey)] font-medium mb-4">
        {title}
      </h5>
      <ul>
        {links.map(([href, label]) => (
          <li key={href} className="mb-2.5">
            <a
              href={href}
              className="text-[14px] font-light text-[var(--paper)]/80 transition-colors hover:text-[var(--honey)]"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FootContact({
  sub,
  href,
  label,
}: {
  sub: string;
  href: string;
  label: string;
}) {
  return (
    <li className="mb-2.5">
      <span className="block text-[10px] tracking-[.14em] uppercase text-[var(--paper)]/45 mb-0.5">
        {sub}
      </span>
      <a
        href={href}
        className="text-[14px] font-light text-[var(--paper)]/80 transition-colors hover:text-[var(--honey)]"
      >
        {label}
      </a>
    </li>
  );
}

/* ============================== BACK TO TOP ============================== */

function BackToTop({ show }: { show: boolean }) {
  return (
    <button
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed right-[22px] bottom-[22px] z-[90] w-[46px] h-[46px] rounded-full border-none bg-[var(--ink)] text-[var(--paper)] text-[17px] cursor-pointer shadow-[0_6px_18px_rgba(26,22,17,.28)] transition-all hover:bg-[var(--terra)] ${
        show
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      ↑
    </button>
  );
}
