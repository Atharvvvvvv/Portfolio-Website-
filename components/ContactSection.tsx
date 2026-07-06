"use client";

import { useReducedMotion, motion, type Variants } from "framer-motion";
import { Mail } from "lucide-react";
import { portfolio } from "@/data/portfolio";

// ─── Animation constants ──────────────────────────────────────────────────────
// Identical to every other section — same easing, same variants.

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

// Trigger once; starts slightly before the element is fully in view.
const VIEWPORT = { once: true, margin: "-80px" };

// ─── Component ────────────────────────────────────────────────────────────────

export default function ContactSection() {
  const { contact, social } = portfolio;
  const prefersReduced = useReducedMotion();

  // Skip entrance animations when the OS reduced-motion preference is set.
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
    <section id="contact" className="relative py-28 lg:py-36">
      {/* Hairline section divider — same as every preceding section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-border to-transparent"
      />

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        {/* Centered content column */}
        <motion.div
          {...motionProps}
          variants={makeContainer(0.14)}
          className="mx-auto max-w-2xl text-center"
        >
          {/* Eyebrow */}
          <motion.p
            variants={fadeUp}
            className="font-sans text-sm font-semibold uppercase tracking-[0.28em] text-accent"
          >
            {contact.eyebrow}
          </motion.p>

          {/* Section heading */}
          <motion.h2
            variants={fadeUp}
            className="mt-4 font-serif text-[clamp(3rem,8vw,5.5rem)] font-semibold leading-[1.0] tracking-tight text-foreground"
          >
            {contact.heading}
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-md font-sans text-base leading-relaxed text-muted"
          >
            {contact.intro}
          </motion.p>

          {/* Email CTA — opens the system mail client, no backend involved */}
          <motion.div variants={fadeUp} className="mt-10">
            <a
              href={`mailto:${social.email}`}
              className="hero-btn-primary inline-flex items-center gap-2"
              aria-label={`Send an email to ${social.email}`}
            >
              <Mail size={16} aria-hidden="true" />
              {contact.buttonText}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
