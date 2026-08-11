import type { Metadata } from "next";

import ServiceTable from "./components/ServiceTable";


export const metadata: Metadata = {

  title: "Data Training | Admin",

  description:
    "Kelola seluruh data training Mister Gunawan yang ditampilkan pada halaman Services website.",

};



export default function AdminTrainingPage() {

  return (

    <section
      className="
        space-y-6
      "
    >

      <ServiceTable />

    </section>

  );

}