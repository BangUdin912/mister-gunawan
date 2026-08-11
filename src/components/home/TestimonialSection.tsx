"use client";

import Link from "next/link";
import { ArrowRight, Quote, Star } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "PT Maju Bersama",
    position: "HR Manager",
    message:
      "Training yang dibawakan Mister Gunawan sangat interaktif, komunikatif, dan mampu meningkatkan semangat seluruh peserta. Materi mudah dipahami serta langsung dapat diterapkan di lingkungan kerja.",
  },
  {
    id: 2,
    name: "Universitas ABC",
    position: "Ketua Panitia Seminar",
    message:
      "Public speaking yang luar biasa. Penyampaian materi sangat inspiratif dan mampu membuat peserta tetap fokus hingga akhir acara.",
  },
  {
    id: 3,
    name: "Instansi Pemerintah",
    position: "Kepala Bagian SDM",
    message:
      "Program training disusun sesuai kebutuhan instansi kami. Peserta merasa puas dan memperoleh banyak wawasan baru yang bermanfaat.",
  },
];

const videos = [
  {
    id: 1,
    title: "Training HSS #1",
    youtubeId: "H5vbY_0eeuQ",
  },
  {
    id: 2,
    title: "Training HSS #2",
    youtubeId: "hs-JNyvZiMA",
  },
  {
    id: 3,
    title: "Training HSS #3",
    youtubeId: "5lYupzb-JR8",
  },
  {
    id: 4,
    title: "Training HSS #4",
    youtubeId: "kF0mereF6BE",
  },
];

export default function TestimonialSection() {
  return (
    <section className="bg-gradient-to-b from-white to-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            Testimoni Klien
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900 lg:text-5xl">
            Apa Kata Klien Kami?
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Kepuasan peserta merupakan prioritas kami. Berikut pengalaman
            perusahaan, instansi, dan peserta yang telah mengikuti
            program training bersama Hartawan Sukses Sejahtera.
          </p>
        </motion.div>

        {/* Testimonial */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * .15,
              }}
              className="
                rounded-3xl
                border
                border-slate-200
                bg-white
                p-8
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-blue-200
                hover:shadow-xl
              "
            >
              <Quote className="h-10 w-10 text-blue-600" />

              <div className="mt-6 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="mt-6 leading-8 text-slate-600">
                "{item.message}"
              </p>

              <div className="mt-8 border-t pt-6">
                <h3 className="font-bold text-slate-900">
                  {item.name}
                </h3>

                <p className="text-sm text-slate-500">
                  {item.position}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Video */}
        <div className="mt-24">
          

          <div className="mt-12 flex flex-wrap justify-center gap-8">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * .1,
                }}
                className="
                  w-[220px]
                  overflow-hidden
                  rounded-3xl
                  border
                  border-slate-200
                  bg-white
                  shadow-lg
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:border-blue-200
                  hover:shadow-2xl
                "
              >
                <div className="aspect-[9/16]">
                  <iframe
                    className="h-full w-full"
                    src={`https://www.youtube.com/embed/${video.youtubeId}?rel=0`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>

                <div className="border-t p-4">
                  <h4 className="line-clamp-2 text-sm font-semibold text-slate-800">
                    {video.title}
                  </h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: .2 }}
          className="
            mt-24
            rounded-3xl
            bg-gradient-to-r
            from-blue-600
            to-blue-700
            px-10
            py-14
            text-center
            text-white
            shadow-xl
          "
        >
          <h3 className="text-3xl font-bold">
            Siap Meningkatkan Kompetensi Tim Anda?
          </h3>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-blue-100">
            Konsultasikan kebutuhan training, seminar, workshop,
            maupun public speaking bersama Hartawan Sukses Sejahtera.
            Kami siap membantu menyusun program terbaik sesuai kebutuhan Anda.
          </p>

          <Link
            href="/contact"
            className="
              mt-8
              inline-flex
              items-center
              gap-3
              rounded-xl
              bg-white
              px-8
              py-4
              font-semibold
              text-blue-700
              transition-all
              duration-300
              hover:-translate-y-1
              hover:bg-slate-100
              hover:shadow-lg
            "
          >
            Konsultasi Sekarang
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}