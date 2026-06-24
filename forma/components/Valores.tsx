"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";

const VALUES = [
  { name: "Integridad", description: "Hacemos lo que decimos, sin atajos ni letra chica." },
  {
    name: "Precisión",
    description: "Cada detalle se mide, se revisa y se ejecuta con exactitud.",
  },
  { name: "Compromiso", description: "Acompañamos cada proyecto como si fuera el único." },
];

export default function Valores() {
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
    <section className="border-t border-forma-gray-light bg-forma-cream px-6 py-24 sm:px-10 lg:px-20">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-[1440px] mx-auto text-center"
      >
        <motion.p
          variants={itemVariants}
          className="mb-16 text-[10px] uppercase tracking-[0.2em] text-forma-tan"
        >
          Nuestros valores
        </motion.p>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {VALUES.map((value) => (
            <motion.div key={value.name} variants={itemVariants} className="text-center">
              <div className="mx-auto mb-8 h-px w-6 bg-forma-tan" />
              <p className="font-serif text-lg font-normal text-forma-black">{value.name}</p>
              <p className="mx-auto mt-3 max-w-xs text-xs font-light leading-relaxed text-forma-gray-mid">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
