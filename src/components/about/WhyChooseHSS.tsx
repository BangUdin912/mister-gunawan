"use client";

import { motion } from "framer-motion";
import {
  Award,
  BadgeCheck,
  BookOpen,
  Building2,
  Users,
  Handshake,
} from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Trainer Berpengalaman",
    description:
      "Dipandu oleh trainer profesional yang telah berpengalaman memberikan pelatihan kepada perusahaan, instansi pemerintah, universitas, sekolah, dan organisasi di berbagai sektor.",
  },
  {
    icon: BookOpen,
    title: "Materi Sesuai Kebutuhan",
    description:
      "Materi training dirancang secara fleksibel dan dapat disesuaikan dengan kebutuhan, tantangan, serta tujuan setiap klien.",
  },
  {
    icon: Users,
    title: "Metode Interaktif",
    description:
      "Menggabungkan teori, diskusi, studi kasus, simulasi, hingga praktik langsung agar peserta lebih aktif dan mudah memahami materi.",
  },
  {
    icon: BadgeCheck,
    title: "Kualitas Terjamin",
    description:
      "Setiap program disusun secara profesional dengan fokus pada peningkatan kompetensi, produktivitas, dan hasil yang dapat diterapkan.",
  },
  {
    icon: Building2,
    title: "Online & Offline",
    description:
      "Melayani pelatihan secara tatap muka maupun online sehingga dapat menjangkau peserta dari berbagai wilayah Indonesia.",
  },
  {
    icon: Handshake,
    title: "Pendampingan Berkelanjutan",
    description:
      "Tidak hanya memberikan pelatihan, tetapi juga menjadi mitra strategis dalam proses pengembangan sumber daya manusia.",
  },
];

export default function WhyChooseHss() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-700">
            Mengapa Memilih Kami
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900 lg:text-5xl">
            Mengapa Memilih HSS?
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Hartawan Sukses Sejahtera (HSS) berkomitmen memberikan layanan
            training yang berkualitas, inovatif, dan berdampak nyata bagi
            individu maupun organisasi.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1,
                }}
                className="
                  group
                  rounded-3xl
                  border
                  border-slate-200
                  bg-white
                  p-8
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:border-blue-300
                  hover:shadow-xl
                "
              >
                <div
                  className="
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-2xl
                    bg-blue-100
                    transition
                    group-hover:bg-blue-600
                  "
                >
                  <Icon className="h-8 w-8 text-blue-600 transition group-hover:text-white" />
                </div>

                <h3 className="mt-6 text-xl font-bold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-8 text-slate-600">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="
            mt-20
            rounded-3xl
            bg-gradient-to-r
            from-blue-600
            to-blue-700
            px-10
            py-12
            text-center
            text-white
          "
        >
          <h3 className="text-3xl font-bold">
            Kami Tidak Hanya Memberikan Training
          </h3>

          <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-blue-100">
            HSS hadir sebagai mitra strategis dalam pengembangan sumber daya
            manusia. Setiap program dirancang untuk menghasilkan perubahan
            yang nyata, meningkatkan kompetensi peserta, serta mendukung
            kemajuan organisasi secara berkelanjutan.
          </p>
        </motion.div>
      </div>
    </section>
  );
}