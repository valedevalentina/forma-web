"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

type Stat = {
  value: number;
  suffix?: string;
  label: string;
};

const STATS: Stat[] = [
  { value: 180, suffix: "+", label: "Proyectos" },
  { value: 16, label: "Años" },
  { value: 98, suffix: "%", label: "Satisfacción" },
];

function StatCounter({ value, suffix = "", label }: Stat) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();

  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [display, setDisplay] = useState(0);

  useMotionValueEvent(rounded, "change", (latest) => setDisplay(latest));

  useEffect(() => {
    if (!isInView) return;

    if (shouldReduceMotion) {
      count.set(value);
      return;
    }

    const controls = animate(count, value, { duration: 1.5, ease: "easeOut" });
    return () => controls.stop();
  }, [isInView, shouldReduceMotion, value, count]);

  return (
    <div ref={ref} className="px-10 py-5 text-center">
      <p className="font-serif text-3xl text-white">
        {display}
        {suffix}
      </p>
      <p className="mt-1 text-[10px] uppercase tracking-widest text-white/50">{label}</p>
    </div>
  );
}

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 200]);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* TODO: reemplazar este div por <Image> con foto de obra */}
      <motion.div
        style={{ y }}
        className="absolute inset-x-0 -top-[200px] -bottom-[200px] bg-[#2C2820]"
      />

      <div className="absolute inset-0 bg-black/30" />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <p className="mb-6 text-[11px] uppercase tracking-[0.3em] text-white/70">
          Constructora Residencial
        </p>

        <h1 className="max-w-4xl font-serif text-6xl leading-none text-white lg:text-8xl">
          Construimos espacios que perduran.
        </h1>

        <div className="my-8 h-16 w-px bg-white/40" />

        <p className="mb-10 max-w-md text-sm font-light leading-relaxed text-white/75">
          Diseñamos y edificamos hogares con precisión, materiales de primera y un compromiso
          real con cada detalle. Tu proyecto, nuestro oficio.
        </p>

        <a
          href="#proyectos"
          className="border-b border-white/30 pb-1 text-[11px] uppercase tracking-[0.2em] text-white/80 transition-colors hover:border-white hover:text-white"
        >
          Explorar proyectos ↓
        </a>
      </div>

      <div className="absolute inset-x-0 bottom-0 flex justify-center divide-x divide-white/20 bg-black/40 backdrop-blur-sm">
        {STATS.map((stat) => (
          <StatCounter key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  );
}
