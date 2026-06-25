const NAV_LINKS = [
  { label: "Nosotros", href: "#nosotros" },
  { label: "Servicios", href: "#servicios" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Contacto", href: "#contacto" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0D0D0D] border-t-[0.5px] border-white/20 px-6 py-4 sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6">
        <div className="flex items-center">
          <p className="font-serif text-sm font-medium text-white">FORMA</p>
          <p className="ml-6 font-sans text-xs text-white/40">
            Construcción residencial de precisión desde 2008.
          </p>
        </div>

        <nav className="flex items-center gap-x-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-sans text-xs tracking-wide text-white/60 transition-colors hover:text-white/80"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <p className="font-sans text-xs text-white/30">
          © 2026 Forma. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
