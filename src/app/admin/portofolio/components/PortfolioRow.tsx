"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Pencil } from "lucide-react";
import { toast } from "sonner";

import { portfolioService } from "@/lib/portofolioService";

import type { Portfolio } from "@/types/portfolio";

import {
  TableCell,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import PortfolioDeleteDialog from "./PortfolioDeleteDialog";

interface PortfolioRowProps {
  portfolio: Portfolio;
  onDeleted: () => void;
}

export default function PortfolioRow({
  portfolio,
  onDeleted,
}: PortfolioRowProps) {
  const router = useRouter();

  async function handleDelete() {
    try {
      await portfolioService.delete(portfolio.id);

      toast.success("Portfolio berhasil dihapus.");

      onDeleted();
    } catch (error) {
      console.error(error);

      toast.error("Gagal menghapus portfolio.");
    }
  }

  return (
    <TableRow>
      {/* Thumbnail */}
      <TableCell className="w-[110px]">
        {portfolio.thumbnail ? (
          <Image
            src={portfolio.thumbnail}
            alt={portfolio.title}
            width={80}
            height={60}
            className="h-[60px] w-[80px] rounded-md border object-cover"
          />
        ) : (
          <div className="flex h-[60px] w-[80px] items-center justify-center rounded-md border bg-muted text-xs text-muted-foreground">
            No Image
          </div>
        )}
      </TableCell>

      {/* Judul */}
      <TableCell>
        <div className="space-y-1">
          <p className="font-medium">{portfolio.title}</p>

          <p className="text-xs text-muted-foreground">
            {portfolio.slug}
          </p>
        </div>
      </TableCell>

      {/* Kategori */}
      <TableCell>{portfolio.category}</TableCell>

      {/* Jenis */}
      <TableCell>
        <Badge
          variant={
            portfolio.type === "photo"
              ? "default"
              : "secondary"
          }
        >
          {portfolio.type === "photo"
            ? "Foto"
            : "YouTube"}
        </Badge>
      </TableCell>

      {/* Lokasi */}
      <TableCell>
        {portfolio.location || "-"}
      </TableCell>

      {/* Featured */}
      <TableCell>
        <Badge
          variant={
            portfolio.featured
              ? "default"
              : "outline"
          }
        >
          {portfolio.featured ? "Ya" : "Tidak"}
        </Badge>
      </TableCell>

      {/* Status */}
      <TableCell>
        <Badge
          variant={
            portfolio.is_active
              ? "default"
              : "destructive"
          }
        >
          {portfolio.is_active
            ? "Aktif"
            : "Nonaktif"}
        </Badge>
      </TableCell>

      {/* Aksi */}
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            size="icon"
            variant="outline"
            onClick={() =>
              router.push(
                `/admin/portofolio/edit/${portfolio.id}`
              )
            }
          >
            <Pencil className="h-4 w-4" />
          </Button>

          <PortfolioDeleteDialog
            title={portfolio.title}
            onConfirm={handleDelete}
          />
        </div>
      </TableCell>
    </TableRow>
  );
}