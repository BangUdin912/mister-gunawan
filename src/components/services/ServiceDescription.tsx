"use client";

import { motion } from "framer-motion";

interface ServiceDescriptionProps {
  title: string;
  description: string;
}

export default function ServiceDescription({
  title,
  description,
}: ServiceDescriptionProps) {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
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
        >
          {/* Badge */}

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
            Tentang Training
          </span>

          {/* Title */}

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 lg:text-5xl">
            {title}
          </h2>

          {/* Description */}

          <div
            className="
              mt-8
              rounded-[2rem]
              border
              border-slate-200
              bg-white
              p-8
              shadow-sm
              lg:p-10
            "
          >
            <div
              className="
                whitespace-pre-line
                text-lg
                leading-9
                text-slate-600
              "
            >
              {description}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}