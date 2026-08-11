"use client";

import { motion } from "framer-motion";
import {
  ClipboardList,
  Search,
  BookOpen,
  Presentation,
  BarChart3,
  Handshake,
} from "lucide-react";

const processes = [
  {
    step: "01",
    title: "Konsultasi Awal",
    description:
      "Memahami kebutuhan, tujuan, dan tantangan yang dihadapi perusahaan atau organisasi.",
    icon: ClipboardList,
  },
  {
    step: "02",
    title: "Analisis Kebutuhan",
    description:
      "Mengidentifikasi kompetensi yang perlu ditingkatkan agar program tepat sasaran.",
    icon: Search,
  },
  {
    step: "03",
    title: "Penyusunan Materi",
    description:
      "Menyusun modul training yang disesuaikan dengan kondisi dan kebutuhan peserta.",
    icon: BookOpen,
  },
  {
    step: "04",
    title: "Pelaksanaan Training",
    description:
      "Training dilaksanakan secara interaktif melalui diskusi, simulasi, studi kasus, dan praktik.",
    icon: Presentation,
  },
  {
    step: "05",
    title: "Evaluasi",
    description:
      "Mengukur efektivitas pembelajaran dan perkembangan kompetensi peserta.",
    icon: BarChart3,
  },
  {
    step: "06",
    title: "Pendampingan",
    description:
      "Memberikan rekomendasi dan tindak lanjut agar hasil training dapat diterapkan secara berkelanjutan.",
    icon: Handshake,
  },
];

export default function TrainingProcess() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <span
            className="
              inline-flex
              rounded-full
              border
              border-blue-200
              bg-blue-50
              px-4
              py-2
              text-sm
              font-semibold
              text-blue-700
            "
          >
            Alur Pelaksanaan
          </span>

          <h2
            className="
              mt-6
              text-4xl
              font-bold
              tracking-tight
              text-slate-900
              lg:text-5xl
            "
          >
            Proses Training Bersama HSS
          </h2>

          <p
            className="
              mt-6
              text-lg
              leading-8
              text-slate-600
            "
          >
            Setiap program pelatihan dirancang melalui tahapan yang
            sistematis untuk memastikan materi yang diberikan sesuai
            dengan kebutuhan organisasi dan memberikan hasil yang
            optimal.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative mt-20">
          <div className="absolute left-8 top-0 hidden h-full w-px bg-slate-200 lg:block" />

          <div className="space-y-10">
            {processes.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.step}
                  initial={{
                    opacity: 0,
                    x: -30,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: index * 0.08,
                  }}
                  className="
                    relative
                    flex
                    flex-col
                    gap-6
                    lg:flex-row
                    lg:items-start
                  "
                >
                  {/* Step */}
                  <div
                    className="
                      relative
                      z-10
                      flex
                      h-16
                      w-16
                      shrink-0
                      items-center
                      justify-center
                      rounded-2xl
                      bg-blue-600
                      text-xl
                      font-bold
                      text-white
                      shadow-lg
                    "
                  >
                    {item.step}
                  </div>

                  {/* Card */}
                  <div
                    className="
                      flex-1
                      rounded-[2rem]
                      border
                      border-slate-200
                      bg-white
                      p-8
                      shadow-sm
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-blue-200
                      hover:shadow-xl
                    "
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="
                          flex
                          h-12
                          w-12
                          items-center
                          justify-center
                          rounded-xl
                          bg-blue-100
                        "
                      >
                        <Icon className="h-6 w-6 text-blue-600" />
                      </div>

                      <h3
                        className="
                          text-2xl
                          font-bold
                          text-slate-900
                        "
                      >
                        {item.title}
                      </h3>
                    </div>

                    <p
                      className="
                        mt-5
                        leading-8
                        text-slate-600
                      "
                    >
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}