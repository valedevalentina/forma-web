"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { useForm } from "react-hook-form";
import { Mail, MapPin, Phone, type LucideIcon } from "lucide-react";

type FormValues = {
  nombre: string;
  telefono: string;
  email: string;
  servicio: string;
  mensaje: string;
};

type ContactItem = {
  icon: LucideIcon;
  text: string;
};

const CONTACT_ITEMS: ContactItem[] = [
  { icon: Phone, text: "+598 99 123 456" },
  { icon: Mail, text: "contacto@constructoraforma.com" },
  { icon: MapPin, text: "Montevideo, Uruguay" },
];

const SERVICE_OPTIONS = ["Casa a medida", "Condominio", "Ampliación", "Remodelación", "Consultoría"];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const inputClasses =
  "w-full rounded-sm border border-forma-tan bg-transparent px-4 py-3 font-sans text-sm text-forma-black placeholder:text-forma-gray-mid transition-colors focus:border-forma-brown focus:outline-none";

const labelClasses = "mb-2 block text-[11px] uppercase tracking-widest text-forma-gray-mid";

export default function Contacto() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const onSubmit = (data: FormValues) => {
    const mensaje = encodeURIComponent(
      "Hola FORMA! Me contacto desde la web.\n" +
        "Nombre: " +
        data.nombre +
        "\n" +
        "Servicio: " +
        data.servicio +
        "\n" +
        "Mensaje: " +
        data.mensaje +
        "\n" +
        "Email: " +
        data.email
    );
    window.open("https://wa.me/59899123456?text=" + mensaje, "_blank");
  };

  return (
    <section id="contacto" className="scroll-mt-20 border-t border-forma-gray-light bg-forma-cream px-6 py-16 lg:px-16 lg:py-28">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 gap-20 lg:grid-cols-2"
      >
        <div>
          <motion.p
            variants={itemVariants}
            className="text-[11px] uppercase tracking-widest text-forma-gray-mid"
          >
            Contacto
          </motion.p>

          <motion.h2 variants={itemVariants} className="mt-4 font-serif text-4xl text-forma-black">
            Hablemos de tu <span className="italic text-forma-gray-mid">proyecto.</span>
          </motion.h2>

          <motion.p variants={itemVariants} className="mt-4 font-light text-forma-gray-mid">
            Respondemos todas las consultas dentro de las 24 horas. Sin compromiso y sin costo.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-10 flex flex-col gap-5">
            {CONTACT_ITEMS.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-4">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-sm border border-forma-gray-light">
                  <Icon size={16} className="text-forma-brown" />
                </div>
                <p className="text-sm text-forma-gray-mid">{text}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.form variants={itemVariants} onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="nombre" className={labelClasses}>
                Nombre
              </label>
              <input
                id="nombre"
                type="text"
                className={inputClasses}
                {...register("nombre", { required: "El nombre es obligatorio" })}
              />
              {errors.nombre && <p className="mt-1 text-xs text-red-400">{errors.nombre.message}</p>}
            </div>

            <div>
              <label htmlFor="telefono" className={labelClasses}>
                Teléfono
              </label>
              <input id="telefono" type="tel" className={inputClasses} {...register("telefono")} />
            </div>
          </div>

          <div>
            <label htmlFor="email" className={labelClasses}>
              Email
            </label>
            <input
              id="email"
              type="email"
              className={inputClasses}
              {...register("email", {
                required: "El email es obligatorio",
                pattern: { value: EMAIL_PATTERN, message: "Email inválido" },
              })}
            />
            {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="servicio" className={labelClasses}>
              Servicio
            </label>
            <select
              id="servicio"
              defaultValue=""
              className={inputClasses}
              {...register("servicio", { required: "Seleccioná un servicio" })}
            >
              <option value="" disabled>
                Seleccioná un servicio
              </option>
              {SERVICE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.servicio && <p className="mt-1 text-xs text-red-400">{errors.servicio.message}</p>}
          </div>

          <div>
            <label htmlFor="mensaje" className={labelClasses}>
              Mensaje
            </label>
            <textarea
              id="mensaje"
              rows={4}
              placeholder="Contanos sobre tu proyecto, ubicación aproximada, superficie estimada..."
              className={`${inputClasses} min-h-[120px] resize-none`}
              {...register("mensaje", {
                required: "El mensaje es obligatorio",
                minLength: { value: 10, message: "El mensaje debe tener al menos 10 caracteres" },
              })}
            />
            {errors.mensaje && <p className="mt-1 text-xs text-red-400">{errors.mensaje.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full rounded-sm bg-forma-black py-3 text-xs uppercase tracking-widest text-forma-white transition-opacity hover:opacity-80"
          >
            Enviar consulta
          </button>
        </motion.form>
      </motion.div>
    </section>
  );
}
