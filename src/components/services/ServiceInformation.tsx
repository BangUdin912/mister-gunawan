"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  MapPin,
  User,
  Users,
  Tag,
} from "lucide-react";

interface ServiceInformationProps {
  category: string;
  duration: string;
  targetParticipants: string;
  location: string;
  trainer: string;
  method: string;
}

const informations = (
  props: ServiceInformationProps
) => [
  {
    label: "Kategori",
    value: props.category,
    icon: Tag,
  },
  {
    label: "Durasi",
    value: props.duration,
    icon: Clock3,
  },
  {
    label: "Target Peserta",
    value: props.targetParticipants,
    icon: Users,
  },
  {
    label: "Lokasi",
    value: props.location,
    icon: MapPin,
  },
  {
    label: "Trainer",
    value: props.trainer,
    icon: User,
  },
  {
    label: "Jadwal",
    value: props.method,
    icon: CalendarDays,
  },
];

export default function ServiceInformation(
  props: ServiceInformationProps
) {
  return (
    <section className="bg-white py-20">
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
          className="
            overflow-hidden
            rounded-[2rem]
            border
            border-slate-200
            bg-white
            shadow-lg
          "
        >
          {/* Header */}
          <div
            className="
              border-b
              border-slate-200
              px-8
              py-8
              lg:px-10
            "
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
              Informasi Layanan
            </span>

            <h2
              className="
                mt-5
                text-3xl
                font-bold
                text-slate-900
              "
            >
              Detail Program Training
            </h2>

            <p
              className="
                mt-3
                max-w-2xl
                leading-7
                text-slate-600
              "
            >
              Informasi umum mengenai program training yang
              diselenggarakan oleh Hartawan Sukses Sejahtera.
            </p>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3">
            {informations(props).map(
              (item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.label}
                    initial={{
                      opacity: 0,
                      y: 20,
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
                      flex
                      items-start
                      gap-4
                      border-b
                      border-r
                      border-slate-100
                      p-8
                      transition-colors
                      hover:bg-slate-50
                      last:border-r-0
                    "
                  >
                    <div
                      className="
                        flex
                        h-12
                        w-12
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-blue-100
                      "
                    >
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>

                    <div>
                      <p
                        className="
                          text-sm
                          font-medium
                          text-slate-500
                        "
                      >
                        {item.label}
                      </p>

                      <h3
                        className="
                          mt-2
                          text-lg
                          font-semibold
                          text-slate-900
                        "
                      >
                        {item.value}
                      </h3>
                    </div>
                  </motion.div>
                );
              }
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}