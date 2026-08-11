"use client";

import { motion } from "framer-motion";

import ContactInformation from "./ContactInformation";
import ContactForm from "./ContactForm";

export default function ContactSection() {
  return (
    <section
      id="contact-form"
      className="relative bg-slate-50 py-24"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="
            absolute
            -left-24
            top-10
            h-72
            w-72
            rounded-full
            bg-blue-100/60
            blur-3xl
          "
        />

        <div
          className="
            absolute
            -right-24
            bottom-0
            h-96
            w-96
            rounded-full
            bg-slate-200/60
            blur-3xl
          "
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{
            opacity: 0,
            y: 24,
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
            Mari Diskusikan Kebutuhan
            <span className="block text-blue-600">
              Pengembangan SDM Anda
            </span>
          </h2>

          <p
            className="
              mt-6
              text-lg
              leading-8
              text-slate-600
            "
          >
            Tim Hartawan Sukses Sejahtera siap membantu
            merancang program training yang sesuai dengan
            kebutuhan perusahaan, instansi, sekolah,
            maupun organisasi Anda.
          </p>
        </motion.div>

        {/* Content */}
        <div className="mt-16 grid gap-10 lg:grid-cols-5">
          {/* Left */}
          <motion.div
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
            className="lg:col-span-2"
          >
            <ContactInformation />
          </motion.div>

          {/* Right */}
          <motion.div
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
            className="lg:col-span-3"
          >
            <div
              className="
                rounded-[2rem]
                border
                border-slate-200
                bg-white
                p-8
                shadow-xl
                shadow-slate-200/50
                lg:p-10
              "
            >
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}