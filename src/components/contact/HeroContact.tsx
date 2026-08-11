"use client";

import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function HeroContact() {
  return (
    <section className="relative isolate flex min-h-[520px] items-center overflow-hidden">
      {/* Background */}
      <Image
        src="/images/contact/Hero.jpeg"
        alt="Hubungi Hartawan Sukses Sejahtera"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/75 to-slate-900/40" />

      {/* Decorative Blur */}
      <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />

      {/* Content */}
      <div className="relative mx-auto w-full max-w-7xl px-6 py-28 lg:px-8">
        <motion.div
          initial={{
            opacity: 0,
            y: 24,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="max-w-3xl"
        >
          

          {/* Breadcrumb */}
          <div className="mt-8 flex items-center gap-2 text-sm text-blue-200">
            <Link
              href="/"
              className="transition hover:text-white"
            >
              Home
            </Link>

            <ChevronRight className="h-4 w-4" />

            <span className="font-medium text-white">
              Contact
            </span>
          </div>

          {/* Title */}
          <h1 className="mt-8 text-5xl font-bold leading-tight tracking-tight text-white lg:text-6xl">
            Hubungi Kami
          </h1>

          {/* Description */}
          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-200">
            Diskusikan kebutuhan training, seminar, workshop,
            coaching, maupun pengembangan sumber daya manusia
            bersama Mister Gunawan dan tim Hartawan Sukses
            Sejahtera. Kami siap membantu merancang program yang
            sesuai dengan kebutuhan organisasi Anda.
          </p>

          
        </motion.div>
      </div>
    </section>
  );
}