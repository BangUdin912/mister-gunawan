"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import Link from "next/link";

import {
  Loader2,
  Plus,
  Search,
} from "lucide-react";

import type { Service } from "@/types/service";

import {
  serviceService,
} from "@/lib/serviceService";

import {
  Button,
} from "@/components/ui/button";

import {
  Input,
} from "@/components/ui/input";

import ServiceRow from "./ServiceRow";


export default function ServiceTable() {


  const [
    services,
    setServices,
  ] = useState<Service[]>([]);


  const [
    loading,
    setLoading,
  ] = useState(true);


  const [
    keyword,
    setKeyword,
  ] = useState("");



  async function loadServices() {

    try {

      setLoading(true);

      const data =
        await serviceService.getAll();

      setServices(data);


    } catch(error) {

      console.error(
        "Load services error:",
        error
      );


    } finally {

      setLoading(false);

    }

  }




  useEffect(() => {

    loadServices();

  }, []);





  const filtered =
    useMemo(() => {


      if(!keyword.trim())
        return services;



      const search =
        keyword.toLowerCase();



      return services.filter(
        (service)=>{


          const values = [

            service.title,

            service.slug,

            service.short_description,

            service.activity_type,

            service.package_type,

          ];



          return values
            .filter(Boolean)
            .some(
              (value)=>
                value!
                .toLowerCase()
                .includes(search)
            );


        }
      );


    },[
      services,
      keyword
    ]);







  return (

    <div className="space-y-8">


      {/* HEADER */}

      <div
        className="
          flex
          flex-col
          gap-5
          rounded-2xl
          border
          bg-white
          p-6
          shadow-sm
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >

        <div>

          <h1
            className="
              text-3xl
              font-bold
              text-slate-900
            "
          >
            Data Training
          </h1>


          <p
            className="
              mt-2
              text-slate-500
            "
          >
            Kelola seluruh paket training
            Mister Gunawan.
          </p>


        </div>



        <Link
          href="/admin/trainings/create"
        >

          <Button
            className="
              rounded-xl
              bg-blue-600
              hover:bg-blue-700
            "
          >

            <Plus
              className="
                mr-2
                h-4
                w-4
              "
            />

            Tambah Training

          </Button>

        </Link>


      </div>





      {/* SEARCH */}

      <div
        className="
          relative
          max-w-lg
        "
      >

        <Search
          className="
            absolute
            left-4
            top-1/2
            h-5
            w-5
            -translate-y-1/2
            text-slate-400
          "
        />


        <Input

          placeholder="Cari training..."

          value={keyword}

          onChange={(e)=>
            setKeyword(
              e.target.value
            )
          }

          className="
            h-12
            rounded-xl
            pl-12
          "

        />

      </div>







      {/* TABLE */}

      <div
        className="
          overflow-hidden
          rounded-2xl
          border
          bg-white
          shadow-sm
        "
      >

        <div
          className="
            overflow-x-auto
          "
        >

          <table
            className="
              min-w-full
            "
          >


            <thead
              className="
                border-b
                bg-slate-50
              "
            >

              <tr>


                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
                  Training
                </th>


                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
                  Kegiatan
                </th>


                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
                  Paket
                </th>


                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
                  Status
                </th>


                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
                  Featured
                </th>


                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
                  Aksi
                </th>


              </tr>


            </thead>






            <tbody
              className="
                divide-y
              "
            >


              {
                loading ? (

                  <tr>

                    <td
                      colSpan={6}
                      className="
                        py-24
                        text-center
                      "
                    >

                      <Loader2
                        className="
                          mx-auto
                          h-8
                          w-8
                          animate-spin
                          text-blue-600
                        "
                      />

                    </td>

                  </tr>


                ) : filtered.length === 0 ? (


                  <tr>

                    <td
                      colSpan={6}
                      className="
                        py-20
                        text-center
                        text-slate-500
                      "
                    >

                      Belum ada data training.

                    </td>


                  </tr>


                ) : (


                  filtered.map(
                    (service)=>(

                      <ServiceRow

                        key={
                          service.id
                        }

                        service={
                          service
                        }

                        onDeleted={
                          loadServices
                        }

                      />

                    )
                  )


                )

              }


            </tbody>


          </table>


        </div>


      </div>


    </div>

  );

}