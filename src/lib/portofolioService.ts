import { supabase } from "@/lib/supabase/client";

import type {
  Portfolio,
  PortfolioPayload,
} from "@/types/portfolio";

const TABLE = "portfolio";

export const portfolioService = {
  // ==========================
  // GET ALL
  // ==========================
  async getAll(): Promise<Portfolio[]> {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .eq("is_active", true)
      .order("event_date", {
        ascending: false,
      });

    if (error) {
      console.error("[portfolioService.getAll]", error);

      return [];
    }

    return (data ?? []) as Portfolio[];
  },

  // ==========================
  // GET FEATURED
  // ==========================
  async getFeatured(): Promise<Portfolio[]> {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .eq("featured", true)
      .eq("is_active", true)
      .order("event_date", {
        ascending: false,
      });

    if (error) {
      console.error("[portfolioService.getFeatured]", error);

      return [];
    }

    return (data ?? []) as Portfolio[];
  },

  // ==========================
  // DETAIL
  // ==========================
  async getBySlug(
    slug: string
  ): Promise<Portfolio | null> {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .eq("slug", slug)
      .eq("is_active", true)
      .maybeSingle();

    if (error) {
      console.error("[portfolioService.getBySlug]", error);

      return null;
    }

    return data as Portfolio | null;
  },

  // ==========================
  // RELATED
  // ==========================
async getRelated(
  currentSlug: string,
  limit = 3
): Promise<Portfolio[]> {
  const current = await this.getBySlug(currentSlug);

  if (!current) {
    return [];
  }

  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("is_active", true)
    .eq("category", current.category)
    .neq("slug", currentSlug)
    .order("event_date", {
      ascending: false,
    })
    .limit(limit);

  if (error) {
    console.error(error);
    return [];
  }

  return (data ?? []) as Portfolio[];
},

  // ==========================
  // FILTER CATEGORY
  // ==========================
  async getByCategory(
    category: string
  ): Promise<Portfolio[]> {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .eq("category", category)
      .eq("is_active", true)
      .order("event_date", {
        ascending: false,
      });

    if (error) {
      console.error("[portfolioService.getByCategory]", error);

      return [];
    }

    return (data ?? []) as Portfolio[];
  },

  // ==========================
  // SEARCH
  // ==========================
  async search(
    keyword: string
  ): Promise<Portfolio[]> {
    const clean = keyword.trim();

    if (!clean) return [];

    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .eq("is_active", true)
      .or(
        [
          `title.ilike.%${clean}%`,
          `description.ilike.%${clean}%`,
          `location.ilike.%${clean}%`,
          `category.ilike.%${clean}%`,
        ].join(",")
      )
      .order("event_date", {
        ascending: false,
      });

    if (error) {
      console.error("[portfolioService.search]", error);

      return [];
    }

    return (data ?? []) as Portfolio[];
  },

  // ==========================
  // GET BY ID
  // ==========================
  async getById(
    id: string
  ): Promise<Portfolio | null> {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.error("[portfolioService.getById]", error);

      return null;
    }

    return data as Portfolio | null;
  },

  // ==========================
  // CREATE
  // ==========================
  async create(
    payload: PortfolioPayload
  ): Promise<Portfolio> {
    const { data, error } = await supabase
      .from(TABLE)
      .insert(payload)
      .select()
      .single();

    if (error) throw error;

    return data as Portfolio;
  },

  // ==========================
  // UPDATE
  // ==========================
  async update(
    id: string,
    payload: Partial<PortfolioPayload>
  ): Promise<Portfolio> {
    const { data, error } = await supabase
      .from(TABLE)
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return data as Portfolio;
  },

  // ==========================
  // DELETE
  // ==========================
  async delete(
    id: string
  ): Promise<void> {
    const { error } = await supabase
      .from(TABLE)
      .delete()
      .eq("id", id);

    if (error) throw error;
  },
};