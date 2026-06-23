"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

type MediaHeroProps = {
  type: "image" | "video" | "placeholder";
  src?: string;
  alt?: string;
  parallax?: boolean;
  overlay?: number;
  height?: string;
  children: ReactNode;
};

function ParallaxLayer({ parallax, children }: { parallax: boolean; children: ReactNode }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 200]);

  if (!parallax) {
    return <div className="absolute inset-0">{children}</div>;
  }

  return (
    <motion.div style={{ y }} className="absolute inset-x-0 -top-[200px] -bottom-[200px]">
      {children}
    </motion.div>
  );
}

// Poné tu video en /public/assets/hero.mp4 y usalo con type="video" src="/assets/hero.mp4"
function ScrollScrubVideo({ src }: { src: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState(0);

  const { scrollYProgress } = useScroll({ target: sectionRef });
  const videoTime = useTransform(scrollYProgress, [0, 1], [0, duration]);

  useMotionValueEvent(videoTime, "change", (latest) => {
    if (videoRef.current) {
      videoRef.current.currentTime = latest;
    }
  });

  return (
    <div ref={sectionRef} className="absolute inset-0">
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onPlay={(event) => event.currentTarget.pause()}
        className="h-full w-full object-cover"
      />
    </div>
  );
}

export default function MediaHero({
  type,
  src,
  alt = "",
  parallax = false,
  overlay = 0.3,
  height = "h-screen",
  children,
}: MediaHeroProps) {
  return (
    <section className={`relative ${height} overflow-hidden`}>
      {type === "image" && src && (
        <ParallaxLayer parallax={parallax}>
          <Image src={src} alt={alt} fill className="object-cover" />
        </ParallaxLayer>
      )}

      {type === "video" && src && <ScrollScrubVideo src={src} />}

      {type === "placeholder" && (
        <ParallaxLayer parallax={parallax}>
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-forma-tan to-forma-black">
            <p className="text-sm uppercase tracking-widest text-forma-white/20">
              [ Foto del proyecto ]
            </p>
          </div>
        </ParallaxLayer>
      )}

      <div className="absolute inset-0 bg-black" style={{ opacity: overlay }} />

      <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
        {children}
      </div>
    </section>
  );
}
