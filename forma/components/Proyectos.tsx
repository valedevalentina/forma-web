"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";

type Project = {
  name: string;
  meta: string;
  color: string;
  tag?: string;
};

const PROJECTS: Project[] = [
  {
    name: "Residencias Alto Parque",
    meta: "Condominio · 18 unidades · 2024",
    color: "#B8B7B0",
    tag: "Destacado",
  },
  { name: "Casa Miradores", meta: "Unifamiliar · 320 m²", color: "#B4B3AC" },
  { name: "Edificio Serrano", meta: "Condominio · 8 unidades", color: "#C8C7C0" },
  { name: "Casa del Bosque", meta: "Unifamiliar · 480 m²", color: "#C0BFBA" },
  { name: "Villa Nórdica", meta: "Unifamiliar · 220 m²", color: "#C6C5BE" },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Proyectos() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section id="proyectos" className="scroll-mt-20 px-6 py-16 lg:px-16 lg:py-28">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div variants={itemVariants} className="mb-12 flex items-end justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-widest text-forma-gray-mid">
              Nuestro trabajo
            </p>
            <h2 className="mt-4 font-serif text-4xl text-forma-black lg:text-5xl">
              Proyectos <span className="italic text-forma-gray-mid">recientes.</span>
            </h2>
          </div>
          <a
            href="#"
            className="text-xs text-forma-gray-mid transition-colors hover:text-forma-black"
          >
            Ver todos →
          </a>
        </motion.div>

        <div className="grid grid-cols-1 gap-px bg-forma-gray-light lg:grid-cols-[2fr_1fr_1fr] lg:grid-rows-[300px_300px]">
          {/* TODO: reemplazar con next/image cuando tengas las fotos */}
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.name}
              variants={itemVariants}
              className={`group relative h-[250px] overflow-hidden lg:h-auto ${
                index === 0 ? "lg:row-span-2" : ""
              }`}
              style={{ backgroundColor: project.color }}
            >
              {project.tag && (
                <span className="absolute left-3 top-3 rounded-sm bg-black/70 px-2 py-1 text-[10px] uppercase tracking-widest text-white/80 backdrop-blur-sm">
                  {project.tag}
                </span>
              )}

              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="text-sm font-medium text-white">{project.name}</p>
                <p className="mt-1 text-[10px] uppercase tracking-widest text-white/60">
                  {project.meta}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
