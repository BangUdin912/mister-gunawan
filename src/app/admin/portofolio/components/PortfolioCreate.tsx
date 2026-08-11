"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { portfolioService } from "@/lib/portofolioService";

import type { PortfolioPayload } from "@/types/portfolio";

import PortfolioForm from "./PortfolioForm";

export default function PortfolioCreate() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    values: PortfolioPayload
  ) {
    try {
      setLoading(true);

      await portfolioService.create(values);

      toast.success(
        "Portfolio berhasil ditambahkan."
      );

      router.push("/admin/portofolio");
      router.refresh();
    } catch (error) {
      console.error(error);

      toast.error(
        "Gagal menambahkan portfolio."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <PortfolioForm
      loading={loading}
      onSubmit={handleSubmit}
    />
  );
}