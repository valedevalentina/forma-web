import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Nosotros from "@/components/Nosotros";
import Servicios from "@/components/Servicios";
import Proyectos from "@/components/Proyectos";
import Contacto from "@/components/Contacto";
import WhatsAppButton from "@/components/WhatsAppButton";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-[80px]">
        <Hero />
        <Marquee />
        <Nosotros />
        <Servicios />
        <Proyectos />
        <Contacto />
      </main>
      <WhatsAppButton />
      <Footer />
    </>
  );
}
