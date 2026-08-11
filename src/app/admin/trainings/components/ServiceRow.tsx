"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useState,
} from "react";

import {
  CheckCircle2,
  Monitor,
  Pencil,
  Star,
  Trash2,
  Users,
  XCircle,
} from "lucide-react";

import type {
  Service,
} from "@/types/service";

import {
  Button,
} from "@/components/ui/button";

import ServiceDeleteDialog from "./ServiceDeleteDialog";


interface Props {
  service: Service;
  onDeleted: () => void;
}


export default function ServiceRow({
  service,
  onDeleted,
}: Props) {


  const [
    imageError,
    setImageError,
  ] = useState(false);



  return (

    <tr
      className="
        border-b
        border-slate-200
        transition-colors
        hover:bg-slate-50/80
      "
    >


      {/* TRAINING */}

      <td className="px-6 py-5">

        <div className="flex items-center gap-4">


          {/* IMAGE */}

          <div
            className="
              relative
              h-16
              w-24
              shrink-0
              overflow-hidden
              rounded-xl
              border
              bg-slate-100
            "
          >

            {
              service.thumbnail &&
              !imageError
              ? (

                <img
  src={service.thumbnail}
  alt={service.title}
  className="h-full w-full object-cover"
/>

              )
              :
              (

                <div
                  className="
                    flex
                    h-full
                    items-center
                    justify-center
                    text-xs
                    font-medium
                    text-slate-400
                  "
                >
                  No Image
                </div>

              )

            }

          </div>





          <div className="min-w-0 max-w-sm">


            <h3
              className="
                truncate
                text-sm
                font-semibold
                text-slate-900
              "
            >
              {service.title}
            </h3>



            <p
              className="
                mt-1
                line-clamp-2
                text-sm
                text-slate-500
              "
            >
              {service.short_description || "-"}
            </p>


          </div>


        </div>


      </td>







      {/* KEGIATAN */}

      <td className="px-6 py-5 text-center">

        {
          service.activity_type === "online"
          ? (

            <span
              className="
                inline-flex
                items-center
                gap-1
                rounded-full
                border
                border-blue-200
                bg-blue-50
                px-3
                py-1
                text-xs
                font-semibold
                text-blue-700
              "
            >

              <Monitor className="h-3.5 w-3.5" />

              Online

            </span>

          )
          :
          service.activity_type === "offline"
          ? (

            <span
              className="
                inline-flex
                items-center
                gap-1
                rounded-full
                border
                border-purple-200
                bg-purple-50
                px-3
                py-1
                text-xs
                font-semibold
                text-purple-700
              "
            >

              <Users className="h-3.5 w-3.5" />

              Offline

            </span>

          )
          :
          (

            <span className="text-sm text-slate-400">
              -
            </span>

          )

        }

      </td>








      {/* PAKET */}

      <td className="px-6 py-5 text-center">

        {
          service.package_type === "personal"
          ? (

            <span
              className="
                inline-flex
                rounded-full
                border
                border-slate-200
                bg-slate-50
                px-3
                py-1
                text-xs
                font-semibold
                text-slate-700
              "
            >
              Perorangan
            </span>

          )
          :
          service.package_type === "event"
          ? (

            <span
              className="
                inline-flex
                rounded-full
                border
                border-orange-200
                bg-orange-50
                px-3
                py-1
                text-xs
                font-semibold
                text-orange-700
              "
            >
              Per-acara
            </span>

          )
          :
          (

            <span className="text-sm text-slate-400">
              -
            </span>

          )

        }

      </td>







      {/* STATUS */}

      <td className="px-6 py-5 text-center">

        {
          service.is_active
          ? (

            <span
              className="
                inline-flex
                items-center
                gap-1
                rounded-full
                border
                border-green-200
                bg-green-50
                px-3
                py-1
                text-xs
                font-semibold
                text-green-700
              "
            >

              <CheckCircle2 className="h-3.5 w-3.5"/>

              Aktif

            </span>

          )
          :
          (

            <span
              className="
                inline-flex
                items-center
                gap-1
                rounded-full
                border
                border-red-200
                bg-red-50
                px-3
                py-1
                text-xs
                font-semibold
                text-red-700
              "
            >

              <XCircle className="h-3.5 w-3.5"/>

              Nonaktif

            </span>

          )

        }

      </td>








      {/* FEATURED */}

      <td className="px-6 py-5 text-center">

        {
          service.featured
          ? (

            <span
              className="
                inline-flex
                items-center
                gap-1
                rounded-full
                border
                border-yellow-200
                bg-yellow-50
                px-3
                py-1
                text-xs
                font-semibold
                text-yellow-700
              "
            >

              <Star
                className="
                  h-3.5
                  w-3.5
                  fill-current
                "
              />

              Featured

            </span>

          )
          :
          (

            <span className="text-sm text-slate-400">
              -
            </span>

          )

        }

      </td>








      {/* ACTION */}

      <td className="px-6 py-5">

        <div className="flex justify-center gap-2">


          <Link
            href={`/admin/trainings/edit/${service.id}`}
          >

            <Button

              variant="outline"

              size="icon"

              className="
                h-9
                w-9
                rounded-lg
                border-slate-200
                hover:border-blue-500
                hover:bg-blue-50
                hover:text-blue-600
              "

            >

              <Pencil className="h-4 w-4"/>

            </Button>


          </Link>





          <ServiceDeleteDialog

            service={service}

            onDeleted={onDeleted}

            trigger={

              <Button

                variant="destructive"

                size="icon"

                className="
                  h-9
                  w-9
                  rounded-lg
                "

              >

                <Trash2 className="h-4 w-4"/>

              </Button>

            }

          />


        </div>


      </td>


    </tr>

  );

}