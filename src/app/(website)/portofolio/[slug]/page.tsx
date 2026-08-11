import type { Metadata } from "next";
import { notFound } from "next/navigation";

import HeroPortfolio from "@/components/portofolio/HeroPortofolio";
import PortfolioInformation from "@/components/portofolio/PortofolioInformation";
import PortfolioContent from "@/components/portofolio/PortofolioContent";
import PortfolioGallery from "@/components/portofolio/PortofolioGallery";

import { portfolioService } from "@/lib/portofolioService";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

function getYoutubeEmbedUrl(url: string) {
  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed${parsed.pathname}`;
    }

    const videoId = parsed.searchParams.get("v");

    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }

    return url;
  } catch {
    return url;
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const portfolio =
    await portfolioService.getBySlug(slug);

  if (!portfolio) {
    return {
      title: "Portfolio Tidak Ditemukan",
    };
  }

  return {
    title: `${portfolio.title} | Portfolio HSS`,
    description:
      portfolio.description ??
      "Dokumentasi kegiatan training HSS.",

    alternates: {
      canonical: `/portofolio/${portfolio.slug}`,
    },

    openGraph: {
      title: portfolio.title,
      description:
        portfolio.description ??
        "Dokumentasi kegiatan HSS.",

      type: "article",

      images: portfolio.thumbnail
        ? [
          {
            url: portfolio.thumbnail,
            alt: portfolio.title,
          },
        ]
        : [],
    },
  };
}

export default async function PortfolioDetailPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const portfolio =
    await portfolioService.getBySlug(slug);
  console.log(JSON.stringify(portfolio, null, 2));
  if (!portfolio || !portfolio.is_active) {
    notFound();
  }

  const galleryImages =
    Array.isArray(portfolio.gallery)
      ? portfolio.gallery
      : [];

  const hasGallery = galleryImages.length > 0;

  const hasYoutube =
    portfolio.youtube_url &&
    portfolio.youtube_url.length > 0;

  return (
    <main className="overflow-hidden">
      <HeroPortfolio
        title={portfolio.title}
        description={portfolio.description ?? ""}
        thumbnail={portfolio.thumbnail}
      />

      <PortfolioInformation
        category={portfolio.category}
        location={portfolio.location}
        eventDate={portfolio.event_date}
        participantCount={
          portfolio.participant_count
        }
      />

      <PortfolioContent
        title={portfolio.title}
        description={portfolio.description}
      />


      {/* Gallery Foto */}
      {hasGallery && (
        <PortfolioGallery
          images={galleryImages}
        />
      )}


      {/* Video Youtube */}
      {hasYoutube && (
        <section className="py-20">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">

            <div className="mb-10 text-center">
              <span className="inline-flex rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-600">
                Video Dokumentasi
              </span>

              <h2 className="mt-6 text-4xl font-bold text-slate-900">
                Dokumentasi Kegiatan
              </h2>

              <p className="mt-4 text-slate-600">
                Video dokumentasi pelaksanaan kegiatan.
              </p>
            </div>


            <div className="overflow-hidden rounded-3xl border bg-white shadow-xl">
              <div className="aspect-video">

                <iframe
                  className="h-full w-full"
                  src={getYoutubeEmbedUrl(
                    portfolio.youtube_url!
                  )}
                  title={portfolio.title}
                  allow="
                    accelerometer;
                    autoplay;
                    clipboard-write;
                    encrypted-media;
                    gyroscope;
                    picture-in-picture;
                    web-share
                  "
                  allowFullScreen
                />

              </div>
            </div>

          </div>
        </section>
      )}

    </main>
  );
}