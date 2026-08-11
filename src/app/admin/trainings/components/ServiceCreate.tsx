"use client";

import ServiceForm from "./ServiceForm";

export default function ServiceCreate() {
  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Tambah Training
        </h1>

        <p className="mt-2 max-w-2xl text-sm text-slate-500">
          Tambahkan paket training baru yang akan ditampilkan
          pada halaman Services website Mister Gunawan.
        </p>
      </header>

      <ServiceForm />
    </section>
  );
}