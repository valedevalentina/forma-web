"use client";

import { AnimatePresence, motion } from "framer-motion";

export default function WhatsAppButton() {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.3 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <div className="group relative flex items-center">
          <span className="pointer-events-none absolute right-16 whitespace-nowrap rounded-sm bg-forma-black px-3 py-2 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
            Consultanos por WhatsApp
          </span>

          <button
            type="button"
            aria-label="Contactar por WhatsApp"
            onClick={() => window.open("https://wa.me/59899123456", "_blank")}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366]"
          >
            <svg viewBox="0 0 24 24" width={24} height={24} fill="white" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-1.746-.873-2.892-1.556-4.043-3.527-.305-.524.305-.487.872-1.624.097-.198.05-.371-.05-.52-.099-.149-.669-1.612-.916-2.207-.241-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.057 3.133 5.022 4.27 2.965 1.137 2.965.76 3.476.711.512-.05 1.658-.677 1.892-1.33.234-.652.234-1.211.165-1.33-.067-.118-.247-.198-.498-.346zm-5.45 7.443h-.005c-1.776 0-3.522-.477-5.04-1.379l-.36-.214-3.745.982.999-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.002-5.45 4.436-9.884 9.901-9.884a9.866 9.866 0 0 1 9.886 9.892c-.003 5.45-4.437 9.885-9.891 9.885zm8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
            </svg>
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
