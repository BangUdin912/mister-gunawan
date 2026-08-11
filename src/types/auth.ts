import type {
  Session,
  User,
} from "@supabase/supabase-js";

/**
 * Payload login
 */
export interface LoginPayload {
  email: string;
  password: string;
}

/**
 * Payload reset password
 */
export interface ResetPasswordPayload {
  email: string;
}

/**
 * Payload update password
 */
export interface UpdatePasswordPayload {
  password: string;
}

/**
 * Profile admin
 * (opsional, jika menggunakan tabel profiles)
 */
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor";
  avatar?: string | null;
  created_at?: string;
  updated_at?: string;
}

/**
 * State autentikasi
 */
export interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
}

/**
 * Response login
 */
export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User | null;
  session?: Session | null;
}

/**
 * Menu berdasarkan role
 */
export interface Permission {
  role: "admin" | "editor";
  permissions: string[];
}