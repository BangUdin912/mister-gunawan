"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
} from "lucide-react";

interface ServicePackage {
  id: string;
  name: string;
  description: string;
  duration: string;
  participants: string;
  features: string[];
  featured?: boolean;
}

interface ServicePackageProps {
  packages: ServicePackage[];
}

export default function ServicePackage({
  packages,
}: ServicePackageProps) {
  if (packages.length === 0) {
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
            Paket Training
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
            Pilihan Program Training
          </h2>

          <p
            className="
              mt-6
              text-lg
              leading-8
              text-slate-600
            "
          >
            Pilih paket pelatihan yang paling sesuai dengan kebutuhan
            perusahaan, instansi, sekolah, maupun organisasi Anda.
          </p>
        </motion.div>

        {/* Packages */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {packages.map((item, index) => (
            <motion.div
              key={item.id}
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
                delay: index * 0.1,
              }}
              className={`
                relative
                overflow-hidden
                rounded-[2rem]
                border
                bg-white
                p-8
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-2xl
                ${
                  item.featured
                    ? "border-blue-600 shadow-xl"
                    : "border-slate-200 shadow-sm"
                }
              `}
            >
              {item.featured && (
                <span
                  className="
                    absolute
                    right-6
                    top-6
                    rounded-full
                    bg-blue-600
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    text-white
                  "
                >
                  Rekomendasi
                </span>
              )}

              <h3 className="text-3xl font-bold text-slate-900">
                {item.name}
              </h3>

              <p
                className="
                  mt-4
                  leading-7
                  text-slate-600
                "
              >
                {item.description}
              </p>

              <div
                className="
                  mt-8
                  rounded-2xl
                  bg-slate-50
                  p-5
                "
              >
                <div className="flex justify-between">
                  <span className="text-slate-500">
                    Durasi
                  </span>

                  <span className="font-semibold text-slate-900">
                    {item.duration}
                  </span>
                </div>

                <div className="mt-4 flex justify-between">
                  <span className="text-slate-500">
                    Peserta
                  </span>

                  <span className="font-semibold text-slate-900">
                    {item.participants}
                  </span>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                {item.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-start gap-3"
                  >
                    <div
                      className="
                        mt-0.5
                        flex
                        h-6
                        w-6
                        items-center
                        justify-center
                        rounded-full
                        bg-blue-100
                      "
                    >
                      <Check className="h-4 w-4 text-blue-600" />
                    </div>

                    <p className="text-slate-600">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>

              <Link
  href="/contact"
  className="
    mt-10
    flex
    w-full
    items-center
    justify-center
    gap-2
    rounded-xl
    bg-blue-600
    px-6
    py-3
    text-sm
    font-semibold
    text-white
    transition
    hover:bg-blue-700
  "
>
  Konsultasi Sekarang

  <ArrowRight className="h-4 w-4" />

</Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}