"use client";

import { motion } from "framer-motion";


export default function ProfileHss() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-gradient-to-b
        from-white
        via-slate-50
        to-white
        py-28
      "
    >

      {/* Decorative Background */}
      <div
        className="
          absolute
          left-0
          top-20
          h-72
          w-72
          rounded-full
          bg-blue-100/40
          blur-3xl
        "
      />

      <div
        className="
          absolute
          bottom-0
          right-0
          h-80
          w-80
          rounded-full
          bg-blue-200/30
          blur-3xl
        "
      />



      <div
        className="
          relative
          mx-auto
          max-w-7xl
          px-6
          lg:px-8
        "
      >


        {/* Heading */}
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
          }}
          className="
            mx-auto
            max-w-3xl
            text-center
          "
        >

          <span
            className="
              inline-flex
              rounded-full
              border
              border-blue-200
              bg-blue-50
              px-5
              py-2
              text-sm
              font-semibold
              tracking-wide
              text-blue-700
            "
          >
            Professional Training Company
          </span>



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
            Hartawan Sukses Sejahtera
          </h2>




          <p
            className="
              mt-6
              text-lg
              leading-8
              text-slate-600
            "
          >
            Partner profesional dalam pengembangan kompetensi,
            karakter, dan kualitas sumber daya manusia.
          </p>


        </motion.div>






        {/* Profile HSS */}
        <motion.div
          initial={{
            opacity:0,
            y:40,
          }}
          whileInView={{
            opacity:1,
            y:0,
          }}
          viewport={{
            once:true,
          }}
          className="
            mt-14
            rounded-[2rem]
            border
            border-slate-200
            bg-white
            p-8
            shadow-xl
            shadow-slate-200/50
            lg:p-14
          "
        >

          <div
            className="
              mx-auto
              max-w-5xl
            "
          >

            <p
              className="
                text-lg
                leading-8
                text-slate-600
              "
            >

              <strong className="text-slate-900">
                Hartawan Sukses Sejahtera (HSS)
              </strong>{" "}
              didirikan oleh{" "}
              <strong className="text-slate-900">
                Mister Gunawan
              </strong>{" "}
              sebagai wadah profesional yang berfokus pada
              pengembangan sumber daya manusia bagi perusahaan,
              instansi, dan organisasi.

            </p>



            <p
              className="
                mt-6
                text-lg
                leading-8
                text-slate-600
              "
            >

              Dengan pengalaman lebih dari{" "}
              <strong className="text-blue-600">
                12 tahun
              </strong>{" "}
              dalam bidang housekeeping, service excellence,
              soft skill, dan leadership, HSS menghadirkan
              program training yang aplikatif, terukur,
              dan sesuai kebutuhan dunia kerja.

            </p>




            <p
              className="
                mt-6
                text-lg
                leading-8
                text-slate-600
              "
            >

              Setiap program dirancang secara{" "}
              <strong className="text-slate-900">
                customized
              </strong>{" "}
              melalui metode interaktif, studi kasus,
              dan simulasi nyata agar peserta mampu
              menerapkan kompetensi secara langsung.

            </p>


          </div>


        </motion.div>







        {/* Vision Mission */}

        <div
          className="
            mt-14
            grid
            gap-8
            lg:grid-cols-2
          "
        >

          {[
            {
              title:"Visi",
              text:
              "Menjadi lembaga training profesional terpercaya dalam mencetak sumber daya manusia unggul, berkarakter, dan siap menghadapi perkembangan dunia kerja."
            },
            {
              title:"Misi",
              text:
              "Memberikan solusi pengembangan SDM melalui program training berkualitas, meningkatkan kompetensi profesional, serta membantu organisasi mencapai performa terbaik."
            },
          ].map((item,index)=>(

            <motion.div
              key={item.title}
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
              }}
              transition={{
                delay:index * 0.15,
              }}
              className="
                group
                relative
                overflow-hidden
                rounded-[2rem]
                border
                border-slate-200
                bg-white
                p-10
                shadow-lg
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-2xl
              "
            >

              {/* Accent */}
              <div
                className="
                  absolute
                  left-0
                  top-0
                  h-full
                  w-1
                  bg-blue-600
                  opacity-0
                  transition
                  group-hover:opacity-100
                "
              />



              <h3
                className="
                  text-3xl
                  font-bold
                  text-slate-900
                "
              >
                {item.title}
              </h3>


              <div
                className="
                  mt-4
                  h-1
                  w-12
                  rounded-full
                  bg-blue-600
                "
              />



              <p
                className="
                  mt-6
                  text-lg
                  leading-8
                  text-slate-600
                "
              >
                {item.text}
              </p>


            </motion.div>

          ))}


        </div>


      </div>


    </section>
  );
}