"use client";

import { FileText } from "lucide-react";

interface PortfolioContentProps {
  title: string;
  description?: string | null;
}

export default function PortfolioContent({
  title,
  description,
}: PortfolioContentProps) {
  if (!description?.trim()) {
    return null;
  }

  return (
    <section className="py-20">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
            <FileText className="h-4 w-4" />
            Tentang Kegiatan
          </div>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-900">
            {title}
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            Berikut merupakan deskripsi lengkap mengenai kegiatan yang telah
            dilaksanakan.
          </p>
        </div>

        <div className="rounded-3xl border bg-white p-8 shadow-sm lg:p-10">
          <div
            className="
              prose
              prose-slate
              max-w-none
              leading-8
              prose-headings:font-semibold
              prose-p:text-slate-700
              prose-li:text-slate-700
              prose-strong:text-slate-900
            "
          >
            {description.split("\n").map((paragraph, index) => (
              <p key={index}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}