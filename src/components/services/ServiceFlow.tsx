"use client";

import { motion } from "framer-motion";
import { ArrowDown, CheckCircle2 } from "lucide-react";

interface ServiceFlowProps {
  flow: string[];
}

export default function ServiceFlow({
  flow,
}: ServiceFlowProps) {
  if (!flow?.length) {
    return null;
  }

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
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
            Alur Training
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
            Tahapan Pelaksanaan Training
          </h2>

          <p
            className="
              mt-6
              text-lg
              leading-8
              text-slate-600
            "
          >
            Setiap program training dilaksanakan melalui
            tahapan yang sistematis agar tujuan pembelajaran
            tercapai secara optimal.
          </p>
        </motion.div>

        {/* Timeline */}

        <div className="relative mt-20">
          <div
            className="
              absolute
              left-7
              top-0
              bottom-0
              hidden
              w-0.5
              bg-blue-100
              md:block
            "
          />

          <div className="space-y-10">
            {flow.map((step, index) => (
              <motion.div
                key={`${step}-${index}`}
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
                className="relative flex gap-6"
              >
                {/* Number */}

                <div
                  className="
                    relative
                    z-10
                    flex
                    h-14
                    w-14
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-blue-600
                    text-lg
                    font-bold
                    text-white
                    shadow-lg
                    shadow-blue-600/30
                  "
                >
                  {index + 1}
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
                    transition
                    duration-300
                    hover:-translate-y-1
                    hover:border-blue-200
                    hover:shadow-xl
                  "
                >
                  <div className="flex items-start gap-4">
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
                      <CheckCircle2 className="h-6 w-6 text-blue-600" />
                    </div>

                    <div>
                      <p className="text-xl font-semibold text-slate-900">
                        Tahap {index + 1}
                      </p>

                      <p
                        className="
                          mt-3
                          leading-8
                          text-slate-600
                        "
                      >
                        {step}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Arrow */}

                {index < flow.length - 1 && (
                  <div
                    className="
                      absolute
                      left-6
                      top-[78px]
                      hidden
                      md:block
                    "
                  >
                    <ArrowDown className="h-5 w-5 text-blue-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}