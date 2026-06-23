const FOOTER_LINKS = [
  { label: "Nosotros", href: "#nosotros" },
  { label: "Servicios", href: "#servicios" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Contacto", href: "#contacto" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/8 bg-forma-black px-6 py-8 lg:px-16 lg:py-12">
      <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
        <a href="#" className="font-serif text-xl text-white">
          FORMA
        </a>

        <p className="text-xs text-white/35">
          © 2024 Constructora Forma. Todos los derechos reservados.
        </p>

        <nav className="flex items-center gap-6">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs uppercase tracking-widest text-white/35 transition-colors hover:text-white/70"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
