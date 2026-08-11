"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

import WhatsAppDialog from "@/components/contact/WhatsAppDialog";

export default function WhatsAppFloat() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  // Sembunyikan di halaman admin
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        initial={{
          opacity: 0,
          scale: 0.9,
          y: 24,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{
          duration: 0.35,
          delay: 0.3,
        }}
        whileHover={{
          scale: 1.05,
          y: -4,
        }}
        whileTap={{
          scale: 0.95,
        }}
        aria-label="Konsultasi melalui WhatsApp"
        className="
          fixed
          bottom-6
          right-6
          z-50
          flex
          items-center
          gap-3
          rounded-full
          bg-[#25D366]
          px-5
          py-4
          text-white
          shadow-2xl
          transition-all
          duration-300
          hover:shadow-green-500/30
        "
      >
        <div
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            bg-white/20
          "
        >
          <MessageCircle className="h-6 w-6" />
        </div>

        <div className="hidden text-left sm:block">
          <p className="text-xs opacity-90">
            Konsultasi Gratis
          </p>

          <p className="font-semibold">
            Chat WhatsApp
          </p>
        </div>
      </motion.button>

      <WhatsAppDialog
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}