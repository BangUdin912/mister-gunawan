"use client";

import Link from "next/link";

import {
  CalendarDays,
  Users,
  MonitorSmartphone,
  Building2,
  MessageCircle,
  Phone,
  BadgeCheck,
  Clock3,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import type { Service } from "@/types/service";

interface ServiceSidebarProps {
  service: Service;
}

export default function ServiceSidebar({
  service,
}: ServiceSidebarProps) {
  return (
    <aside className="lg:sticky lg:top-28">
      <div
        className="
          overflow-hidden
          rounded-[2rem]
          border
          border-slate-200
          bg-white
          shadow-xl
          shadow-slate-200/60
        "
      >
        {/* Header */}

        <div
          className="
            bg-gradient-to-r
            from-blue-700
            to-blue-600
            p-8
            text-white
          "
        >
          <span className="text-sm font-medium text-blue-100">
            Informasi Training
          </span>

          <h3 className="mt-2 text-2xl font-bold">
            {service.title}
          </h3>

          <p className="mt-4 text-sm leading-7 text-blue-100">
            Konsultasikan kebutuhan training
            Anda bersama tim Hartawan
            Sukses Sejahtera.
          </p>
        </div>

        {/* Information */}

        <div className="space-y-6 p-8">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-blue-50 p-3">
              <MonitorSmartphone className="h-5 w-5 text-blue-600" />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Metode
              </p>

              <p className="font-semibold text-slate-900">
                {service.activity_type === "online"
                  ? "Online"
                  : "Offline"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-blue-50 p-3">
              <Building2 className="h-5 w-5 text-blue-600" />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Kategori
              </p>

              <p className="font-semibold text-slate-900">
                {service.package_type ===
                "personal"
                  ? "Training Perorangan"
                  : "Training Perusahaan"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-blue-50 p-3">
              <Users className="h-5 w-5 text-blue-600" />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Peserta
              </p>

              <p className="font-semibold text-slate-900">
                Disesuaikan dengan kebutuhan
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-blue-50 p-3">
              <Clock3 className="h-5 w-5 text-blue-600" />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Durasi
              </p>

              <p className="font-semibold text-slate-900">
                Fleksibel
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-blue-50 p-3">
              <BadgeCheck className="h-5 w-5 text-blue-600" />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Sertifikat
              </p>

              <p className="font-semibold text-slate-900">
                Tersedia
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-blue-50 p-3">
              <CalendarDays className="h-5 w-5 text-blue-600" />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Jadwal
              </p>

              <p className="font-semibold text-slate-900">
                Sesuai Kesepakatan
              </p>
            </div>
          </div>

          <hr className="border-slate-200" />

          {/* CTA */}

          <div className="space-y-4">
            <Link href={`/contact?service=${service.slug}`}>
  <Button className="h-12 w-full rounded-xl bg-blue-600 hover:bg-blue-700">
    <MessageCircle className="mr-2 h-5 w-5" />
    Konsultasi Sekarang
  </Button>
</Link>

            <Link href="/contact">
  <Button
    variant="outline"
    className="h-12 w-full rounded-xl"
  >
    <Phone className="mr-2 h-5 w-5" />
    Hubungi Kami
  </Button>
</Link>
          </div>
        </div>
      </div>

      {/* Bottom Card */}

      <div
        className="
          mt-6
          rounded-[2rem]
          bg-gradient-to-br
          from-slate-900
          via-slate-800
          to-slate-900
          p-8
          text-white
        "
      >
        <h4 className="text-xl font-bold">
          Butuh Training Khusus?
        </h4>

        <p className="mt-4 leading-8 text-slate-300">
          Kami dapat menyesuaikan materi,
          metode, durasi, dan skenario
          pelatihan sesuai kebutuhan
          perusahaan maupun organisasi Anda.
        </p>

       <Link href={`/contact?service=${service.slug}`}>
  <Button className="mt-8 h-12 w-full rounded-xl bg-white text-slate-900 hover:bg-slate-100">
    Diskusikan Sekarang
  </Button>
</Link>
      </div>
    </aside>
  );
}