"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  GraduationCap,
  Briefcase,
  Users,
  Trophy,
} from "lucide-react";

const timeline = [
  {
    year: "2012",
    title: "Memulai Karier sebagai Trainer",
    description:
      "Mulai aktif memberikan pelatihan, seminar, dan pengembangan kompetensi kepada berbagai komunitas serta organisasi.",
    icon: GraduationCap,
  },
  {
    year: "2015",
    title: "Menjangkau Berbagai Perusahaan",
    description:
      "Dipercaya menjadi trainer bagi perusahaan swasta, instansi pemerintah, sekolah, dan universitas di berbagai daerah.",
    icon: Briefcase,
  },
  {
    year: "2018",
    title: "Berdirinya Hartawan Sukses Sejahtera",
    description:
      "Mendirikan HSS sebagai lembaga training dan consulting yang berfokus pada pengembangan sumber daya manusia.",
    icon: Users,
  },
  {
    year: "2022",
    title: "Ratusan Program Training",
    description:
      "Berhasil menyelenggarakan ratusan program training, workshop, seminar, public speaking, dan leadership development.",
    icon: Calendar,
  },
  {
    year: "Sekarang",
    title: "Terus Bertumbuh Bersama Klien",
    description:
      "HSS terus dipercaya berbagai perusahaan dan instansi untuk menjadi mitra strategis dalam pengembangan SDM.",
    icon: Trophy,
  },
];

export default function JourneyTimeline() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-700">
            Perjalanan Kami
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900 lg:text-5xl">
            Perjalanan Hartawan Sukses Sejahtera
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Setiap langkah merupakan bagian dari komitmen kami dalam
            menghadirkan pelatihan berkualitas dan memberikan dampak nyata
            bagi pengembangan sumber daya manusia di Indonesia.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative mt-20">
          {/* Vertical Line */}
          <div className="absolute left-6 top-0 h-full w-1 rounded-full bg-blue-100 lg:left-1/2 lg:-translate-x-1/2" />

          <div className="space-y-14">
            {timeline.map((item, index) => {
              const Icon = item.icon;
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex ${
                    isLeft
                      ? "lg:justify-start"
                      : "lg:justify-end"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-6 top-8 z-10 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl lg:left-1/2">
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Card */}
                  <div
                    className={`ml-20 w-full rounded-3xl border border-slate-200 bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl lg:ml-0 lg:w-[46%] ${
                      isLeft ? "lg:mr-auto" : "lg:ml-auto"
                    }`}
                  >
                    <span className="inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">
                      {item.year}
                    </span>

                    <h3 className="mt-5 text-2xl font-bold text-slate-900">
                      {item.title}
                    </h3>

                    <p className="mt-4 leading-8 text-slate-600">
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