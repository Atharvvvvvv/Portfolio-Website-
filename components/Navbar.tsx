"use client";

import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  memo,
} from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { portfolio } from "@/data/portfolio";

// ─── Hook: Scroll Detection ───────────────────────────────────────────────────
// Returns true once the user has scrolled past `threshold` pixels.
// Uses a passive listener to avoid blocking the main thread.

function useScrolled(threshold = 20): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll(); // Sync immediately on mount (handles refresh-at-scroll-position)
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}

// ─── Hook: Active Section ─────────────────────────────────────────────────────
// Uses a single IntersectionObserver to watch all section elements.
// rootMargin creates a ~5% "trigger band" near the upper-center of the
// viewport — a section becomes active only when it enters this zone,
// preventing two sections from being simultaneously active.

function useActiveSection(sectionIds: readonly string[]): string {
  const [active, setActive] = useState("");

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window))
      return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return active;
}

// ─── NavLink ──────────────────────────────────────────────────────────────────
// Memoized to avoid re-rendering all links when only `active` changes.

const NavLink = memo(function NavLink({
  href,
  label,
  isActive,
}: {
  href: string;
  label: string;
  isActive: boolean;
}) {
  return (
    <a
      href={href}
      className={`nav-link${isActive ? " nav-link-active" : ""}`}
      aria-current={isActive ? "true" : undefined}
    >
      {label}
      {isActive && (
        <span className="nav-link-dot" aria-hidden="true" />
      )}
    </a>
  );
});

NavLink.displayName = "NavLink";

// ─── Navbar ───────────────────────────────────────────────────────────────────

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const scrolled = useScrolled(20);

  // Stable reference — only recomputed if portfolio.navigation changes
  const sectionIds = useMemo(
    () => portfolio.navigation.map((item) => item.href.replace("#", "")),
    []
  );
  const activeSection = useActiveSection(sectionIds);

  // ── Handlers ──────────────────────────────────────────────────────────────

  const closeMenu = useCallback(() => {
    setMobileOpen(false);
    // Return focus to the trigger so keyboard users aren't lost
    requestAnimationFrame(() => hamburgerRef.current?.focus());
  }, []);

  const toggleMenu = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  // Close on Escape key
  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen, closeMenu]);

  // Prevent background scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className={`navbar-header${scrolled ? " navbar-scrolled" : ""}`}>
      {/* ── Main nav bar row ────────────────────────────────────────────── */}
      <nav
        role="navigation"
        aria-label="Main navigation"
        className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 lg:px-8"
      >
        {/* Logo */}
        <Link
          href="/"
          className="font-serif text-2xl font-semibold tracking-tight transition-opacity duration-200 hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
          aria-label={`${portfolio.name} — Home`}
        >
          {portfolio.name}
        </Link>

        {/* Desktop: links + theme toggle */}
        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-1" role="list">
            {portfolio.navigation.map((item) => (
              <li key={item.href}>
                <NavLink
                  href={item.href}
                  label={item.label}
                  isActive={activeSection === item.href.replace("#", "")}
                />
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            ref={hamburgerRef}
            type="button"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={toggleMenu}
            className="hamburger-btn"
          >
            {/* Icon swap with rotate animation */}
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="close"
                  aria-hidden="true"
                  className="flex items-center justify-center"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15, ease: "easeInOut" }}
                >
                  <X size={20} strokeWidth={1.75} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  aria-hidden="true"
                  className="flex items-center justify-center"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15, ease: "easeInOut" }}
                >
                  <Menu size={20} strokeWidth={1.75} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* ── Mobile slide-down menu ───────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="mobile-menu-panel md:hidden"
          >
            <nav
              aria-label="Mobile navigation"
              className="mx-auto max-w-7xl px-6 pb-6 pt-2"
            >
              <ul className="flex flex-col" role="list">
                {portfolio.navigation.map((item, i) => {
                  const isActive =
                    activeSection === item.href.replace("#", "");
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: i * 0.055,
                        duration: 0.28,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <a
                        href={item.href}
                        onClick={closeMenu}
                        aria-current={isActive ? "true" : undefined}
                        className={`mobile-nav-link${
                          isActive ? " mobile-nav-link-active" : ""
                        }`}
                      >
                        <span
                          className="mobile-nav-index"
                          aria-hidden="true"
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {item.label}
                      </a>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
