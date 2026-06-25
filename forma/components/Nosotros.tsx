"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";

type Value = {
  numeral: string;
  name: string;
  description: string;
};

const CARD_BORDER_CLASSES = [
  "",
  "border-t-[0.5px] md:border-t-0 md:border-l-[0.5px]",
  "border-t-[0.5px] lg:border-t-0 lg:border-l-[0.5px]",
  "border-t-[0.5px] md:border-l-[0.5px] lg:border-t-0",
];

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

  const cardsContainerVariants: Variants = shouldReduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration: 0.7, ease: "easeOut", staggerChildren: 0.1, delayChildren: 0.1 },
        },
      };

  return (
    <section id="nosotros" className="scroll-mt-16 bg-forma-white px-6 py-24 sm:px-10 lg:px-16">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-[1440px] mx-auto"
      >
        <div className="max-w-3xl">
          <motion.p
            variants={itemVariants}
            className="text-[10px] uppercase tracking-[0.2em] text-forma-tan"
          >
            Quiénes somos
          </motion.p>

          <motion.h2
            variants={itemVariants}
            className="mb-12 mt-4 font-serif text-3xl font-normal leading-snug text-forma-black sm:text-4xl"
          >
            Construir bien es un acto de respeto.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-10">
          {PARAGRAPHS.map((paragraph, index) => (
            <motion.p
              key={index}
              variants={itemVariants}
              className="text-base font-light leading-loose text-forma-black/70"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        <motion.div
          variants={cardsContainerVariants}
          className="relative mt-16 overflow-hidden sm:mt-20"
        >
          <div className="absolute inset-0 bg-[#E0DCD6]" />
          <div className="absolute inset-0 bg-forma-black/70" />

          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value, index) => (
              <motion.div
                key={value.numeral}
                variants={itemVariants}
                className={`${CARD_BORDER_CLASSES[index]} border-white/20 px-6 py-8`}
              >
                <p className="mb-1 text-2xl text-white/20">{value.numeral}</p>
                <p className="mb-2 font-serif text-sm font-medium text-white">{value.name}</p>
                <p className="text-xs font-light leading-relaxed text-white/60">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
