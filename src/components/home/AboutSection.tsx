"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const strengths = [
  "Professional Trainer",
  "Public Speaker & Motivator",
  "Leadership Development",
  "Service Excellence",
  "Corporate Training",
  "Personal Development",
];

export default function AboutSection() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src="/images/about/gunawan.jpeg"
                alt="Mister Gunawan"
                width={700}
                height={850}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="absolute -bottom-8 right-8 rounded-2xl bg-blue-600 p-6 text-white shadow-xl">
              <h3 className="text-4xl font-bold">12+</h3>

              <p className="mt-1 text-sm text-blue-100">
                Tahun Pengalaman
              </p>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              Tentang Mister Gunawan
            </span>

            <h2 className="mt-6 text-4xl font-bold leading-tight text-slate-900 lg:text-5xl">
              Membantu Individu dan Perusahaan Bertumbuh Melalui Training
              Berkualitas
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Mister Gunawan merupakan seorang Professional Trainer, Public
              Speaker, Motivator, dan Consultant yang telah berpengalaman
              mendampingi berbagai perusahaan, instansi pemerintahan,
              organisasi, sekolah, hingga komunitas dalam meningkatkan kualitas
              sumber daya manusia melalui program pelatihan yang aplikatif,
              interaktif, dan berdampak nyata.
            </p>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Bersama <strong>Hartawan Sukses Sejahtera (HSS)</strong>, setiap
              program dirancang sesuai kebutuhan peserta sehingga menghasilkan
              perubahan perilaku, peningkatan kompetensi, dan budaya kerja yang
              lebih baik.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {strengths.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="h-5 w-5 text-blue-600" />

                  <span className="font-medium text-slate-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-12 flex flex-wrap gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700"
              >
                Selengkapnya
                <ArrowRight className="h-5 w-5" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center rounded-xl border border-slate-300 px-6 py-4 font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Hubungi Kami
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}