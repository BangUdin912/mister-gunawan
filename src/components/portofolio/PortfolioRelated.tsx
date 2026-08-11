"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { motion } from "framer-motion";

import { ArrowRight } from "lucide-react";

import type { Portfolio } from "@/types/portfolio";
import { portfolioService } from "@/lib/portofolioService";

import PortfolioCard from "./PortofolioCard";

interface PortfolioRelatedProps {
  currentSlug: string;
}

export default function PortfolioRelated({
  currentSlug,
}: PortfolioRelatedProps) {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRelated() {
      try {
        const data = await portfolioService.getRelated(currentSlug);

        setPortfolios(data);
      } catch (error) {
        console.error("[PortfolioRelated]", error);
      } finally {
        setLoading(false);
      }
    }

    loadRelated();
  }, [currentSlug]);

  if (loading) {
    return (
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-10 h-8 w-72 animate-pulse rounded bg-slate-200" />

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-[420px] animate-pulse rounded-3xl bg-white"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!portfolios.length) {
    return null;
  }

  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              Portofolio Lainnya
            </span>

            <h2 className="mt-5 text-4xl font-bold text-slate-900">
              Dokumentasi Terkait
            </h2>

            <p className="mt-4 max-w-2xl text-slate-600">
              Lihat dokumentasi kegiatan Hartawan Sukses Sejahtera lainnya
              yang telah dilaksanakan bersama berbagai perusahaan,
              instansi, organisasi, maupun institusi pendidikan.
            </p>
          </div>

          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 font-semibold text-blue-600 transition hover:text-blue-700"
          >
            Lihat Semua

            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {portfolios.map((portfolio, index) => (
            <motion.div
              key={portfolio.id}
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.45,
                delay: index * 0.08,
              }}
            >
              <PortfolioCard
                portfolio={portfolio}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}