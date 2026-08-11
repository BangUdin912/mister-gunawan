"use client";

import { useState } from "react";

import Image from "next/image";
import { motion } from "framer-motion";

import PortfolioLightbox from "./PortofolioLightbox";

interface PortfolioGalleryProps {
  images: string[];
  title?: string;
}

export default function PortfolioGallery({
  images,
  title = "Portfolio",
}: PortfolioGalleryProps) {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] =
    useState(0);

  if (!images?.length) {
    return null;
  }

  return (
    <>
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            className="mx-auto mb-14 max-w-3xl text-center"
          >
            <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              Dokumentasi
            </span>

            <h2 className="mt-6 text-4xl font-bold text-slate-900">
              Galeri Kegiatan
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Dokumentasi kegiatan{" "}
              <strong>{title}</strong>.
            </p>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((image, index) => (
              <motion.button
                key={`${image}-${index}`}
                type="button"
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.05,
                }}
                onClick={() => {
                  setCurrentIndex(index);
                  setOpen(true);
                }}
                className="
                  group
                  relative
                  aspect-[4/3]
                  overflow-hidden
                  rounded-3xl
                  border
                  border-slate-200
                  bg-slate-100
                  shadow-sm
                  transition-all
                  duration-300
                  hover:shadow-xl
                "
              >
                <Image
                  src={image}
                  alt={`${title} ${index + 1}`}
                  fill
                  className="
                    object-cover
                    transition-transform
                    duration-500
                    group-hover:scale-105
                  "
                />

                <div
                  className="
                    absolute
                    inset-0
                    flex
                    items-end
                    bg-gradient-to-t
                    from-black/60
                    via-black/10
                    to-transparent
                    p-5
                    opacity-0
                    transition-opacity
                    duration-300
                    group-hover:opacity-100
                  "
                >
                  <span className="text-sm font-medium text-white">
                    Lihat Foto
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <PortfolioLightbox
        images={images}
        currentIndex={currentIndex}
        open={open}
        onOpenChange={setOpen}
        onIndexChange={setCurrentIndex}
      />
    </>
  );
}