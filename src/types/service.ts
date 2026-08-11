/**
 * Jenis kegiatan training
 */
export type ActivityType =
    | "online"
    | "offline"
    | null;

/**
 * Jenis paket training
 */
export type PackageType =
    | "personal"
    | "event"
    | null;

/**
 * Service / Training
 *
 * Data hasil query dari Supabase.
 */
export interface Service {
    id: string;

    /**
     * URL-friendly identifier
     *
     * Contoh:
     * public-speaking
     * teamwork
     * service-excellence
     */
    slug: string;

    /**
     * Nama / judul training
     */
    title: string;

    /**
     * Thumbnail utama training.
     *
     * Berisi URL Supabase Storage.
     */
    thumbnail: string | null;

    /**
     * Deskripsi singkat untuk card.
     */
    short_description: string | null;

    /**
     * Deskripsi lengkap training.
     */
    description: string | null;

    /**
     * Jenis kegiatan.
     *
     * online  = training online
     * offline = training tatap muka
     */
    activity_type: ActivityType;

    /**
     * Jenis paket.
     *
     * personal = training perorangan
     * event    = training perusahaan / kegiatan
     */
    package_type: PackageType;

    /**
     * Daftar benefit training.
     */
    benefits: string[] | null;

    /**
     * Tahapan / alur kegiatan.
     */
    flow: string[] | null;

    /**
     * Foto dokumentasi training.
     *
     * Berisi array URL Supabase Storage.
     */
    gallery: string[] | null;

    /**
     * Apakah training ditampilkan
     * sebagai training unggulan di homepage.
     */
    featured: boolean;

    /**
     * Status publikasi training.
     *
     * true  = tampil di website
     * false = tidak tampil
     */
    is_active: boolean;

    /**
     * Waktu data dibuat.
     */
    created_at: string;

    /**
     * Waktu data terakhir diperbarui.
     */
    updated_at: string;
}

/**
 * Data yang dikirim ke Supabase
 *
 * Digunakan untuk:
 * - INSERT
 * - UPDATE
 *
 * id, created_at, dan updated_at
 * tidak perlu dikirim dari form.
 */
export type ServicePayload = {
    slug: string;

    title: string;

    thumbnail?: string | null;

    short_description?: string | null;

    description?: string | null;

    activity_type?: ActivityType;

    package_type?: PackageType;

    benefits?: string[] | null;

    flow?: string[] | null;

    gallery?: string[] | null;

    featured?: boolean;

    is_active?: boolean;
};