"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { Globe, ExternalLink, X, ArrowDown, Mail, Download } from "lucide-react";
import { portfolio } from "@/data/portfolio";

// ─── Animation Variants ──────────────────────────────────────────────────────

// Bezier curve typed as a const tuple so Framer Motion's strict Variants type accepts it
const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
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
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

// ─── Social Links ─────────────────────────────────────────────────────────────

const socialLinks = [
  {
    label: "GitHub",
    href: portfolio.social.github,
    icon: Globe,
  },
  {
    label: "LinkedIn",
    href: portfolio.social.linkedin,
    icon: ExternalLink,
  },
  {
    label: "Twitter / X",
    href: portfolio.social.twitter,
    icon: X,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden"
    >
      {/* Background orbs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-[image:var(--grid-pattern)] opacity-[0.025] dark:opacity-[0.05]" />
      </div>

      {/* Content */}
      <div className="relative mx-auto w-full max-w-7xl px-6 pb-16 pt-8 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-4xl"
        >
          {/* Eyebrow */}
          <motion.p
            variants={fadeUp}
            className="font-sans text-sm font-semibold uppercase tracking-[0.28em] text-accent"
          >
            Software Engineer &nbsp;·&nbsp; AI &amp; ML Undergraduate
          </motion.p>

          {/* Name */}
          <motion.h1
            variants={fadeUp}
            className="mt-5 font-serif text-[clamp(3rem,8vw,6.5rem)] font-semibold leading-[0.9] tracking-tight text-foreground"
          >
            {portfolio.name.split(" ").slice(0, 2).join(" ")}
            <br />
            <span className="text-accent">
              {portfolio.name.split(" ").slice(2).join(" ")}
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-xl font-sans text-xl font-light leading-relaxed text-muted"
          >
            {portfolio.bio}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              href="#contact"
              className="hero-btn-primary group"
              aria-label="Go to contact section"
            >
              <Mail
                size={16}
                aria-hidden="true"
              />
              Contact Me
            </Link>

            <a
              href={portfolio.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-btn-ghost group"
              aria-label="Open resume PDF in new tab"
            >
              <Download size={16} aria-hidden="true" />
              Download Resume
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            variants={fadeIn}
            className="mt-12 flex items-center gap-1"
          >
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="social-icon-btn group"
              >
                <Icon
                  size={18}
                  className="transition-colors duration-200 text-muted group-hover:text-foreground"
                  aria-hidden="true"
                />
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1 text-muted/50"
        >
          <span className="font-sans text-[10px] uppercase tracking-[0.2em]">
            Scroll
          </span>
          <ArrowDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  );
}
