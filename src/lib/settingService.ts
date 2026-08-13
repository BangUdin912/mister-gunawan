import { supabase } from "@/lib/supabase/client";

import type {
    Setting,
    SettingPayload,
} from "@/types/setting";

/**
 * =========================================================
 * CONFIGURATION
 * =========================================================
 */

const TABLE_NAME = "settings";
const BUCKET_NAME = "settings";

type StorageFolder =
    | "logo"
    | "favicon"
    | "seo";

/**
 * =========================================================
 * ERROR HELPERS
 * =========================================================
 */

function getSupabaseErrorMessage(
    error: unknown,
    fallback: string
): string {
    if (
        error &&
        typeof error === "object"
    ) {
        const supabaseError = error as {
            message?: string;
            details?: string;
            hint?: string;
            code?: string;
            name?: string;
        };

        if (supabaseError.message) {
            return supabaseError.message;
        }
    }

    if (error instanceof Error) {
        return error.message || fallback;
    }

    return fallback;
}

function logSupabaseError(
    context: string,
    error: unknown
): void {
    if (
        error &&
        typeof error === "object"
    ) {
        const supabaseError = error as {
            message?: string;
            details?: string;
            hint?: string;
            code?: string;
            name?: string;
            status?: number;
        };

        console.error(
            `${context}:`,
            {
                name: supabaseError.name,
                message: supabaseError.message,
                details: supabaseError.details,
                hint: supabaseError.hint,
                code: supabaseError.code,
                status: supabaseError.status,
            }
        );

        return;
    }

    console.error(
        `${context}:`,
        error
    );
}

/**
 * =========================================================
 * FILE HELPERS
 * =========================================================
 */

function getFileExtension(
    file: File
): string {
    const extension =
        file.name
            .split(".")
            .pop()
            ?.toLowerCase()
            .trim();

    return extension || "bin";
}

function createStoragePath(
    file: File,
    folder: StorageFolder
): string {
    const extension =
        getFileExtension(file);

    const randomId =
        Math.random()
            .toString(36)
            .substring(2, 8);

    return `${folder}/${Date.now()}-${randomId}.${extension}`;
}

/**
 * =========================================================
 * STORAGE PATH
 * =========================================================
 */

function getStoragePathFromUrl(
    url?: string | null
): string | null {
    if (!url) {
        return null;
    }

    try {
        const parsedUrl = new URL(url);

        const marker =
            `/storage/v1/object/public/${BUCKET_NAME}/`;

        const pathname =
            parsedUrl.pathname;

        const index =
            pathname.indexOf(marker);

        if (index === -1) {
            return null;
        }

        const path =
            pathname.substring(
                index + marker.length
            );

        if (!path) {
            return null;
        }

        return decodeURIComponent(path);
    } catch {
        return null;
    }
}

/**
 * =========================================================
 * UPLOAD FILE
 * =========================================================
 */

async function uploadFile(
    file: File,
    folder: StorageFolder
): Promise<string> {
    if (!(file instanceof File)) {
        throw new Error(
            "File tidak valid."
        );
    }

    if (file.size <= 0) {
        throw new Error(
            "File kosong atau tidak valid."
        );
    }

    const filePath =
        createStoragePath(
            file,
            folder
        );

    const {
        error,
    } =
        await supabase.storage
            .from(BUCKET_NAME)
            .upload(
                filePath,
                file,
                {
                    cacheControl: "3600",
                    upsert: false,
                    contentType:
                        file.type || undefined,
                }
            );

    if (error) {
        logSupabaseError(
            "Supabase Storage upload error",
            error
        );

        throw new Error(
            getSupabaseErrorMessage(
                error,
                "Gagal mengupload file."
            )
        );
    }

    const {
        data,
    } =
        supabase.storage
            .from(BUCKET_NAME)
            .getPublicUrl(
                filePath
            );

    if (!data?.publicUrl) {
        throw new Error(
            "URL file berhasil diupload tetapi tidak dapat dibuat."
        );
    }

    return data.publicUrl;
}

/**
 * =========================================================
 * DELETE STORAGE FILE
 * =========================================================
 */

async function deleteStorageFile(
    url?: string | null
): Promise<void> {
    const path =
        getStoragePathFromUrl(
            url
        );

    if (!path) {
        return;
    }

    try {
        const {
            error,
        } =
            await supabase.storage
                .from(BUCKET_NAME)
                .remove([path]);

        if (error) {
            logSupabaseError(
                "Supabase Storage delete warning",
                error
            );
        }
    } catch (error) {
        console.warn(
            "Supabase Storage delete warning:",
            error
        );
    }
}

/**
 * =========================================================
 * SETTING SERVICE
 * =========================================================
 */

