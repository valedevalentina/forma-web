"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";

type Project = {
  name: string;
  meta: string;
  color: string;
};

const PROJECTS: Project[] = [
  { name: "Residencias Alto Parque", meta: "Condominio · 18 unidades", color: "#C8C4BC" },
  { name: "Casa Miradores", meta: "Unifamiliar · 320 m²", color: "#C0BCB4" },
  { name: "Edificio Serrano", meta: "Condominio · 8 unidades", color: "#C4C0B8" },
  { name: "Casa del Bosque", meta: "Unifamiliar · 480 m²", color: "#BEB9B2" },
  { name: "Villa Nórdica", meta: "Unifamiliar · 220 m²", color: "#C2BEB6" },
];

export default function Proyectos() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };

  const itemVariants: Variants = shouldReduceMotion
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
      };

  return (
    <section id="proyectos" className="scroll-mt-16 bg-forma-white px-6 py-24 sm:px-10 lg:px-20">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-screen-xl mx-auto"
      >
        <motion.p
          variants={itemVariants}
          className="text-[10px] uppercase tracking-[0.2em] text-forma-tan"
        >
          Nuestro trabajo
        </motion.p>

        <motion.h2
          variants={itemVariants}
          className="mb-16 mt-4 font-serif text-2xl font-normal text-forma-black"
        >
          Proyectos recientes
        </motion.h2>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.name}
              variants={itemVariants}
              className={`group relative overflow-hidden ${
                index === 0 ? "aspect-[16/9] lg:col-span-2" : "aspect-[4/3]"
              }`}
              style={{ backgroundColor: project.color }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-forma-black/75 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="font-serif text-base text-white">{project.name}</p>
                <p className="mt-2 text-[10px] uppercase tracking-widest text-forma-tan">
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
