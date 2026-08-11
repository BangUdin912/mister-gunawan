export interface Setting {
  id: string;

  // Admin Account
  admin_name: string | null;
  admin_email: string | null;

  // Company
  company_name: string | null;
  logo: string | null;
  favicon: string | null;

  // Contact
  email: string | null;
  phone: string |null;
  whatsapp: string | null;
  address: string | null;
  google_maps: string | null;

  // Social Media
  facebook: string | null;
  instagram: string | null;
  youtube: string | null;
  linkedin: string | null;
  tiktok: string | null;

  created_at: string;
  updated_at: string;
}

export interface SettingPayload {
  // Admin
  admin_name?: string | null;
  admin_email?: string |null;

  // Company
  company_name?: string | null;
  logo?: string | null;
  favicon?: string | null;

  // Contact
  email?: string | null;
  phone?: string | null;
  whatsapp?: string | null;
  address?: string | null;
  google_maps?: string | null;

  // Social Media
  facebook?: string | null;
  instagram?: string | null;
  youtube?: string | null;
  linkedin?: string | null;
  tiktok?: string | null;
}