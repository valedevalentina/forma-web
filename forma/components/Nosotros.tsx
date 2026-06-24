"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";

type Value = {
  numeral: string;
  name: string;
  description: string;
};

const VALUES: Value[] = [
  {
    numeral: "01",
    name: "Precisión",
    description: "Cada medida importa. Trabajamos con tolerancias mínimas y revisión continua.",
  },
  {
    numeral: "02",
    name: "Materiales",
    description: "Solo usamos proveedores certificados. Sin atajos, sin sustituciones.",
  },
  {
    numeral: "03",
    name: "Plazos",
    description: "Cumplimos los tiempos acordados. El respeto al cliente empieza por el tiempo.",
  },
  {
    numeral: "04",
    name: "Garantía",
    description: "5 años de garantía estructural en todos nuestros proyectos residenciales.",
  },
];

const PARAGRAPHS = [
  "Desde 2008 diseñamos y construimos viviendas unifamiliares y condominios, acompañando cada proyecto con un director de obra dedicado de principio a fin.",
  "Llevamos más de 180 viviendas entregadas. No tercerizamos estructura, impermeabilización ni terminaciones: lo que firmamos, lo construimos nosotros.",
  "Creemos que una casa bien construida es una inversión que se cuida sola. Por eso cada decisión, desde los cimientos hasta el último detalle, se piensa para que dure.",
];

export default function Nosotros() {
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
    <section id="nosotros" className="scroll-mt-16 bg-forma-white px-6 py-24 sm:px-10 lg:px-20">
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
          Quiénes somos
        </motion.p>

        <motion.h2
          variants={itemVariants}
          className="mb-16 mt-4 font-serif text-2xl font-normal text-forma-black"
        >
          Construir bien es un acto de respeto.
        </motion.h2>

        <div className="mx-auto grid max-w-5xl grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div variants={itemVariants} className="aspect-[4/3] bg-[#E0DCD6]" />

          <div>
            {PARAGRAPHS.map((paragraph, index) => (
              <motion.p
                key={index}
                variants={itemVariants}
                className="mb-5 text-sm font-light leading-loose text-forma-gray-mid"
              >
                {paragraph}
              </motion.p>
            ))}

            <motion.div variants={itemVariants}>
              <div className="my-10 h-px w-8 bg-forma-tan" />

              <div>
                {VALUES.map((value) => (
                  <div key={value.numeral} className="border-t border-forma-gray-light py-4">
                    <p className="mb-1 text-[10px] text-forma-tan">{value.numeral}</p>
                    <p className="text-sm font-medium text-forma-black">{value.name}</p>
                    <p className="mt-1 text-xs font-light leading-relaxed text-forma-gray-mid">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
