"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  FolderOpen,
  MapPin,
  Users,
} from "lucide-react";

interface PortfolioInformationProps {
  category: string;
  location?: string | null;
  eventDate?: string | null;
  participantCount?: number | null;
}

export default function PortfolioInformation({
  category,
  location,
  eventDate,
  participantCount,
}: PortfolioInformationProps) {
  const formattedDate = eventDate
    ? new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date(eventDate))
    : "-";

  const information = [
    {
      label: "Kategori",
      value: category,
      icon: FolderOpen,
    },
    {
      label: "Lokasi",
      value: location || "-",
      icon: MapPin,
    },
    {
      label: "Tanggal Kegiatan",
      value: formattedDate,
      icon: CalendarDays,
    },
    {
      label: "Jumlah Peserta",
      value:
        participantCount != null
          ? `${participantCount} Peserta`
          : "-",
      icon: Users,
    },
  ];

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg"
        >
          {/* Header */}
          <div className="border-b border-slate-200 px-8 py-8 lg:px-12">
            <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              Informasi Kegiatan
            </span>

            <h2 className="mt-5 text-3xl font-bold text-slate-900">
              Detail Pelaksanaan
            </h2>

            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
              Informasi lengkap mengenai dokumentasi kegiatan yang telah
              dilaksanakan oleh Hartawan Sukses Sejahtera.
            </p>
          </div>

          {/* Information */}
          <div className="grid gap-px bg-slate-200 md:grid-cols-2">
            {information.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="flex items-start gap-5 bg-white p-8 transition-colors hover:bg-slate-50"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
                      {item.label}
                    </p>

                    <h3 className="mt-2 break-words text-lg font-semibold leading-7 text-slate-900">
                      {item.value}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}