export const settingService = {
    /**
     * =====================================================
     * PUBLIC SETTINGS
     * =====================================================
     *
     * Dipakai oleh:
     *
     * - Home
     * - Contact
     * - About
     * - Footer
     * - SEO
     *
     * Tidak membutuhkan login.
     *
     * TIDAK melakukan INSERT.
     * TIDAK melakukan UPDATE.
     * Hanya SELECT.
     */
    async getPublic(): Promise<Setting | null> {
        const {
            data,
            error,
        } =
            await supabase
                .from(TABLE_NAME)
                .select("*")
                .limit(1)
                .maybeSingle();

        if (error) {
            logSupabaseError(
                "Supabase get public settings error",
                error
            );

            throw new Error(
                getSupabaseErrorMessage(
                    error,
                    "Gagal mengambil pengaturan website."
                )
            );
        }

        return data as Setting | null;
    },

    /**
     * =====================================================
     * ADMIN GET SETTINGS
     * =====================================================
     */

    async get(): Promise<Setting | null> {
        const {
            data,
            error,
        } =
            await supabase
                .from(TABLE_NAME)
                .select("*")
                .limit(1)
                .maybeSingle();

        if (error) {
            logSupabaseError(
                "Supabase get settings error",
                error
            );

            throw new Error(
                getSupabaseErrorMessage(
                    error,
                    "Gagal mengambil pengaturan."
                )
            );
        }

        return data as Setting | null;
    },

    /**
     * =====================================================
     * CREATE SETTINGS
     * =====================================================
     */

    async create(
        payload: Partial<SettingPayload> = {}
    ): Promise<Setting> {
        const cleanPayload =
            Object.fromEntries(
                Object.entries(payload).filter(
                    ([, value]) =>
                        value !== undefined
                )
            );

        const {
            data,
            error,
        } =
            await supabase
                .from(TABLE_NAME)
                .insert(cleanPayload)
                .select("*")
                .single();

        if (error) {
            logSupabaseError(
                "Supabase create settings error",
                error
            );

            throw new Error(
                getSupabaseErrorMessage(
                    error,
                    "Gagal membuat pengaturan."
                )
            );
        }

        if (!data) {
            throw new Error(
                "Pengaturan berhasil dibuat tetapi data tidak dapat diambil."
            );
        }

        return data as Setting;
    },

    /**
     * =====================================================
     * UPDATE SETTINGS
     * =====================================================
     */

    async update(
        id: string,
        payload: SettingPayload
    ): Promise<Setting> {
        if (!id) {
            throw new Error(
                "ID pengaturan tidak valid."
            );
        }

        if (!payload) {
            throw new Error(
                "Data pengaturan tidak valid."
            );
        }

        const cleanPayload =
            Object.fromEntries(
                Object.entries(payload).filter(
                    ([, value]) =>
                        value !== undefined
                )
            ) as SettingPayload;

        if (
            Object.keys(cleanPayload)
                .length === 0
        ) {
            throw new Error(
                "Tidak ada data yang akan diperbarui."
            );
        }

        const {
            data,
            error,
        } =
            await supabase
                .from(TABLE_NAME)
                .update(cleanPayload)
                .eq("id", id)
                .select("*")
                .single();

        if (error) {
            logSupabaseError(
                "Supabase update settings error",
                error
            );

            throw new Error(
                getSupabaseErrorMessage(
                    error,
                    "Gagal memperbarui pengaturan."
                )
            );
        }

        if (!data) {
            throw new Error(
                "Pengaturan tidak ditemukan setelah diperbarui."
            );
        }

        return data as Setting;
    },

    /**
     * =====================================================
     * UPLOAD LOGO
     * =====================================================
     */

    async uploadLogo(
        file: File,
        oldLogo?: string | null
    ): Promise<string> {
        const newUrl =
            await uploadFile(
                file,
                "logo"
            );

        if (
            oldLogo &&
            oldLogo !== newUrl
        ) {
            await deleteStorageFile(
                oldLogo
            );
        }

        return newUrl;
    },

    /**
     * =====================================================
     * UPLOAD FAVICON
     * =====================================================
     */

    async uploadFavicon(
        file: File,
        oldFavicon?: string | null
    ): Promise<string> {
        const newUrl =
            await uploadFile(
                file,
                "favicon"
            );

        if (
            oldFavicon &&
            oldFavicon !== newUrl
        ) {
            await deleteStorageFile(
                oldFavicon
            );
        }

        return newUrl;
    },

    /**
     * =====================================================
     * UPLOAD SEO IMAGE
     * =====================================================
     */

    async uploadSeoImage(
        file: File,
        oldImage?: string | null
    ): Promise<string> {
        const newUrl =
            await uploadFile(
                file,
                "seo"
            );

        if (
            oldImage &&
            oldImage !== newUrl
        ) {
            await deleteStorageFile(
                oldImage
            );
        }

        return newUrl;
    },

    /**
     * =====================================================
     * DELETE FILE
     * =====================================================
     */

    async deleteFile(
        url?: string | null
    ): Promise<void> {
        await deleteStorageFile(
            url
        );
    },
};