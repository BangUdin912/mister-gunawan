"use client";

import Link from "next/link";
import { ArrowRight, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question:
      "Apa saja layanan yang disediakan Hartawan Sukses Sejahtera (HSS)?",
    answer:
      "HSS menyediakan Professional Training, Public Speaking, Motivation Training, Leadership Development, Service Excellence, Consultant Training, serta berbagai program pengembangan SDM yang dapat disesuaikan dengan kebutuhan perusahaan maupun individu.",
  },
  {
    question:
      "Apakah training dapat disesuaikan dengan kebutuhan perusahaan?",
    answer:
      "Ya. Seluruh materi training dapat disesuaikan dengan kebutuhan perusahaan, instansi pemerintah, sekolah, universitas, organisasi maupun komunitas agar hasil yang diperoleh lebih maksimal.",
  },
  {
    question:
      "Apakah HSS melayani training di seluruh Indonesia?",
    answer:
      "Ya. HSS melayani kegiatan training, seminar, workshop, public speaking, hingga motivasi di berbagai kota di Indonesia, baik secara offline maupun online.",
  },
  {
    question:
      "Bagaimana cara melakukan konsultasi sebelum training?",
    answer:
      "Anda dapat menghubungi kami melalui WhatsApp atau mengisi formulir pada halaman Contact. Tim HSS akan membantu menentukan program yang paling sesuai dengan kebutuhan Anda.",
  },
  {
    question:
      "Apakah peserta mendapatkan sertifikat?",
    answer:
      "Ya. Peserta akan memperoleh sertifikat sesuai dengan program training yang diikuti apabila paket yang dipilih menyertakan sertifikasi.",
  },
  {
    question:
      "Apakah tersedia paket training untuk individu?",
    answer:
      "Tersedia. Selain program corporate training, HSS juga menyediakan paket pelatihan untuk perorangan yang ingin meningkatkan kompetensi pribadi maupun profesional.",
  },
];

export default function FAQSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white py-24">
      <div className="mx-auto max-w-5xl px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .5 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-700">
            <HelpCircle className="h-4 w-4" />
            Frequently Asked Questions
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900 lg:text-5xl">
            Pertanyaan yang Sering Diajukan
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Temukan jawaban mengenai layanan training, public speaking,
            leadership, motivasi, konsultasi, serta pengembangan SDM
            dari Hartawan Sukses Sejahtera.
          </p>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: .2 }}
          className="mt-16"
        >
          <Accordion
  defaultValue={["item-0"]}
  className="space-y-5"
>
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="
                  overflow-hidden
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  shadow-sm
                  transition-all
                  duration-300
                  hover:border-blue-300
                  hover:shadow-xl
                "
              >
                <AccordionTrigger className="px-7 py-6 hover:no-underline">
                  <div className="flex items-center gap-5 text-left">

                    <div
                      className="
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-blue-600
                        font-bold
                        text-white
                      "
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <span className="text-lg font-semibold text-slate-900">
                      {faq.question}
                    </span>

                  </div>
                </AccordionTrigger>

                <AccordionContent className="px-7 pb-7 pl-[92px] text-[16px] leading-8 text-slate-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: .3 }}
          className="
            mt-20
            rounded-3xl
            bg-gradient-to-r
            from-blue-600
            to-blue-700
            p-10
            text-center
            text-white
            shadow-2xl
          "
        >
          <h3 className="text-3xl font-bold">
            Masih Memiliki Pertanyaan?
          </h3>

          <p className="mx-auto mt-4 max-w-2xl text-blue-100">
            Tim Hartawan Sukses Sejahtera siap membantu Anda memilih
            program training yang paling sesuai dengan kebutuhan
            perusahaan maupun pengembangan diri.
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
              hover:shadow-xl
            "
          >
            Hubungi Kami
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}