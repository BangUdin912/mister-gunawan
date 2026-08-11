"use client";

import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import type {
  Service,
} from "@/types/service";


interface ServiceCardProps {
  service: Service;
}


export default function ServiceCard({
  service,
}: ServiceCardProps) {


  const description =
  service.short_description || "-";


  const image =
    service.thumbnail ||
    "/images/default-service.jpg";


  const packageLabel =
    service.package_type === "personal"
      ? "Perorangan"
      : service.package_type === "event"
      ? "Per-acara"
      : "Training";



  return (

    <motion.article

      whileHover={{
        y: -8,
      }}

      transition={{
        duration: 0.25,
      }}

      className="
        group
        overflow-hidden
        rounded-[2rem]
        border
        border-slate-200
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:border-blue-200
        hover:shadow-2xl
      "

    >



      {/* IMAGE */}

      <Link
        href={`/services/${service.slug}`}
        className="block"
      >

        <div
          className="
            relative
            aspect-[16/10]
            overflow-hidden
            bg-slate-100
          "
        >


<Image
  src={image}
  alt={service.title}
  fill
  sizes="
    (max-width:768px) 100vw,
    (max-width:1280px) 50vw,
    33vw
  "
  className="
    object-cover
    transition-transform
    duration-500
    group-hover:scale-105
  "
/>



          {/* Overlay */}

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-slate-950/70
              via-slate-900/10
              to-transparent
            "
          />



          {/* Badge */}

          <span
            className="
              absolute
              left-5
              top-5
              rounded-full
              bg-blue-600
              px-4
              py-2
              text-xs
              font-semibold
              tracking-wide
              text-white
            "
          >

            {packageLabel}

          </span>



        </div>


      </Link>





      {/* CONTENT */}


      <div
        className="
          p-7
        "
      >



        <h3

          className="
            line-clamp-2
            text-2xl
            font-bold
            text-slate-900
            transition-colors
            group-hover:text-blue-600
          "

        >

          {service.title}


        </h3>





        <p

          className="
            mt-4
            line-clamp-3
            leading-7
            text-slate-600
          "

        >

          {description}


        </p>







        {/* FOOTER */}


        <div

          className="
            mt-8
            flex
            items-center
            justify-between
            border-t
            border-slate-100
            pt-6
          "

        >



          <Link

            href={`/services/${service.slug}`}

            className="
              inline-flex
              items-center
              gap-2
              font-semibold
              text-blue-600
              transition
              hover:text-blue-700
            "

          >


            Selengkapnya



            <ArrowRight

              className="
                h-4
                w-4
                transition-transform
                duration-300
                group-hover:translate-x-1
              "

            />


          </Link>



        </div>



      </div>



    </motion.article>

  );

}