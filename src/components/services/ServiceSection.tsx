"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";

import { serviceService } from "@/lib/serviceService";
import type { Service } from "@/types/service";

export default function ServicesSection() {
  const router = useRouter();

  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const loadServices = useCallback(async () => {
    setLoading(true);

    try {
      // Ambil SEMUA training yang aktif
      const data = await serviceService.getAll();
      setServices(data);
    } catch (error) {
      console.error("[ServicesSection]", error);
      setServices([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  if (loading) {
    return (
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-[470px] animate-pulse rounded-3xl bg-white"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (services.length === 0) {
    return (
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-3xl font-bold">
            Layanan Training
          </h2>

          <p className="mt-4 text-slate-500">
            Belum ada layanan yang tersedia.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold">
            Program Training
          </h2>

          <p className="mt-4 text-slate-600">
            Pilih program pelatihan yang sesuai dengan kebutuhan Anda.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => (
            <motion.article
              key={service.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.45,
                delay: index * 0.05,
              }}
              onClick={() =>
                router.push(`/services/${service.slug}`)
              }
              className="group flex cursor-pointer flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-2xl"
            >
              <div className="relative h-56 overflow-hidden">
                {service.thumbnail ? (
                  <Image
                    src={service.thumbnail}
                    alt={service.title}
                    fill
                    sizes="(max-width:768px) 100vw, (max-width:1280px) 50vw, 25vw"
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-slate-100 text-slate-400">
                    No Image
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/20 to-transparent" />

                <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-blue-700">
                  {service.package_type === "personal"
                    ? "Perorangan"
                    : "Perusahaan"}
                </span>

                <h3 className="absolute bottom-5 left-5 right-5 text-2xl font-bold text-white">
                  {service.title}
                </h3>
              </div>

              <div className="flex flex-1 flex-col p-6">

                <p className="flex-1 leading-7 text-slate-600">
                  {service.short_description ?? "-"}
                </p>

                <div className="mt-6 flex items-center gap-2 text-sm text-slate-500">
                  <span className="h-2 w-2 rounded-full bg-blue-600" />
                  Materi dapat disesuaikan dengan kebutuhan peserta.
                </div>

                <div className="mt-8 flex gap-3">
                  <Link
                    href={`/services/${service.slug}`}
                    onClick={(e) => e.stopPropagation()}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                  >
                    Detail
                    <ArrowRight className="h-5 w-5" />
                  </Link>

                  <Link
                    href={`/contact?service=${service.slug}`}
                    onClick={(e) => e.stopPropagation()}
                    title="Konsultasi"
                    className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-600 text-blue-600 transition hover:bg-blue-600 hover:text-white"
                  >
                    <MessageCircle className="h-5 w-5" />
                  </Link>
                </div>

              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}