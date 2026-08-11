"use client";

import {
  motion,
} from "framer-motion";


import type {
  Service,
} from "@/types/service";


import ServiceCard from "./ServiceCard";



interface ServiceGridProps {

  services: Service[];

}



export default function ServiceGrid({
  services,
}:ServiceGridProps){



  if(!services.length){

    return (

      <section className="py-12">

        <div
          className="
            rounded-[2rem]
            border
            border-dashed
            border-slate-300
            bg-slate-50
            px-8
            py-20
            text-center
          "
        >

          <h3
            className="
              text-2xl
              font-bold
              text-slate-900
            "
          >

            Layanan Belum Tersedia

          </h3>


          <p
            className="
              mt-3
              text-slate-600
            "
          >

            Saat ini belum ada training
            yang dapat ditampilkan.

          </p>


        </div>

      </section>

    );

  }





  return (

    <section>


      <motion.div

        initial={{
          opacity:0,
          y:30,
        }}

        whileInView={{
          opacity:1,
          y:0,
        }}

        viewport={{
          once:true,
          amount:0.2,
        }}

        transition={{
          duration:0.5,
        }}

        className="
          grid
          gap-8
          sm:grid-cols-2
          xl:grid-cols-3
        "

      >


        {
          services.map(
            (service,index)=>(

              <motion.div

                key={
                  service.id
                }

                initial={{
                  opacity:0,
                  y:20,
                }}

                whileInView={{
                  opacity:1,
                  y:0,
                }}

                viewport={{
                  once:true,
                }}

                transition={{
                  delay:index * 0.08,
                  duration:0.4,
                }}

              >

                <ServiceCard
                  service={service}
                />

              </motion.div>

            )
          )
        }


      </motion.div>


    </section>

  );

}