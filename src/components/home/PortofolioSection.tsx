import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  Images,
  PlayCircle,
} from "lucide-react";

import { portfolioService } from "@/lib/portofolioService";

export default async function PortfolioSection() {
  const portfolios = await portfolioService.getFeatured();

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            Portofolio Kami
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900 lg:text-5xl">
            Dokumentasi Kegiatan Training
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Dokumentasi berbagai kegiatan training, seminar, workshop,
            coaching, outbound, public speaking, dan pengembangan SDM
            yang telah dilaksanakan oleh Hartawan Sukses Sejahtera (HSS).
          </p>
        </div>

        {/* Gallery */}
        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {portfolios.map((portfolio) => {
            const isVideo = Boolean(portfolio.youtube_url);

            return (
              <Link
                key={portfolio.id}
                href={`/portofolio/${portfolio.slug}`}
                className="group overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={
                      portfolio.thumbnail ||
                      "/images/placeholder.jpg"
                    }
                    alt={portfolio.title}
                    fill
                    sizes="(max-width:768px) 50vw,
                           (max-width:1024px) 33vw,
                           25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Video Indicator */}
                  {isVideo && (
                    <>
                     
                      {/* Badge Video */}
                      <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-red-600 px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
                        <PlayCircle className="h-4 w-4" />
                        Video
                      </div>

                      
                    </>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <Link
            href="/portofolio"
            className="inline-flex items-center gap-3 rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-blue-700"
          >
            <Images className="h-5 w-5" />
            Lihat Semua Dokumentasi
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}