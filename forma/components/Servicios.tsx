"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";

type Service = {
  name: string;
  description: string;
};

const SERVICES: Service[] = [
  {
    name: "Casas a medida",
    description: "Desde el proyecto arquitectónico hasta las llaves en mano.",
  },
  {
    name: "Condominios",
    description: "Desarrollo de conjuntos residenciales de hasta 24 unidades.",
  },
  {
    name: "Ampliaciones",
    description: "Sumamos superficie con continuidad constructiva y estética.",
  },
  {
    name: "Remodelaciones",
    description: "Baños, cocinas, revestimientos y terminaciones sin obra mayor.",
  },
  {
    name: "Estructura y losa",
    description: "Hormigón armado con cálculo propio y control de calidad en obra.",
  },
  {
    name: "Consultoría",
    description: "Dirección de obra y certificación de avances para terceros.",
  },
];

export default function Servicios() {
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
    <section id="servicios" className="scroll-mt-16 bg-forma-cream px-6 py-24 sm:px-10 lg:px-20">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mx-auto max-w-screen-xl"
      >
        <motion.p
          variants={itemVariants}
          className="text-[10px] uppercase tracking-[0.2em] text-forma-tan"
        >
          Lo que hacemos
        </motion.p>

        <motion.h2
          variants={itemVariants}
          className="mb-16 mt-4 font-serif text-2xl font-normal text-forma-black"
        >
          Nuestros servicios
        </motion.h2>

        <div>
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.name}
              variants={itemVariants}
              className={`flex justify-between items-baseline gap-8 border-t border-forma-gray-light py-5 ${
                index === SERVICES.length - 1 ? "border-b" : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="text-[10px] text-forma-tan">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-medium text-forma-black">{service.name}</span>
              </div>

              <p className="hidden max-w-xs text-right text-xs font-light text-forma-gray-mid lg:block">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
