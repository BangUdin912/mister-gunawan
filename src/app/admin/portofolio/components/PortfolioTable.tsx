"use client";

import { useEffect, useMemo, useState } from "react";

import Link from "next/link";

import { Plus, Search } from "lucide-react";

import { portfolioService } from "@/lib/portofolioService";

import type { Portfolio } from "@/types/portfolio";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import PortfolioRow from "./PortfolioRow";

export default function PortfolioTable() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");

  async function loadData() {
    try {
      setLoading(true);

      const data = await portfolioService.getAll();

      setPortfolios(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const filteredData = useMemo(() => {
    const search = keyword.toLowerCase();

    return portfolios.filter((item) => {
      return (
        item.title.toLowerCase().includes(search) ||
        item.category.toLowerCase().includes(search) ||
        item.slug.toLowerCase().includes(search)
      );
    });
  }, [keyword, portfolios]);

  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <CardTitle>Portfolio</CardTitle>

        <Button asChild>
          <Link href="/admin/portofolio/create">
            <Plus className="mr-2 h-4 w-4" />
            Tambah Portofolio
          </Link>
        </Button>
      </CardHeader>

      <CardContent>
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Cari portfolio..."
            className="pl-10"
          />
        </div>

        <div className="overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Thumbnail</TableHead>
                <TableHead>Judul</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Jenis</TableHead>
                <TableHead>Lokasi</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">
                  Aksi
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableRow>
                  <td
                    colSpan={8}
                    className="py-10 text-center text-muted-foreground"
                  >
                    Memuat data...
                  </td>
                </TableRow>
              ) : filteredData.length === 0 ? (
                <TableRow>
                  <td
                    colSpan={8}
                    className="py-10 text-center text-muted-foreground"
                  >
                    Belum ada portfolio.
                  </td>
                </TableRow>
              ) : (
                filteredData.map((portfolio) => (
                  <PortfolioRow
                    key={portfolio.id}
                    portfolio={portfolio}
                    onDeleted={loadData}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}