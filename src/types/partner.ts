// src/types/partner.ts

export type PartnerCategory = "partner" | "client";

export interface Partner {
  id: string;

  /** Nama perusahaan / instansi */
  name: string;

  /** Partner Bisnis atau Klien HSS */
  category: PartnerCategory;

  /** URL logo di Supabase Storage */
  logo: string | null;

  /** Website perusahaan (opsional) */
  website: string | null;

  /** Urutan tampil */
  order_number: number;

  /** Status aktif */
  is_active: boolean;

  created_at: string;

  updated_at: string;
}

export interface PartnerPayload {
  name: string;

  category: PartnerCategory;

  logo: string | null;

  website: string | null;

  order_number?: number;

  is_active?: boolean;
}