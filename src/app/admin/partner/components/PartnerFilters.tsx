"use client";

import { Search, RotateCcw } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type PartnerStatusFilter = "all" | "active" | "inactive";

interface PartnerFiltersProps {
  search: string;
  status: PartnerStatusFilter;

  onSearchChange: (value: string) => void;
  onStatusChange: (value: PartnerStatusFilter) => void;
  onReset: () => void;
}

export default function PartnerFilters({
  search,
  status,
  onSearchChange,
  onStatusChange,
  onReset,
}: PartnerFiltersProps) {
  const isFiltered = search !== "" || status !== "all";

  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-card p-4 md:flex-row md:items-center">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Cari partner..."
          className="pl-9"
        />
      </div>

      <Select
        value={status}
        onValueChange={(value) =>
          onStatusChange(value as PartnerStatusFilter)
        }
      >
        <SelectTrigger className="w-full md:w-48">
          <SelectValue placeholder="Status" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">Semua Status</SelectItem>
          <SelectItem value="active">Aktif</SelectItem>
          <SelectItem value="inactive">Nonaktif</SelectItem>
        </SelectContent>
      </Select>

      <Button
        variant="outline"
        onClick={onReset}
        disabled={!isFiltered}
      >
        <RotateCcw className="mr-2 h-4 w-4" />
        Reset
      </Button>
    </div>
  );
}