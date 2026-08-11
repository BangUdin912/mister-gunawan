"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Briefcase,
  GraduationCap,
  Users,
} from "lucide-react";

const achievements = [
  {
    icon: Briefcase,
    title: "Professional Trainer",
    description:
      "Berpengalaman memberikan training kepada perusahaan, instansi pemerintah, universitas, sekolah, dan organisasi.",
  },
  {
    icon: GraduationCap,
    title: "Public Speaker",
    description:
      "Membawakan seminar, workshop, leadership, komunikasi, motivasi, dan pengembangan SDM.",
  },
  {
    icon: Award,
    title: "Consultant",
    description:
      "Membantu organisasi merancang program pelatihan yang sesuai dengan kebutuhan peserta.",
  },
];

const statistics = [
  {
    value: "10+",
    label: "Tahun Pengalaman",
  },
  {
    value: "500+",
    label: "Program Training",
  },
  {
    value: "100+",
    label: "Perusahaan & Instansi",
  },
  {
    value: "10.000+",
    label: "Peserta",
  },
];

export default function ProfileMister() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative overflow-hidden rounded-3xl">
              <Image
                src="/images/about/gunawan.jpeg"
                alt="Mister Gunawan"
                width={700}
                height={900}
                className="h-full w-full object-cover"
                priority
              />

              <div className="absolute bottom-6 left-6 rounded-2xl bg-blue-600 px-6 py-4 text-white shadow-xl">
                <p className="text-sm opacity-90">
                  Professional Trainer
                </p>

                <h3 className="text-xl font-bold">
                  Mister Gunawan
                </h3>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              Tentang Mister Gunawan
            </span>

            <h2 className="mt-6 text-4xl font-bold text-slate-900 lg:text-5xl">
              Professional Trainer, Public Speaker &
              Consultant
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Mister Gunawan merupakan seorang Professional Trainer,
              Public Speaker, Coach, dan Consultant melalui
              <strong> Hartawan Sukses Sejahtera (HSS)</strong>.
              Berpengalaman membantu perusahaan, instansi pemerintah,
              universitas, sekolah, organisasi, hingga komunitas dalam
              meningkatkan kompetensi sumber daya manusia melalui
              pelatihan yang aplikatif, inspiratif, dan berdampak.
            </p>

            <p className="mt-5 leading-8 text-slate-600">
              Setiap program disusun sesuai kebutuhan peserta dengan
              pendekatan yang interaktif sehingga materi lebih mudah
              dipahami dan langsung dapat diterapkan dalam lingkungan
              kerja maupun kehidupan sehari-hari.
            </p>

            <div className="mt-10 space-y-6">
              {achievements.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex gap-5 rounded-2xl border border-slate-200 p-5 transition hover:border-blue-300 hover:shadow-lg"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
                      <Icon className="h-7 w-7 text-blue-600" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-900">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-slate-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Link
              href="/contact"
              className="mt-10 inline-flex items-center gap-3 rounded-xl bg-blue-600 px-7 py-4 font-semibold text-white transition hover:bg-blue-700"
            >
              Hubungi Kami
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 grid gap-6 rounded-3xl bg-slate-50 p-10 md:grid-cols-2 lg:grid-cols-4"
        >
          {statistics.map((item) => (
            <div
              key={item.label}
              className="text-center"
            >
              <Users className="mx-auto mb-4 h-8 w-8 text-blue-600" />

              <h3 className="text-4xl font-bold text-slate-900">
                {item.value}
              </h3>

              <p className="mt-2 text-slate-600">
                {item.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}