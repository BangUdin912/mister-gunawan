"use client";

import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600 py-20 text-white">
      {/* Background Blur */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex rounded-full bg-white/15 px-5 py-2 text-sm font-semibold backdrop-blur">
            Hartawan Sukses Sejahtera (HSS)
          </span>

          <h2 className="mt-6 text-4xl font-bold leading-tight lg:text-5xl">
            Konsultasi dan
            <span className="block text-blue-100">
              Booking Jadwal HSS
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100">
            Diskusikan kebutuhan training, seminar, workshop, maupun
            public speaking bersama tim HSS. Kami siap membantu
            menentukan program terbaik sesuai kebutuhan Anda.
          </p>

          <div className="mt-10">
            <Link
              href="/contact"
              className="
                inline-flex
                items-center
                gap-3
                rounded-xl
                bg-white
                px-8
                py-4
                font-semibold
                text-blue-700
                shadow-xl
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-slate-100
                hover:shadow-2xl
              "
            >
              <Phone className="h-5 w-5" />
              Konsultasi Sekarang
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}