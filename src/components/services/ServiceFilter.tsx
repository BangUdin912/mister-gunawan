"use client";

import { Search, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ServiceFilterProps {
  keyword: string;
  category: string;
  categories: string[];
  onKeywordChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onReset: () => void;
}

export default function ServiceFilter({
  keyword,
  category,
  categories,
  onKeywordChange,
  onCategoryChange,
  onReset,
}: ServiceFilterProps) {
  return (
    <div
      className="
        mb-12
        rounded-[2rem]
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
      "
    >
      <div
        className="
          flex
          flex-col
          gap-5
          lg:flex-row
          lg:items-center
        "
      >
        {/* Search */}
        <div className="relative flex-1">
          <Search
            className="
              absolute
              left-4
              top-1/2
              h-5
              w-5
              -translate-y-1/2
              text-slate-400
            "
          />

          <Input
            value={keyword}
            onChange={(e) =>
              onKeywordChange(e.target.value)
            }
            placeholder="Cari layanan..."
            className="
              h-12
              rounded-xl
              border-slate-200
              pl-12
              focus-visible:ring-blue-500
            "
          />
        </div>

        {/* Category */}
        <select
          value={category}
          onChange={(e) =>
            onCategoryChange(e.target.value)
          }
          className="
            h-12
            rounded-xl
            border
            border-slate-200
            bg-white
            px-4
            text-sm
            font-medium
            text-slate-700
            outline-none
            transition
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-200
            lg:w-64
          "
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

        {/* Reset */}
        <Button
          type="button"
          variant="outline"
          onClick={onReset}
          className="
            h-12
            rounded-xl
            border-slate-200
          "
        >
          <X className="mr-2 h-4 w-4" />

          Reset
        </Button>
      </div>
    </div>
  );
}