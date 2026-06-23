"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Nosotros", id: "nosotros" },
  { label: "Servicios", id: "servicios" },
  { label: "Proyectos", id: "proyectos" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeId, setActiveId] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((link) => document.getElementById(link.id)).filter(
      (el): el is HTMLElement => el !== null
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const closeMobileMenu = () => setMobileOpen(false);

  const linkColorClasses = (isActive: boolean) =>
    isScrolled
      ? isActive
        ? "text-forma-black"
        : "text-forma-gray-mid hover:text-forma-black"
      : isActive
        ? "text-white"
        : "text-white/70 hover:text-white";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 py-6 transition-all duration-500 ${
        isScrolled ? "bg-forma-white/95 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-6 lg:px-12">
        <a
          href="#"
          className={`font-serif text-sm uppercase tracking-widest transition-colors duration-500 ${
            isScrolled ? "text-forma-black" : "text-white"
          }`}
        >
          FORMA
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`font-sans text-[11px] uppercase tracking-[0.2em] transition-colors duration-500 ${linkColorClasses(
                activeId === link.id
              )}`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contacto"
            className={`rounded-sm border border-current px-5 py-2 text-[11px] uppercase tracking-[0.2em] transition-all duration-500 ${
              isScrolled ? "bg-forma-black text-forma-white" : "bg-transparent text-white"
            }`}
          >
            Contactar
          </a>
        </nav>

        <button
          type="button"
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setMobileOpen((open) => !open)}
          className={`transition-colors duration-500 md:hidden ${
            isScrolled ? "text-forma-black" : "text-white"
          }`}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute inset-x-0 top-full border-b-[0.5px] border-white/10 bg-forma-black md:hidden"
          >
            <nav className="flex flex-col gap-1 px-6 py-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={closeMobileMenu}
                  className={`py-3 font-sans text-[11px] uppercase tracking-[0.2em] ${
                    activeId === link.id ? "text-white" : "text-white/60"
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contacto"
                onClick={closeMobileMenu}
                className="mt-2 inline-flex items-center justify-center rounded-sm bg-forma-white px-5 py-3 text-[11px] uppercase tracking-[0.2em] text-forma-black"
              >
                Contactar
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
