"use client";

import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";
import {
  ChevronRight,
  MonitorSmartphone,
  Building2,
} from "lucide-react";

import type { Service } from "@/types/service";

interface Props {
  service: Service;
}

export default function HeroServiceDetail({
  service,
}: Props) {
  return (
    <section className="relative isolate flex min-h-[520px] items-center overflow-hidden">
      {/* Background */}

      <Image
        src={
          service.thumbnail ||
          "/images/services/Hero.jpeg"
        }
        alt={service.title}
        fill
        priority
        className="object-cover"
      />

      {/* Overlay */}

      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/75 to-slate-900/40" />

      {/* Content */}

      <div className="relative mx-auto w-full max-w-7xl px-6 py-28 lg:px-8">
        <motion.div
          initial={{
            opacity: 0,
            y: 25,
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

          <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-blue-200">
            <Link
              href="/"
              className="transition hover:text-white"
            >
              Home
            </Link>

            <ChevronRight className="h-4 w-4" />

            <Link
              href="/services"
              className="transition hover:text-white"
            >
              Services
            </Link>

            <ChevronRight className="h-4 w-4" />

            <span className="font-medium text-white">
              {service.title}
            </span>
          </div>


          {/* Title */}

          <h1 className="text-5xl font-bold leading-tight text-white lg:text-6xl">
            {service.title}
          </h1>

          {/* Description */}

          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-200">
            {service.short_description ||
              "Program training profesional yang dirancang secara customized sesuai kebutuhan organisasi, perusahaan, maupun instansi untuk meningkatkan kompetensi dan performa peserta."}
          </p>
        </motion.div>
      </div>
    </section>
  );
}