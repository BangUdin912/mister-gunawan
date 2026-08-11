"use client";

import { useEffect, useState } from "react";

import { Loader2 } from "lucide-react";

import type { Service } from "@/types/service";
import { serviceService } from "@/lib/serviceService";

import ServiceForm from "./ServiceForm";

interface Props {
  id: string;
}

export default function ServiceEdit({
  id,
}: Props) {
  const [service, setService] =
    useState<Service | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    async function loadService() {
      try {
        setLoading(true);

        const data =
          await serviceService.getById(id);

        if (!data) {
          setError(
            "Data training tidak ditemukan."
          );

          return;
        }

        setService(data);
      } catch (err) {
        console.error(err);

        setError(
          "Terjadi kesalahan saat mengambil data."
        );
      } finally {
        setLoading(false);
      }
    }

    loadService();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
        <h2 className="text-lg font-semibold text-red-700">
          Gagal Memuat Data
        </h2>

        <p className="mt-2 text-sm text-red-600">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Edit Training
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Perbarui informasi training yang
          ditampilkan pada halaman Services.
        </p>
      </div>

      <ServiceForm service={service} />
    </div>
  );
}