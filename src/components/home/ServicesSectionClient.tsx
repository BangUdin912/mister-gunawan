"use client";

import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  MessageCircle,
} from "lucide-react";

import { motion } from "framer-motion";

import type {
  Service,
} from "@/types/service";


interface Props {
  services: Service[];
}


export default function ServicesSectionClient({
  services,
}: Props) {

  return (
    <section className="bg-slate-50 py-24">

      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.5,
          }}
          className="mx-auto max-w-3xl text-center"
        >

          <span
            className="
              rounded-full
              bg-blue-100
              px-4
              py-2
              text-sm
              font-semibold
              text-blue-700
            "
          >
            Layanan Kami
          </span>


          <h2
            className="
              mt-6
              text-4xl
              font-bold
              text-slate-900
              lg:text-5xl
            "
          >
            Program Training Profesional
          </h2>


          <p
            className="
              mt-6
              text-lg
              leading-8
              text-slate-600
            "
          >
            Berbagai layanan training yang dirancang
            untuk meningkatkan kompetensi individu,
            perusahaan, instansi pemerintah,
            sekolah, universitas maupun organisasi.
          </p>

        </motion.div>



        {/* Service Cards */}

        <div
          className="
            mt-16
            flex
            flex-wrap
            justify-center
            gap-8
          "
        >

          {services.map(
            (service, index) => (

              <motion.div
                key={service.id}

                initial={{
                  opacity: 0,
                  y: 25,
                }}

                whileInView={{
                  opacity: 1,
                  y: 0,
                }}

                viewport={{
                  once: true,
                }}

                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                }}

                className="
                  w-full
                  sm:w-[calc(50%-16px)]
                  lg:w-[calc(33.333%-22px)]
                  xl:w-[calc(25%-24px)]
                "
              >


                <div
                  className="
                    group
                    flex
                    h-full
                    flex-col
                    overflow-hidden
                    rounded-3xl
                    border
                    border-slate-200
                    bg-white
                    transition-all
                    duration-300
                    hover:-translate-y-2
                    hover:border-blue-200
                    hover:shadow-2xl
                  "
                >


                  {/* Thumbnail */}

                  <Link
                    href={`/services/${service.slug}`}
                  >

                    <div
                      className="
                        relative
                        h-56
                        overflow-hidden
                      "
                    >

                      <Image
                        src={
                          service.thumbnail ||
                          "/images/placeholder.jpg"
                        }

                        alt={service.title}

                        fill

                        className="
                          object-cover
                          transition
                          duration-700
                          group-hover:scale-110
                        "
                      />


                      <div
                        className="
                          absolute
                          inset-0
                          bg-gradient-to-t
                          from-slate-950/90
                          via-slate-900/20
                          to-transparent
                        "
                      />


                      <div
                        className="
                          absolute
                          left-5
                          top-5
                          rounded-full
                          bg-white/90
                          px-3
                          py-1
                          text-xs
                          font-semibold
                          text-blue-700
                          backdrop-blur
                        "
                      >
                        Training Profesional
                      </div>


                      <div
                        className="
                          absolute
                          bottom-5
                          left-5
                          right-5
                        "
                      >

                        <h3
                          className="
                            text-2xl
                            font-bold
                            leading-tight
                            text-white
                          "
                        >
                          {service.title}
                        </h3>

                      </div>


                    </div>

                  </Link>



                  {/* Content */}

                  <div
                    className="
                      flex
                      flex-1
                      flex-col
                      p-6
                    "
                  >


                    <p
                      className="
                        flex-1
                        leading-7
                        text-slate-600
                      "
                    >
                      {
                        service.short_description
                      }
                    </p>



                    <div
                      className="
                        mt-6
                        flex
                        items-center
                        gap-2
                        text-sm
                        text-slate-500
                      "
                    >

                      <span
                        className="
                          h-2
                          w-2
                          rounded-full
                          bg-blue-600
                        "
                      />

                      Materi dapat disesuaikan
                      dengan kebutuhan peserta.

                    </div>




                    {/* Button */}

                    <div
                      className="
                        mt-8
                        flex
                        gap-3
                      "
                    >

                      <Link
                        href={`/services/${service.slug}`}

                        className="
                          flex
                          flex-1
                          items-center
                          justify-center
                          gap-2
                          rounded-xl
                          bg-blue-600
                          px-5
                          py-3
                          font-semibold
                          text-white
                          transition
                          hover:bg-blue-700
                        "
                      >

                        Detail Layanan

                        <ArrowRight
                          className="h-5 w-5"
                        />

                      </Link>



                      <Link
                        href={`/contact?service=${service.slug}`}

                        className="
                          flex
                          h-12
                          w-12
                          items-center
                          justify-center
                          rounded-xl
                          border
                          border-blue-600
                          text-blue-600
                          transition
                          hover:bg-blue-50
                        "

                        title="Konsultasi"
                      >

                        <MessageCircle
                          className="h-5 w-5"
                        />

                      </Link>


                    </div>


                  </div>


                </div>


              </motion.div>

            )
          )}

        </div>




        {/* CTA */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}

          whileInView={{
            opacity: 1,
            y: 0,
          }}

          viewport={{
            once: true,
          }}

          transition={{
            duration: 0.5,
            delay: 0.2,
          }}

          className="
            mt-20
            text-center
          "
        >

          <Link
            href="/services"

            className="
              inline-flex
              items-center
              gap-3
              rounded-xl
              bg-blue-600
              px-8
              py-4
              font-semibold
              text-white
              transition
              hover:bg-blue-700
            "
          >

            Lihat Semua Layanan

            <ArrowRight
              className="h-5 w-5"
            />

          </Link>


        </motion.div>


      </div>

    </section>
  );
}