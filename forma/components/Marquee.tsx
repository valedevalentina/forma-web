const MARQUEE_PARTS = [
  "Diseño residencial",
  "Construcción premium",
  "Proyectos llave en mano",
  "Condominios",
  "Casas a medida",
  "Materiales de primera",
];

function MarqueeContent() {
  return (
    <div
      className="flex shrink-0 items-center gap-3 pr-3 text-[10px] uppercase tracking-[0.2em] text-forma-tan"
      aria-hidden="true"
    >
      {MARQUEE_PARTS.map((part, index) => (
        <span key={index} className="flex items-center gap-3">
          <span>{part}</span>
          <span>·</span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="overflow-hidden border-y border-forma-gray-light bg-forma-cream px-6 py-3 sm:px-10 lg:px-20">
      <div className="flex w-max animate-marquee">
        <MarqueeContent />
        <MarqueeContent />
      </div>
    </div>
  );
}
