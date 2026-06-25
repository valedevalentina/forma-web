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

const fieldClasses =
  "w-full border-b border-[#0D0D0D]/20 bg-transparent py-0 text-xs text-forma-black placeholder:text-forma-gray-mid outline-none transition-colors focus:border-forma-black";

const labelClasses = "mb-0 block text-[10px] uppercase tracking-widest text-forma-tan";

export default function Contacto() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const shouldReduceMotion = useReducedMotion();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };

  const itemVariants: Variants = shouldReduceMotion
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
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
    <section
      id="contacto"
      className="scroll-mt-16 border-t border-forma-gray-light bg-forma-white px-6 py-16 sm:px-10 lg:px-16"
    >
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-[1440px] mx-auto"
      >
        <motion.p
          variants={itemVariants}
          className="text-[10px] uppercase tracking-[0.2em] text-forma-tan"
        >
          Contacto
        </motion.p>

        <div className="mt-3 grid grid-cols-1 items-start gap-y-16 lg:grid-cols-2 lg:gap-x-20">
          <div>
            <motion.h2
              variants={itemVariants}
              className="font-serif text-2xl font-normal text-forma-black"
            >
              Hablemos de tu proyecto.
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="mt-2 text-sm font-light leading-loose text-forma-gray-mid"
            >
              Respondemos todas las consultas dentro de las 24 horas. Sin compromiso y sin costo.
            </motion.p>

            <motion.div variants={itemVariants} className="mt-4">
              {CONTACT_ITEMS.map(({ icon: Icon, text }) => (
                <div key={text} className="mb-3 flex items-center gap-3">
                  <Icon size={14} className="text-forma-tan" />
                  <p className="text-sm text-forma-black">{text}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-h-[220px]"
          >
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label htmlFor="nombre" className={labelClasses}>
                    Nombre
                  </label>
                  <input
                    id="nombre"
                    type="text"
                    className={`${fieldClasses} h-5`}
                    {...register("nombre", { required: "El nombre es obligatorio" })}
                  />
                  {errors.nombre && (
                    <p className="mt-0.5 text-[10px] text-red-500">{errors.nombre.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="telefono" className={labelClasses}>
                    Teléfono
                  </label>
                  <input
                    id="telefono"
                    type="tel"
                    className={`${fieldClasses} h-5`}
                    {...register("telefono")}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className={labelClasses}>
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className={`${fieldClasses} h-5`}
                  {...register("email", {
                    required: "El email es obligatorio",
                    pattern: { value: EMAIL_PATTERN, message: "Email inválido" },
                  })}
                />
                {errors.email && (
                  <p className="mt-0.5 text-[10px] text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="servicio" className={labelClasses}>
                  Servicio
                </label>
                <select
                  id="servicio"
                  defaultValue=""
                  className={`${fieldClasses} h-5`}
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
                {errors.servicio && (
                  <p className="mt-0.5 text-[10px] text-red-500">{errors.servicio.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="mensaje" className={labelClasses}>
                  Mensaje
                </label>
                <textarea
                  id="mensaje"
                  rows={2}
                  placeholder="Contanos sobre tu proyecto, ubicación aproximada, superficie estimada..."
                  className={`${fieldClasses} h-8 resize-none`}
                  {...register("mensaje", {
                    required: "El mensaje es obligatorio",
                    minLength: { value: 10, message: "El mensaje debe tener al menos 10 caracteres" },
                  })}
                />
                {errors.mensaje && (
                  <p className="mt-0.5 text-[10px] text-red-500">{errors.mensaje.message}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 w-full bg-forma-black px-8 py-1.5 text-[10px] uppercase tracking-widest text-white transition-opacity hover:opacity-80"
            >
              Enviar consulta
            </button>
          </motion.form>
        </div>
      </motion.div>
    </section>
  );
}
