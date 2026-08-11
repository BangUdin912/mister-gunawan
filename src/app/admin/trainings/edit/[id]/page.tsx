import { notFound } from "next/navigation";

import {
  serviceService,
} from "@/lib/serviceService";

import ServiceForm from "../../components/ServiceForm";


interface Props {
  params: Promise<{
    id: string;
  }>;
}



export default async function EditTrainingPage({
  params,
}: Props) {


  const {
    id,
  } = await params;



  const service =
    await serviceService.getById(id);



  if (!service) {

    notFound();

  }



  return (

    <section className="space-y-6">


      <header>

        <h1
          className="
            text-2xl
            font-bold
            tracking-tight
            text-slate-900
          "
        >
          Edit Training
        </h1>


        <p
          className="
            mt-2
            text-sm
            text-slate-500
          "
        >
          Perbarui data paket training
          Mister Gunawan.
        </p>


      </header>





      <div
        className="
          rounded-xl
          border
          border-slate-200
          bg-white
          p-6
          shadow-sm
        "
      >

        <ServiceForm
          service={service}
        />


      </div>


    </section>

  );

}