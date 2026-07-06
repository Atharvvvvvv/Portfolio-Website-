"use client";

import { useReducedMotion, motion, type Variants } from "framer-motion";
import {
  type LucideIcon,
  Code2,
  Globe,
  Server,
  Brain,
  Database,
  Wrench,
} from "lucide-react";
import { portfolio } from "@/data/portfolio";

// ─── Animation Constants ──────────────────────────────────────────────────────
// Identical to HeroSection and AboutSection — same easing for visual cohesion.

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

function makeContainer(stagger = 0.1, delay = 0): Variants {
  return {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE_OUT_EXPO },
  },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 16 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
  },
};

// animate once, trigger slightly before element fully enters viewport
const VIEWPORT = { once: true, margin: "-80px" };

// ─── Icon Map ─────────────────────────────────────────────────────────────────
// Maps the string literal keys stored in portfolio.ts to actual Lucide components.
// Avoids storing React components in a plain data file.

const ICON_MAP: Record<
  (typeof portfolio.skills.categories)[number]["icon"],
  LucideIcon
> = {
  Code2,
  Globe,
  Server,
  Brain,
  Database,
  Wrench,
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans text-sm font-semibold uppercase tracking-[0.28em] text-accent">
      {children}
    </p>
  );
}

function SkillBadge({ name }: { name: string }) {
  return (
    // Reuses the .about-tech-badge class — same pill shape, same hover
    <motion.li variants={fadeIn} className="list-none">
      <span className="about-tech-badge">{name}</span>
    </motion.li>
  );
}

function CategoryCard({
  label,
  iconKey,
  items,
  motionProps,
}: {
  label: string;
  iconKey: (typeof portfolio.skills.categories)[number]["icon"];
  items: string[];
  motionProps: Record<string, unknown>;
}) {
  const Icon = ICON_MAP[iconKey];

  return (
    // Reuses .about-stat-card — same border/surface/hover-lift treatment
    <motion.div variants={scaleUp} className="about-stat-card gap-0">
      {/* Card header */}
      <div className="mb-4 flex items-center gap-2.5">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10">
          <Icon size={15} className="text-accent" aria-hidden="true" />
        </span>
        <h3 className="font-sans text-sm font-semibold text-foreground">
          {label}
        </h3>
      </div>

      {/* Skill badges */}
      <motion.ul
        {...motionProps}
        variants={makeContainer(0.04, 0.05)}
        className="flex flex-wrap gap-2"
        aria-label={`${label} skills`}
      >
        {items.map((name) => (
          <SkillBadge key={name} name={name} />
        ))}
      </motion.ul>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SkillsSection() {
  const { skills } = portfolio;
  const prefersReduced = useReducedMotion();

  // When the OS has reduced motion enabled, skip all entrance animations by
  // jumping directly to the visible "show" state.
  const motionProps = prefersReduced
    ? ({
        initial: "show" as const,
        animate: "show" as const,
      } as Record<string, unknown>)
    : ({
        initial: "hidden" as const,
        whileInView: "show" as const,
        viewport: VIEWPORT,
      } as Record<string, unknown>);

  return (
    <section id="skills" className="relative py-28 lg:py-36">
      {/* Hairline section divider — same as About */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-border to-transparent"
      />

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        {/* ── Section header ──────────────────────────────────────────────── */}
        <motion.div
          {...motionProps}
          variants={makeContainer(0.12)}
          className="mb-16 max-w-2xl"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>{skills.eyebrow}</SectionLabel>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-4 font-serif text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[1.05] tracking-tight text-foreground"
          >
            {skills.heading.split("\n").map((line, i) => (
              <span key={i} className={i > 0 ? "block text-accent" : "block"}>
                {line}
              </span>
            ))}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-5 font-sans text-base leading-relaxed text-muted"
          >
            {skills.intro}
          </motion.p>
        </motion.div>

        {/* ── Category grid ────────────────────────────────────────────────── */}
        <motion.div
          {...motionProps}
          variants={makeContainer(0.09, 0.05)}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {skills.categories.map((cat) => (
            <CategoryCard
              key={cat.key}
              label={cat.label}
              iconKey={cat.icon}
              items={cat.items}
              motionProps={motionProps}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
