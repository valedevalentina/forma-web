"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";

type Value = {
  numeral: string;
  title: string;
  description: string;
};

const VALUES: Value[] = [
  {
    numeral: "I",
    title: "Precisión",
    description: "Cada medida importa. Trabajamos con tolerancias mínimas y revisión continua.",
  },
  {
    numeral: "II",
    title: "Materiales",
    description: "Solo usamos proveedores certificados. Sin atajos, sin sustituciones.",
  },
  {
    numeral: "III",
    title: "Plazos",
    description: "Cumplimos los tiempos acordados. El respeto al cliente empieza por el tiempo.",
  },
  {
    numeral: "IV",
    title: "Garantía",
    description: "5 años de garantía estructural en todos nuestros proyectos residenciales.",
  },
];

const PARAGRAPHS = [
  "Desde 2008 diseñamos y construimos viviendas unifamiliares y condominios, acompañando cada proyecto con un director de obra dedicado de principio a fin.",
  "Llevamos más de 180 viviendas entregadas. No tercerizamos estructura, impermeabilización ni terminaciones: lo que firmamos, lo construimos nosotros.",
  "Creemos que una casa bien construida es una inversión que se cuida sola. Por eso cada decisión, desde los cimientos hasta el último detalle, se piensa para que dure.",
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Nosotros() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section id="nosotros" className="scroll-mt-20 bg-forma-white px-6 py-32 lg:px-16">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 lg:grid-cols-12"
      >
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <motion.p
              variants={itemVariants}
              className="text-[11px] uppercase tracking-[0.3em] text-forma-brown"
            >
              Quiénes somos
            </motion.p>

            <motion.h2
              variants={itemVariants}
              className="mt-6 font-serif text-4xl leading-tight text-forma-black"
            >
              Construir bien
              <br />
              es un acto
              <br />
              de respeto.
            </motion.h2>

            <motion.div variants={itemVariants}>
              <div className="my-8 h-px w-8 bg-forma-tan" />
              <p className="font-serif text-8xl leading-none text-forma-gray-light">16</p>
              <p className="mt-4 text-xs uppercase tracking-widest text-forma-brown">
                años de experiencia
              </p>
            </motion.div>
          </div>
        </div>

        <div className="mt-16 lg:col-span-7 lg:mt-0 lg:pl-16">
          {PARAGRAPHS.map((paragraph, index) => (
            <motion.p
              key={index}
              variants={itemVariants}
              className="mb-10 text-base font-light leading-loose text-forma-gray-mid"
            >
              {paragraph}
            </motion.p>
          ))}

          <motion.div
            variants={itemVariants}
            className="mt-10 grid grid-cols-2 gap-x-10 gap-y-10 border-t border-forma-gray-light pt-10"
          >
            {VALUES.map((value) => (
              <div key={value.numeral} className="border-t border-forma-tan pt-6">
                <p className="mb-3 font-serif text-xl text-forma-tan">{value.numeral}</p>
                <p className="mb-2 text-sm font-medium tracking-wide text-forma-black">
                  {value.title}
                </p>
                <p className="text-xs font-light leading-relaxed text-forma-gray-mid">
                  {value.description}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
