"use client";

import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";

interface PortfolioVideoPlayerProps {
  title: string;
  youtubeUrl: string;
  description?: string | null;
}

function getYoutubeEmbed(url: string) {
  try {
    const parsed = new URL(url);

    // youtube.com/watch?v=
    if (parsed.hostname.includes("youtube.com")) {
      const id = parsed.searchParams.get("v");

      if (id) {
        return `https://www.youtube.com/embed/${id}`;
      }

      // youtube.com/embed/xxxx
      if (parsed.pathname.startsWith("/embed/")) {
        return `https://www.youtube.com${parsed.pathname}`;
      }

      // youtube.com/shorts/xxxx
      if (parsed.pathname.startsWith("/shorts/")) {
        const id = parsed.pathname.split("/")[2];

        return `https://www.youtube.com/embed/${id}`;
      }
    }

    // youtu.be/xxxx
    if (parsed.hostname.includes("youtu.be")) {
      const id = parsed.pathname.replace("/", "");

      return `https://www.youtube.com/embed/${id}`;
    }

    return url;
  } catch {
    return url;
  }
}

export default function PortfolioVideoPlayer({
  title,
  youtubeUrl,
  description,
}: PortfolioVideoPlayerProps) {
  const embedUrl = getYoutubeEmbed(youtubeUrl);

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
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
          className="overflow-hidden rounded-3xl border bg-white shadow-lg"
        >
          {/* Header */}
          <div className="border-b p-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600">
              <PlayCircle className="h-4 w-4" />
              Video Dokumentasi
            </div>

            <h2 className="text-3xl font-bold text-slate-900">
              {title}
            </h2>

            {description && (
              <p className="mt-4 max-w-3xl leading-8 text-slate-600">
                {description}
              </p>
            )}
          </div>

          {/* Youtube */}
          <div className="relative aspect-video w-full bg-black">
            <iframe
              src={embedUrl}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}