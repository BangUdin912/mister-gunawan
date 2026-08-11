"use client";

import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  Images,
  MapPin,
  PlayCircle,
} from "lucide-react";

import type { Portfolio } from "@/types/portfolio";

interface PortfolioCardProps {
  portfolio: Portfolio;
}

function getYoutubeThumbnail(url?: string | null) {
  if (!url) return null;

  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([^?&/]+)/
  );

  if (!match) return null;

  return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
}

export default function PortfolioCard({
  portfolio,
}: PortfolioCardProps) {
  const isVideo = portfolio.type === "youtube";

  const imageSrc =
    portfolio.thumbnail ||
    getYoutubeThumbnail(portfolio.youtube_url) ||
    "/images/no-image.jpg";

  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="
        group
        flex
        h-full
        flex-col
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:border-blue-200
        hover:shadow-2xl
      "
    >
      <Link href={`/portofolio/${portfolio.slug}`}>
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={imageSrc}
            alt={portfolio.title}
            fill
            sizes="(max-width:768px) 100vw,
                   (max-width:1024px) 50vw,
                   33vw"
            className="
              object-cover
              transition-transform
              duration-500
              group-hover:scale-105
            "
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/10 to-transparent" />

          {/* Kategori */}
          <span className="absolute left-5 top-5 rounded-full bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white">
            {portfolio.category}
          </span>

          {/* Badge Video */}
          {isVideo && (
            <>
              <div className="absolute right-5 top-5 flex items-center gap-1 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white">
                <PlayCircle className="h-4 w-4" />
                Video
              </div>

              
            </>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-7">
        <Link href={`/portofolio/${portfolio.slug}`}>
          <h3 className="line-clamp-2 text-2xl font-bold leading-snug text-slate-900 transition-colors group-hover:text-blue-600">
            {portfolio.title}
          </h3>
        </Link>

        <p className="mt-3 min-h-[48px] line-clamp-2 text-sm leading-6 text-slate-600">
          {portfolio.description ||
            "Dokumentasi kegiatan Hartawan Sukses Sejahtera."}
        </p>

        <div className="mt-6 flex-1 space-y-3 text-sm text-slate-600">
          <div className="flex items-center gap-3">
            <MapPin className="h-4 w-4 shrink-0 text-blue-600" />
            <span>{portfolio.location || "-"}</span>
          </div>

          <div className="flex items-center gap-3">
            <CalendarDays className="h-4 w-4 shrink-0 text-blue-600" />
            <span>
              {portfolio.event_date
                ? new Date(
                    portfolio.event_date
                  ).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "-"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {isVideo ? (
              <>
                <PlayCircle className="h-4 w-4 shrink-0 text-red-600" />
                <span>1 Video</span>
              </>
            ) : (
              <>
                <Images className="h-4 w-4 shrink-0 text-blue-600" />
                <span>{portfolio.gallery?.length ?? 0} Foto</span>
              </>
            )}
          </div>
        </div>

        <div className="mt-auto border-t border-slate-100 pt-6">
          <Link
            href={`/portofolio/${portfolio.slug}`}
            className="inline-flex items-center gap-2 font-semibold text-blue-600 transition-colors hover:text-blue-700"
          >
            {isVideo ? "Tonton Video" : "Lihat Dokumentasi"}

            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}