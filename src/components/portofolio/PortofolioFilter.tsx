"use client";

import { Search, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PortfolioFilterProps {
  keyword: string;
  category: string;
  type: string;

  categories: string[];

  onKeywordChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onTypeChange: (value: string) => void;

  onReset: () => void;
}

export default function PortfolioFilter({
  keyword,
  category,
  type,
  categories,
  onKeywordChange,
  onCategoryChange,
  onTypeChange,
  onReset,
}: PortfolioFilterProps) {
  return (
    <section className="border-b bg-slate-50 py-10">
      <div className="mx-auto max-w-7xl px-6">

        <div className="grid gap-4 lg:grid-cols-4">

          {/* Search */}
          <div className="relative lg:col-span-2">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <Input
              value={keyword}
              onChange={(e) =>
                onKeywordChange(e.target.value)
              }
              placeholder="Cari kegiatan training..."
              className="h-12 pl-11"
            />
          </div>

          {/* Category */}
          <select
            value={category}
            onChange={(e) =>
              onCategoryChange(e.target.value)
            }
            className="h-12 rounded-lg border border-slate-300 bg-white px-4"
          >
            <option value="">
              Semua Kategori
            </option>

            {categories.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>

          {/* Type */}
          <select
            value={type}
            onChange={(e) =>
              onTypeChange(e.target.value)
            }
            className="h-12 rounded-lg border border-slate-300 bg-white px-4"
          >
            <option value="">
              Semua Dokumentasi
            </option>

            <option value="photo">
              Foto
            </option>

            <option value="youtube">
              Video YouTube
            </option>
          </select>

        </div>

        <div className="mt-5 flex justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={onReset}
          >
            <X className="mr-2 h-4 w-4" />
            Reset Filter
          </Button>
        </div>

      </div>
    </section>
  );
}