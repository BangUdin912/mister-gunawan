"use client";

import { motion } from "framer-motion";

import PortfolioCard from "./PortofolioCard";

import type { Portfolio } from "@/types/portfolio";

interface PortfolioGridProps {
  portfolios: Portfolio[];
}

export default function PortfolioGrid({
  portfolios,
}: PortfolioGridProps) {
  if (!portfolios.length) {
    return (
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-900">
            Belum Ada Portofolio
          </h2>

          <p className="mt-4 text-slate-500">
            Dokumentasi kegiatan belum tersedia.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            Dokumentasi Kegiatan
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900 lg:text-5xl">
            Portofolio Training & Aktivitas
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Dokumentasi berbagai kegiatan training, seminar,
            workshop, public speaking, motivasi, dan berbagai
            aktivitas yang telah dilaksanakan oleh Hartawan
            Sukses Sejahtera.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {portfolios.map((portfolio, index) => (
            <motion.div
              key={portfolio.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: index * 0.08,
              }}
            >
              <PortfolioCard portfolio={portfolio} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}