import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Nosotros from "@/components/Nosotros";
import Servicios from "@/components/Servicios";
import Proyectos from "@/components/Proyectos";
import Valores from "@/components/Valores";
import Contacto from "@/components/Contacto";
import WhatsAppButton from "@/components/WhatsAppButton";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="bg-forma-white">
        <Hero />
        <Marquee />
        <Nosotros />
        <Servicios />
        <Proyectos />
        <Valores />
        <Contacto />
      </main>
      <WhatsAppButton />
      <Footer />
    </>
  );
}
