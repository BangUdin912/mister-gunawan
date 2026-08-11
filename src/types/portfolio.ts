export type PortfolioType = "photo" | "youtube";

export interface Portfolio {
  id: string;

  slug: string;

  title: string;

  type: PortfolioType;

  category: string;

  thumbnail: string | null;

  // Bisa null jika belum ada gallery
  gallery: string[] | null;

  youtube_url: string | null;

  description: string | null;

  location: string | null;

  event_date: string | null;

  participant_count: number | null;

  featured: boolean;

  is_active: boolean;

  created_at: string;

  updated_at: string;
}

export type PortfolioPayload = Omit<
  Portfolio,
  "id" | "created_at" | "updated_at"
>;

export interface PortfolioPagination {
  data: Portfolio[];
  total: number;
  currentPage: number;
  totalPages: number;
  perPage: number;
}

export interface PortfolioFilter {
  category?: string;
  type?: PortfolioType;
  keyword?: string;
  featured?: boolean;
  is_active?: boolean;
  page?: number;
  limit?: number;
}