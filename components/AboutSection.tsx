"use client";

import { useReducedMotion, motion, type Variants } from "framer-motion";
import {
  type LucideIcon,
  GraduationCap,
  Briefcase,
  Download,
  CheckCircle,
} from "lucide-react";
import { portfolio } from "@/data/portfolio";

// ─── Animation Constants ──────────────────────────────────────────────────────
// Shared with HeroSection — same cubic-bezier for visual consistency.

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

// Staggered container — used for the whole section and for sub-lists.
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
    transition: { duration: 0.55, ease: "easeOut" as const },
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

// ─── Shared viewport config ───────────────────────────────────────────────────
// once: true — animate only on first appearance, never replay on scroll-back.
const VIEWPORT = { once: true, margin: "-80px" };

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans text-sm font-semibold uppercase tracking-[0.28em] text-accent">
      {children}
    </p>
  );
}

function MetaRow({
  icon: Icon,
  children,
}: {
  icon: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 text-sm text-muted">
      <Icon
        size={15}
        className="mt-0.5 shrink-0 text-accent"
        aria-hidden="true"
      />
      <span>{children}</span>
    </div>
  );
}

function StatCard({
  value,
  label,
  description,
}: {
  value: string;
  label: string;
  description: string;
}) {
  return (
    <motion.div
      variants={scaleUp}
      className="about-stat-card"
    >
      <span className="font-serif text-[2.25rem] font-semibold leading-none text-accent">
        {value}
      </span>
      <span className="mt-1 font-sans text-sm font-500 text-foreground">
        {label}
      </span>
      <span className="font-sans text-xs text-muted">{description}</span>
    </motion.div>
  );
}

function TechBadge({ label }: { label: string }) {
  return (
    <motion.span variants={fadeIn} className="about-tech-badge">
      {label}
    </motion.span>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AboutSection() {
  const { about } = portfolio;
  const prefersReduced = useReducedMotion();

  // When the user prefers reduced motion, bypass stagger/slide animations
  // by jumping directly to the "show" state.
  const motionProps = prefersReduced
    ? { initial: "show", animate: "show", whileInView: undefined, viewport: undefined }
    : { initial: "hidden", whileInView: "show", viewport: VIEWPORT };

  return (
    <section id="about" className="relative py-28 lg:py-36">
      {/* Subtle section divider orb */}
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
            <SectionLabel>{about.eyebrow}</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="mt-4 font-serif text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[1.05] tracking-tight text-foreground"
          >
            {about.heading.split("\n").map((line, i) => (
              <span key={i} className={i > 0 ? "block text-accent" : "block"}>
                {line}
              </span>
            ))}
          </motion.h2>
        </motion.div>

        {/* ── Two-column layout ────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
          {/* ─── Left column ──────────────────────────────────────────────── */}
          <motion.div
            {...motionProps}
            variants={makeContainer(0.1, 0.05)}
            className="flex flex-col gap-10"
          >
            {/* Profile image placeholder */}
            <motion.div variants={fadeUp}>
              <div
                className="about-avatar"
                role="img"
                aria-label="Profile photo placeholder — replace with actual photo"
              >
                {/* Initials fallback */}
                <span
                  className="font-serif text-5xl font-semibold text-accent select-none"
                  aria-hidden="true"
                >
                  {portfolio.nameShort.charAt(0)}
                </span>
                {/* Decorative corner accent */}
                <div
                  className="absolute -bottom-3 -right-3 h-16 w-16 rounded-full border-2 border-accent/30 bg-accent/5"
                  aria-hidden="true"
                />
              </div>
            </motion.div>

            {/* Meta info */}
            <motion.div variants={fadeUp} className="flex flex-col gap-3">
              <MetaRow icon={Briefcase}>
                {about.currentRole} &mdash;{" "}
                <span className="text-accent font-medium">
                  {about.availability}
                </span>
              </MetaRow>
              <MetaRow icon={GraduationCap}>
                {about.education.degree}
                <br />
                <span className="text-foreground/80">
                  {about.education.institution}
                </span>{" "}
                &middot; {about.education.year}
              </MetaRow>
            </motion.div>

            {/* Stats grid */}
            <motion.div
              {...motionProps}
              variants={makeContainer(0.08, 0.1)}
              className="grid grid-cols-2 gap-3"
              aria-label="Statistics"
            >
              {about.stats.map((stat) => (
                <StatCard key={stat.label} {...stat} />
              ))}
            </motion.div>
          </motion.div>

          {/* ─── Right column ─────────────────────────────────────────────── */}
          <motion.div
            {...motionProps}
            variants={makeContainer(0.1, 0.1)}
            className="flex flex-col gap-8"
          >
            {/* Introduction */}
            <motion.p
              variants={fadeUp}
              className="font-sans text-xl font-light leading-relaxed text-foreground"
            >
              {about.intro}
            </motion.p>

            {/* Extended bio */}
            <motion.p
              variants={fadeUp}
              className="font-sans text-base leading-[1.85] text-muted"
            >
              {about.bio}
            </motion.p>

            {/* Tech stack */}
            <motion.div variants={fadeUp}>
              <h3 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.22em] text-muted">
                Technologies I work with
              </h3>
              <motion.ul
                {...motionProps}
                variants={makeContainer(0.04, 0.05)}
                className="flex flex-wrap gap-2"
                aria-label="Technology stack"
              >
                {about.techStack.map((tech) => (
                  <li key={tech}>
                    <TechBadge label={tech} />
                  </li>
                ))}
              </motion.ul>
            </motion.div>

            {/* Availability callout */}
            <motion.div
              variants={fadeUp}
              className="about-availability-card"
            >
              <CheckCircle
                size={16}
                className="shrink-0 text-accent"
                aria-hidden="true"
              />
              <p className="font-sans text-sm text-muted">
                Currently{" "}
                <span className="font-medium text-foreground">
                  {about.availability.toLowerCase()}
                </span>{" "}
                — feel free to reach out for full-time roles, freelance
                projects, or collaborations.
              </p>
            </motion.div>

            {/* Resume CTA */}
            <motion.div variants={fadeUp}>
              <a
                href={portfolio.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-btn-ghost group inline-flex"
                aria-label="Open resume PDF in new tab"
              >
                <Download size={15} aria-hidden="true" />
                {about.resumeButtonText}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
