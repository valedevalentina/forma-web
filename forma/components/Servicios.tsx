"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import {
  Building2,
  ClipboardCheck,
  Home,
  Layers,
  Maximize2,
  Wrench,
  type LucideIcon,
} from "lucide-react";

type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const SERVICES: Service[] = [
  {
    icon: Home,
    title: "Casas a medida",
    description:
      "Desde el proyecto arquitectónico hasta las llaves en mano. Trabajamos con planos propios o del cliente.",
  },
  {
    icon: Building2,
    title: "Condominios",
    description:
      "Desarrollo de conjuntos residenciales de hasta 24 unidades. Gestión integral del proyecto.",
  },
  {
    icon: Maximize2,
    title: "Ampliaciones",
    description:
      "Sumamos superficie a tu hogar con continuidad constructiva y estética respecto a lo existente.",
  },
  {
    icon: Wrench,
    title: "Remodelaciones",
    description:
      "Renovamos espacios sin obra mayor: baños, cocinas, revestimientos y terminaciones.",
  },
  {
    icon: Layers,
    title: "Estructura y losa",
    description:
      "Ejecución de estructuras de hormigón armado con cálculo propio y control de calidad en obra.",
  },
  {
    icon: ClipboardCheck,
    title: "Consultoría y dirección",
    description:
      "Acompañamos proyectos de terceros con dirección de obra y certificación de avances.",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function Servicios() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : -24 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section id="servicios" className="scroll-mt-20 bg-forma-cream px-6 py-20 lg:px-16 lg:py-32">
      <div className="text-center">
        <p className="text-[11px] uppercase tracking-[0.3em] text-forma-brown">
          Nuestros servicios
        </p>
        <h2 className="mt-4 font-serif text-5xl text-forma-black">Lo que construimos.</h2>
        <div className="mx-auto my-10 h-px w-8 bg-forma-tan" />
      </div>

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="border-t border-forma-gray-light"
      >
        {SERVICES.map((service, index) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="flex items-center justify-between border-b border-forma-gray-light py-8 transition-colors duration-300 hover:bg-forma-white/50"
            >
              <div className="flex items-center">
                <span className="mr-10 font-serif text-2xl text-forma-tan">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-serif text-2xl text-forma-black">{service.title}</span>
              </div>

              <div className="flex items-center gap-6">
                <p className="max-w-sm text-right text-sm font-light text-forma-gray-mid">
                  {service.description}
                </p>
                <Icon size={18} className="shrink-0 text-forma-tan" />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
