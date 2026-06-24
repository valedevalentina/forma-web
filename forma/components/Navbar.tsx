"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Nosotros", id: "nosotros" },
  { label: "Servicios", id: "servicios" },
  { label: "Proyectos", id: "proyectos" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-[#E0DCD6] bg-[#F5F2ED]">
      <div className="mx-auto flex h-full w-full max-w-screen-xl items-center justify-between px-6 sm:px-10 lg:px-20">
        <a href="#" className="font-serif text-base text-forma-black">
          FORMA
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="text-[10px] uppercase tracking-[0.2em] text-forma-gray-mid transition-colors hover:text-forma-black"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contacto"
            className="border border-forma-black px-5 py-2 text-[10px] uppercase tracking-[0.2em] text-forma-black transition-colors hover:bg-forma-black hover:text-white"
          >
            Contactar
          </a>
        </nav>

        <button
          type="button"
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setMobileOpen((open) => !open)}
          className="text-forma-black md:hidden"
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
            className="absolute inset-x-0 top-full border-b border-forma-gray-light bg-forma-white md:hidden"
          >
            <nav className="flex flex-col gap-1 px-6 py-6 sm:px-10 lg:px-20">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={closeMobileMenu}
                  className="py-3 text-[10px] uppercase tracking-[0.2em] text-forma-gray-mid"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contacto"
                onClick={closeMobileMenu}
                className="mt-2 inline-flex items-center justify-center border border-forma-black px-5 py-3 text-[10px] uppercase tracking-[0.2em] text-forma-black"
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
