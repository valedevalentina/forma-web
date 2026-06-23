const MARQUEE_PARTS = [
  "Diseño residencial",
  "Construcción premium",
  "Proyectos llave en mano",
  "Condominios",
  "Casas a medida",
  "Materiales de primera",
];

function MarqueeRow() {
  return (
    <div className="flex shrink-0 items-center gap-3 pr-3" aria-hidden="true">
      {MARQUEE_PARTS.map((part, index) => (
        <span key={index} className="flex items-center gap-3">
          <span className="text-[11px] uppercase tracking-widest text-forma-brown/60">{part}</span>
          <span className="text-[11px] text-forma-tan/40">·</span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="overflow-hidden border-y border-forma-gray-light bg-forma-cream py-4">
      <div className="flex w-max animate-marquee">
        <MarqueeRow />
        <MarqueeRow />
      </div>
    </div>
  );
}
