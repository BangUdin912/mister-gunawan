"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { portfolioService } from "@/lib/portofolioService";

import type {
  Portfolio,
  PortfolioPayload,
} from "@/types/portfolio";

import PortfolioForm from "./PortfolioForm";

interface PortfolioEditProps {
  id: string;
}

export default function PortfolioEdit({
  id,
}: PortfolioEditProps) {
  const router = useRouter();

  const [portfolio, setPortfolio] =
    useState<Portfolio | null>(null);

  const [loading, setLoading] =
    useState(true);

  async function loadPortfolio() {
    try {
      const data =
        await portfolioService.getById(id);

      setPortfolio(data);
    } catch (error) {
      console.error(error);

      toast.error(
        "Gagal memuat data portfolio."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPortfolio();
  }, [id]);

  async function handleSubmit(
    values: PortfolioPayload
  ) {
    try {
      setLoading(true);

      await portfolioService.update(
        id,
        values
      );

      toast.success(
        "Portfolio berhasil diperbarui."
      );

      router.push("/admin/portofolio");
      router.refresh();
    } catch (error) {
      console.error(error);

      toast.error(
        "Gagal memperbarui portfolio."
      );
    } finally {
      setLoading(false);
    }
  }

  if (loading && !portfolio) {
    return (
      <div className="flex h-40 items-center justify-center">
        Memuat data...
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="flex h-40 items-center justify-center">
        Portfolio tidak ditemukan.
      </div>
    );
  }

  return (
    <PortfolioForm
      initialData={portfolio}
      loading={loading}
      onSubmit={handleSubmit}
    />
  );
}