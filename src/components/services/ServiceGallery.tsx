"use client";

import { useState } from "react";

import Image from "next/image";

import { motion, AnimatePresence } from "framer-motion";

import { X, ZoomIn } from "lucide-react";

interface ServiceGalleryProps {
  images: string[];
}

export default function ServiceGallery({
  images,
}: ServiceGalleryProps) {
  const [selected, setSelected] = useState<string | null>(
    null
  );

  if (!images?.length) {
    return null;
  }

  return (
    <section
      id="gallery"
      className="bg-slate-50 py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
            Dokumentasi
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900 lg:text-5xl">
            Galeri Training
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Momen pelaksanaan training,
            seminar, workshop, dan berbagai
            kegiatan pengembangan SDM bersama
            Hartawan Sukses Sejahtera.
          </p>
        </motion.div>

        {/* Hero Image */}

        <motion.button
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
          onClick={() =>
            setSelected(images[0])
          }
          className="group relative mt-16 block w-full overflow-hidden rounded-[2rem]"
        >
          <div className="relative aspect-[16/8]">
            <Image
              src={images[0]}
              alt="Training"
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

            <div className="absolute bottom-8 left-8 text-left text-white">
              <h3 className="text-3xl font-bold">
                Dokumentasi Kegiatan
              </h3>

              <p className="mt-2 text-white/80">
                Klik gambar untuk melihat
                ukuran penuh.
              </p>
            </div>

            <div className="absolute right-8 top-8 rounded-full bg-white/20 p-4 backdrop-blur">
              <ZoomIn className="h-6 w-6 text-white" />
            </div>
          </div>
        </motion.button>

        {/* Grid */}

        {images.length > 1 && (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {images
              .slice(1)
              .map((image, index) => (
                <motion.button
                  key={`${image}-${index}`}
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay:
                      index * 0.05,
                  }}
                  onClick={() =>
                    setSelected(image)
                  }
                  className="group relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={image}
                      alt={`Gallery ${
                        index + 2
                      }`}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40 opacity-0 transition duration-300 group-hover:opacity-100">
                      <ZoomIn className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </motion.button>
              ))}
          </div>
        )}
      </div>

      {/* Lightbox */}

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 p-6"
            onClick={() =>
              setSelected(null)
            }
          >
            <button
              onClick={() =>
                setSelected(null)
              }
              className="absolute right-6 top-6 rounded-full bg-white p-2 text-slate-900 shadow-lg"
            >
              <X className="h-6 w-6" />
            </button>

            <motion.div
              initial={{
                scale: 0.9,
              }}
              animate={{
                scale: 1,
              }}
              exit={{
                scale: 0.9,
              }}
              className="relative h-[85vh] w-full max-w-6xl"
              onClick={(e) =>
                e.stopPropagation()
              }
            >
              <Image
                src={selected}
                alt="Gallery"
                fill
                className="object-contain"
                sizes="100vw"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}