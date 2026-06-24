const NAV_LINKS = [
  { label: "Nosotros", href: "#nosotros" },
  { label: "Servicios", href: "#servicios" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Contacto", href: "#contacto" },
];

const CONTACT_DETAILS = ["+598 99 123 456", "contacto@constructoraforma.com", "Montevideo, Uruguay"];

export default function Footer() {
  return (
    <footer className="bg-forma-black px-6 py-12 sm:px-10 lg:px-16">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-wrap items-start justify-between gap-8 border-b border-white/10 pb-10">
          <div className="flex-shrink-0">
            <p className="font-serif text-base text-white">FORMA</p>
            <p className="mt-2 max-w-[180px] font-sans text-xs leading-loose text-white/35">
              Construcción residencial de precisión desde 2008.
            </p>
          </div>

          <nav className="flex gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-sans text-xs tracking-wide text-white/40 transition-colors hover:text-white/80"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-1">
            {CONTACT_DETAILS.map((detail) => (
              <p key={detail} className="font-sans text-xs text-white/40">
                {detail}
              </p>
            ))}
          </div>
        </div>

        <div className="pt-6">
          <p className="font-sans text-[10px] text-white/20">
            © 2024 Constructora Forma. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
