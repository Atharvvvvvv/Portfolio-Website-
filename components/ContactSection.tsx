"use client";

import { useReducedMotion, motion, type Variants } from "framer-motion";
import { portfolio } from "@/data/portfolio";
import ContactForm from "./ContactForm";

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

const VIEWPORT = { once: true, margin: "-80px" };

export default function ContactSection() {
  const { contact } = portfolio;
  const prefersReduced = useReducedMotion();

  const motionProps = prefersReduced
    ? ({ initial: "show", animate: "show" } as Record<string, unknown>)
    : ({ initial: "hidden", whileInView: "show", viewport: VIEWPORT } as Record<string, unknown>);

  return (
    <section id="contact" className="relative py-28 lg:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-border to-transparent"
      />

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <motion.div
          {...motionProps}
          variants={makeContainer(0.14)}
          className="mx-auto max-w-3xl"
        >
          <div className="text-center mb-12">
            <motion.p
              variants={fadeUp}
              className="font-sans text-sm font-semibold uppercase tracking-[0.28em] text-accent"
            >
              {contact.eyebrow}
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="mt-4 font-serif text-[clamp(3rem,8vw,5.5rem)] font-semibold leading-[1.0] tracking-tight text-foreground"
            >
              {contact.heading}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-6 max-w-md font-sans text-base leading-relaxed text-muted"
            >
              {contact.intro}
            </motion.p>
          </div>

          <motion.div variants={fadeUp} className="bg-surface border border-border rounded-2xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
            <ContactForm />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
