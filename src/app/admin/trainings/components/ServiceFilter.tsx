"use client";

import { Search, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  keyword: string;
  status: "all" | "active" | "inactive";
  featured: "all" | "featured" | "normal";

  onKeywordChange: (value: string) => void;
  onStatusChange: (
    value: "all" | "active" | "inactive"
  ) => void;
  onFeaturedChange: (
    value: "all" | "featured" | "normal"
  ) => void;

  onReset: () => void;
}

export default function ServiceFilter({
  keyword,
  status,
  featured,
  onKeywordChange,
  onStatusChange,
  onFeaturedChange,
  onReset,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <div className="grid gap-4 lg:grid-cols-4">
        {/* Search */}
        <div className="relative lg:col-span-2">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <Input
            placeholder="Cari training..."
            value={keyword}
            onChange={(e) =>
              onKeywordChange(e.target.value)
            }
            className="pl-10"
          />
        </div>

        {/* Status */}
        <select
          value={status}
          onChange={(e) =>
            onStatusChange(
              e.target.value as
                | "all"
                | "active"
                | "inactive"
            )
          }
          className="
            h-10
            rounded-md
            border
            border-slate-300
            bg-white
            px-3
            text-sm
            outline-none
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-200
          "
        >
          <option value="all">
            Semua Status
          </option>

          <option value="active">
            Aktif
          </option>

          <option value="inactive">
            Nonaktif
          </option>
        </select>

        {/* Featured */}
        <div className="flex gap-2">
          <select
            value={featured}
            onChange={(e) =>
              onFeaturedChange(
                e.target.value as
                  | "all"
                  | "featured"
                  | "normal"
              )
            }
            className="
              flex-1
              rounded-md
              border
              border-slate-300
              bg-white
              px-3
              text-sm
              outline-none
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-200
            "
          >
            <option value="all">
              Semua
            </option>

            <option value="featured">
              Featured
            </option>

            <option value="normal">
              Non Featured
            </option>
          </select>

          <Button
            type="button"
            variant="outline"
            onClick={onReset}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}