"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

interface ServiceContentProps {
  title: string;
  description: string;
  objectives: string[];
  benefits: string[];
}

export default function ServiceContent({
  title,
  description,
  objectives,
  benefits,
}: ServiceContentProps) {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-3 lg:px-8">
        {/* Main Content */}
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
          className="lg:col-span-2"
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
            Deskripsi Program
          </span>

          <h2
            className="
              mt-6
              text-4xl
              font-bold
              leading-tight
              text-slate-900
            "
          >
            {title}
          </h2>

          <div
            className="
              mt-8
              space-y-6
              text-lg
              leading-8
              text-slate-600
            "
          >
            <p>{description}</p>
          </div>

          {/* Objectives */}
          <div className="mt-14">
            <h3 className="text-2xl font-bold text-slate-900">
              Tujuan Training
            </h3>

            <div className="mt-8 space-y-5">
              {objectives.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-4"
                >
                  <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-blue-600" />

                  <p className="leading-8 text-slate-600">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Sidebar */}
        <motion.aside
          initial={{
            opacity: 0,
            x: 30,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
          }}
          className="space-y-8"
        >
          {/* Benefits */}
          <div
            className="
              rounded-[2rem]
              border
              border-slate-200
              bg-slate-50
              p-8
            "
          >
            <h3 className="text-2xl font-bold text-slate-900">
              Manfaat Training
            </h3>

            <div className="mt-8 space-y-5">
              {benefits.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-blue-600" />

                  <p className="leading-7 text-slate-600">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div
            className="
              rounded-[2rem]
              bg-blue-600
              p-8
              text-white
            "
          >
            <h3 className="text-2xl font-bold">
              Konsultasikan Kebutuhan Training Anda
            </h3>

            <p className="mt-4 leading-8 text-blue-100">
              Tim Hartawan Sukses Sejahtera siap membantu
              merancang program pelatihan yang sesuai dengan
              kebutuhan perusahaan, instansi, maupun organisasi
              Anda.
            </p>

<Link
  href="/contact"
  className="
    mt-8
    flex
    w-full
    items-center
    justify-center
    gap-2
    rounded-xl
    bg-white
    px-6
    py-3
    font-semibold
    text-blue-600
    transition
    hover:bg-slate-100
  "
>
  Hubungi Kami

  <ArrowRight className="h-4 w-4" />
</Link>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}