// src/lib/partnerService.ts

import { supabase } from "@/lib/supabase/client";
import type {
  Partner,
  PartnerPayload,
  PartnerCategory,
} from "@/types/partner";

const TABLE = "partners";

export const partnerService = {
  /**
   * Ambil semua data
   */
  async getAll(): Promise<Partner[]> {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .order("order_number", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) throw error;

    return (data ?? []) as Partner[];
  },

  /**
   * Ambil berdasarkan ID
   */
  async getById(id: string): Promise<Partner | null> {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return data as Partner;
  },

  /**
   * Ambil Partner Bisnis
   */
  async getPartners(): Promise<Partner[]> {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .eq("category", "partner")
      .eq("is_active", true)
      .order("order_number", { ascending: true });

    if (error) throw error;

    return (data ?? []) as Partner[];
  },

  /**
   * Ambil Klien
   */
  async getClients(): Promise<Partner[]> {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .eq("category", "client")
      .eq("is_active", true)
      .order("order_number", { ascending: true });

    if (error) throw error;

    return (data ?? []) as Partner[];
  },

  /**
   * Filter berdasarkan kategori
   */
  async getByCategory(
    category: PartnerCategory
  ): Promise<Partner[]> {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .eq("category", category)
      .order("order_number", { ascending: true });

    if (error) throw error;

    return (data ?? []) as Partner[];
  },

  /**
   * Tambah data
   */
  async create(payload: PartnerPayload): Promise<Partner> {
    const { data, error } = await supabase
      .from(TABLE)
      .insert(payload)
      .select()
      .single();

    if (error) throw error;

    return data as Partner;
  },

  /**
   * Update data
   */
  async update(
    id: string,
    payload: PartnerPayload
  ): Promise<Partner> {
    const { data, error } = await supabase
      .from(TABLE)
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return data as Partner;
  },

  /**
   * Hapus data
   */
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from(TABLE)
      .delete()
      .eq("id", id);

    if (error) throw error;
  },

  /**
   * Update status aktif
   */
  async toggleActive(
    id: string,
    is_active: boolean
  ): Promise<void> {
    const { error } = await supabase
      .from(TABLE)
      .update({ is_active })
      .eq("id", id);

    if (error) throw error;
  },

  /**
   * Update urutan
   */
  async updateOrder(
    id: string,
    order_number: number
  ): Promise<void> {
    const { error } = await supabase
      .from(TABLE)
      .update({ order_number })
      .eq("id", id);

    if (error) throw error;
  },
};