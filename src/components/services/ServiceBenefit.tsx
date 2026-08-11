"use client";

import { motion } from "framer-motion";

import {
  CheckCircle2,
  Sparkles,
} from "lucide-react";

interface ServiceBenefitProps {
  benefits?: string[];
}

const defaultBenefits = [
  "Meningkatkan kemampuan komunikasi yang efektif.",
  "Membangun kepercayaan diri saat berbicara di depan umum.",
  "Materi disesuaikan dengan kebutuhan peserta maupun perusahaan.",
  "Metode pembelajaran interaktif dan praktik langsung.",
  "Trainer berpengalaman dengan studi kasus nyata.",
  "Mendapatkan sertifikat keikutsertaan (opsional).",
];

export default function ServiceBenefit({
  benefits = defaultBenefits,
}: ServiceBenefitProps) {
  if (!benefits.length) {
    return null;
  }

  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}

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
            Benefit Training
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
            Manfaat yang Akan Diperoleh
          </h2>

          <p
            className="
              mt-6
              text-lg
              leading-8
              text-slate-600
            "
          >
            Program training dirancang agar peserta memperoleh
            pengalaman belajar yang aplikatif, meningkatkan
            kompetensi, dan mampu memberikan dampak positif
            bagi individu maupun organisasi.
          </p>
        </motion.div>

        {/* Benefit Grid */}

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {benefits.map(
            (benefit, index) => (
              <motion.div
                key={`${benefit}-${index}`}
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
                transition={{
                  delay: index * 0.08,
                }}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[2rem]
                  border
                  border-slate-200
                  bg-white
                  p-8
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:border-blue-200
                  hover:shadow-2xl
                "
              >
                {/* Decoration */}

                <div
                  className="
                    absolute
                    right-0
                    top-0
                    h-32
                    w-32
                    rounded-full
                    bg-blue-50
                    blur-3xl
                  "
                />

                <div className="relative">
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
                    <CheckCircle2
                      className="
                        h-8
                        w-8
                        text-blue-600
                        transition
                        group-hover:text-white
                      "
                    />
                  </div>

                  <div className="mt-8 flex items-start gap-3">
                    <Sparkles className="mt-1 h-5 w-5 shrink-0 text-blue-600" />

                    <p
                      className="
                        text-lg
                        leading-8
                        text-slate-700
                      "
                    >
                      {benefit}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
}