"use client";

import { useState } from "react";
import Image from "next/image";
import { useReducedMotion, motion, AnimatePresence, type Variants } from "framer-motion";
import { ExternalLink, CalendarDays, ShieldCheck, LayoutGrid, Award, Code2 } from "lucide-react";
import { portfolio } from "@/data/portfolio";

// ─── Animation constants ──────────────────────────────────────────────────────
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

const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 16 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
  },
};

const VIEWPORT = { once: true, margin: "-80px" };

// ─── Types ────────────────────────────────────────────────────────────────────
type ShowcaseItem = (typeof portfolio.showcase.items)[number];
type FilterType = "all" | "project" | "certificate";

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans text-sm font-semibold uppercase tracking-[0.28em] text-accent">
      {children}
    </p>
  );
}

function ShowcaseCard({ item }: { item: ShowcaseItem }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
      className={`about-stat-card group relative flex flex-col overflow-hidden p-0 gap-0 border border-border bg-surface transition-all duration-300 hover:-translate-y-1 ${
        item.type === "project" 
          ? "hover:border-accent/40 hover:shadow-[0_8px_30px_color-mix(in_oklch,var(--accent)_15%,transparent)]" 
          : "hover:border-emerald-500/40 hover:shadow-[0_8px_30px_rgba(16,185,129,0.15)]"
      }`}
    >
      {/* Image Container with Zoom effect */}
      <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-border">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        {/* Type Badge */}
        <div className={`absolute top-4 left-4 flex items-center gap-1.5 rounded-full px-2.5 py-1 backdrop-blur-md border ${
          item.type === "project" 
            ? "bg-accent/10 border-accent/20 text-accent" 
            : "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
        }`}>
          {item.type === "project" ? (
            <Code2 size={12} className="text-accent" />
          ) : (
            <Award size={12} className="text-emerald-500" />
          )}
          <span className="text-[10px] font-medium uppercase tracking-wider">
            {item.type}
          </span>
        </div>
      </div>

      {/* Clickable overlay for the entire card */}
      {(item.demo || item.github || item.certificate) && (
        <a 
          href={item.demo || item.github || item.certificate} 
          target="_blank" 
          rel="noopener noreferrer"
          className="absolute inset-0 z-0"
          aria-label={`View ${item.title}`}
        />
      )}

      {/* Content */}
      <div className="flex flex-1 flex-col p-5 sm:p-6 pointer-events-none">
        <div className="mb-4">
          <h3 className="font-sans text-lg font-semibold leading-tight text-foreground group-hover:text-accent transition-colors">
            {item.title}
          </h3>
          
          {item.type === "certificate" && item.issuer && (
            <p className="mt-1 font-sans text-sm text-muted">
              {item.issuer}
            </p>
          )}

          {item.type === "project" && item.description && (
            <p className="mt-2 font-sans text-sm leading-relaxed text-muted line-clamp-2">
              {item.description}
            </p>
          )}
        </div>

        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className="mb-5 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-md bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent ring-1 ring-inset ring-accent/20"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Metadata & Actions */}
        <div className="mt-auto flex flex-wrap items-center gap-4 pt-4 border-t border-border/50 relative z-10 pointer-events-auto">
          {item.date && (
            <span className="flex items-center gap-1.5 font-sans text-xs text-muted">
              <CalendarDays size={14} className="text-accent/70" />
              {item.date}
            </span>
          )}

          <div className="ml-auto flex items-center gap-3">
            {item.github && (
              <a
                href={item.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-foreground transition-colors"
                aria-label={`View GitHub repository for ${item.title}`}
              >
                <Code2 size={18} />
              </a>
            )}
            {item.demo && (
              <a
                href={item.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-foreground transition-colors"
                aria-label={`View live demo of ${item.title}`}
              >
                <ExternalLink size={18} />
              </a>
            )}
            {item.certificate && (
              <a
                href={item.certificate}
                target="_blank"
                rel="noopener noreferrer"
                className="cert-verify-btn group !px-3 !py-1.5"
                aria-label={`Verify credential: ${item.title}`}
              >
                <ShieldCheck size={14} aria-hidden="true" />
                <span>Verify</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function EmptyState() {
  return (
    <motion.div variants={fadeUp} className="col-span-full cert-empty-state">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
        <LayoutGrid size={22} className="text-accent" />
      </div>
      <p className="mt-4 font-sans text-sm font-semibold text-foreground">
        Nothing to show here yet
      </p>
      <p className="mt-1 font-sans text-xs leading-relaxed text-muted">
        Check back later for new projects and certifications.
      </p>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ShowcaseSection() {
  const { showcase } = portfolio;
  const prefersReduced = useReducedMotion();
  const [filter, setFilter] = useState<FilterType>("all");

  const motionProps = prefersReduced
    ? ({
        initial: "show",
        animate: "show",
      } as Record<string, unknown>)
    : ({
        initial: "hidden",
        whileInView: "show",
        viewport: VIEWPORT,
      } as Record<string, unknown>);

  const filters: { label: string; value: FilterType }[] = [
    { label: "All Work", value: "all" },
    { label: "Projects", value: "project" },
    { label: "Certifications", value: "certificate" },
  ];

  const filteredItems = showcase.items.filter(
    (item) => filter === "all" || item.type === filter
  );

  return (
    <section id="showcase" className="relative py-28 lg:py-36">
      {/* Hairline section divider */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-border to-transparent"
      />

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        {/* ── Section header ──────────────────────────────────────────────── */}
        <motion.div
          {...motionProps}
          variants={makeContainer(0.12)}
          className="mb-12 max-w-2xl"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>{showcase.eyebrow}</SectionLabel>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-4 font-serif text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[1.05] tracking-tight text-foreground"
          >
            {showcase.heading.split("\n").map((line, i) => (
              <span key={i} className={i > 0 ? "block text-accent" : "block"}>
                {line}
              </span>
            ))}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-5 font-sans text-base leading-relaxed text-muted"
          >
            {showcase.intro}
          </motion.p>
        </motion.div>

        {/* ── Filters ────────────────────────────────────────────────────── */}
        <motion.div 
          {...motionProps}
          variants={fadeUp}
          className="mb-12 flex flex-wrap gap-2"
        >
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`relative rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                filter === f.value ? "text-background" : "text-muted hover:text-foreground"
              }`}
            >
              {filter === f.value && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute inset-0 rounded-full bg-accent"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{f.label}</span>
            </button>
          ))}
        </motion.div>

        {/* ── Grid ───────────────────────────────────────────────────────── */}
        <motion.div
          layout
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <ShowcaseCard key={item.id} item={item} />
              ))
            ) : (
              <EmptyState />
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
