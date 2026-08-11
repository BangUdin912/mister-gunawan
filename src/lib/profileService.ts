import { supabase } from "@/lib/supabase/client";

import type {
    Profile,
    ProfilePayload,
} from "@/types/profile";

const BUCKET = "avatars";

const PROFILE_COLUMNS =
    "id, name, avatar_url, role, created_at, updated_at";

/**
 * =========================================================
 * GET CURRENT USER
 * =========================================================
 *
 * Email dan password administrator dikelola
 * oleh Supabase Authentication.
 *
 * public.profiles hanya menyimpan:
 * - name
 * - avatar_url
 * - role
 */
async function getUser() {
    const {
        data,
        error,
    } = await supabase.auth.getUser();

    if (error) {
        console.error(
            "Get user error:",
            {
                message: error.message,
                name: error.name,
                status: error.status,
            }
        );

        throw error;
    }

    return data.user;
}

/**
 * =========================================================
 * GET PROFILE
 * =========================================================
 *
 * Mengambil profile berdasarkan:
 *
 * profiles.id = auth.users.id
 *
 * Jika profile belum ada,
 * profile dibuat otomatis.
 */
async function getProfile(): Promise<Profile> {
    const user = await getUser();

    if (!user) {
        throw new Error(
            "User belum login."
        );
    }

    const {
        data,
        error,
    } = await supabase
        .from("profiles")
        .select(PROFILE_COLUMNS)
        .eq("id", user.id)
        .maybeSingle();

    if (error) {
        console.error(
            "Get profile error:",
            {
                message: error.message,
                details: error.details,
                hint: error.hint,
                code: error.code,
            }
        );

        throw error;
    }

    /**
     * Profile belum tersedia.
     *
     * Buat profile baru menggunakan
     * data dari Supabase Auth.
     */
    if (!data) {
        const {
            data: created,
            error: createError,
        } = await supabase
            .from("profiles")
            .insert({
                id: user.id,

                name:
                    user.user_metadata?.name ??
                    user.user_metadata?.full_name ??
                    null,

                avatar_url:
                    user.user_metadata?.avatar_url ??
                    null,

                role: "admin",
            })
            .select(PROFILE_COLUMNS)
            .single();

        if (createError) {
            console.error(
                "Create profile error:",
                {
                    message:
                        createError.message,
                    details:
                        createError.details,
                    hint:
                        createError.hint,
                    code:
                        createError.code,
                }
            );

            throw createError;
        }

        return created as Profile;
    }

    return data as Profile;
}

/**
 * =========================================================
 * UPDATE PROFILE
 * =========================================================
 *
 * Field yang diperbolehkan:
 *
 * - name
 * - avatar_url
 *
 * Email TIDAK boleh dikirim ke sini.
 *
 * Email dikelola melalui:
 *
 * supabase.auth.updateUser()
 */
async function updateProfile(
    payload: ProfilePayload
): Promise<Profile> {
    const user = await getUser();

    if (!user) {
        throw new Error(
            "User belum login."
        );
    }

    /**
     * Tidak ada data yang dikirim.
     */
    if (
        Object.keys(payload).length === 0
    ) {
        return getProfile();
    }

    /**
     * Payload aman.
     *
     * Service hanya mengizinkan field
     * yang memang boleh diperbarui.
     */
    const safePayload: ProfilePayload = {};

    if (
        Object.prototype.hasOwnProperty.call(
            payload,
            "name"
        )
    ) {
        safePayload.name =
            payload.name ?? null;
    }

    if (
        Object.prototype.hasOwnProperty.call(
            payload,
            "avatar_url"
        )
    ) {
        safePayload.avatar_url =
            payload.avatar_url ?? null;
    }

    /**
     * Tidak ada field yang valid.
     */
    if (
        Object.keys(safePayload).length === 0
    ) {
        return getProfile();
    }

    const {
        data,
        error,
    } = await supabase
        .from("profiles")
        .update(safePayload)
        .eq("id", user.id)
        .select(PROFILE_COLUMNS)
        .single();

    if (error) {
        console.error(
            "Update profile error:",
            {
                message: error.message,
                details: error.details,
                hint: error.hint,
                code: error.code,
            }
        );

        throw error;
    }

    return data as Profile;
}

/**
 * =========================================================
 * GET PUBLIC URL
 * =========================================================
 */
function getPublicUrl(
    path: string
): string {
    const {
        data,
    } = supabase.storage
        .from(BUCKET)
        .getPublicUrl(path);

    return data.publicUrl;
}

/**
 * =========================================================
 * GET AVATAR STORAGE PATH
 * =========================================================
 *
 * Contoh:
 *
 * https://xxx.supabase.co/storage/v1/object/public/avatars/
 * user-id/avatar.webp
 *
 * menjadi:
 *
 * user-id/avatar.webp
 */
function getAvatarPath(
    avatarUrl: string
): string | null {
    if (!avatarUrl) {
        return null;
    }

    try {
        const marker =
            `/storage/v1/object/public/${BUCKET}/`;

        const index =
            avatarUrl.indexOf(marker);

        if (index === -1) {
            return null;
        }

        const path =
            avatarUrl.substring(
                index + marker.length
            );

        /**
         * Hilangkan query string.
         */
        const cleanPath =
            path.split("?")[0];

        return cleanPath || null;
    } catch {
        return null;
    }
}

/**
 * =========================================================
 * DELETE AVATAR
 * =========================================================
 *
 * Kegagalan menghapus avatar lama
 * tidak boleh menggagalkan proses utama.
 */
async function deleteAvatar(
    avatarUrl?: string | null
): Promise<void> {
    if (!avatarUrl) {
        return;
    }

    const path =
        getAvatarPath(avatarUrl);

    if (!path) {
        return;
    }

    try {
        const {
            error,
        } = await supabase.storage
            .from(BUCKET)
            .remove([path]);

        if (error) {
            console.warn(
                "Delete avatar error:",
                error.message
            );
        }
    } catch (error) {
        console.warn(
            "Delete avatar error:",
            error
        );
    }
}

/**
 * =========================================================
 * DELETE STORAGE FILE
 * =========================================================
 *
 * Digunakan untuk rollback jika:
 *
 * upload berhasil
 * tetapi update database gagal.
 */
async function deleteStorageFile(
    path: string
): Promise<void> {
    if (!path) {
        return;
    }

    try {
        const {
            error,
        } = await supabase.storage
            .from(BUCKET)
            .remove([path]);

        if (error) {
            console.warn(
                "Delete storage file error:",
                error.message
            );
        }
    } catch (error) {
        console.warn(
            "Delete storage file error:",
            error
        );
    }
}

/**
 * =========================================================
 * UPDATE AVATAR
 * =========================================================
 *
 * Flow:
 *
 * File
 * ↓
 * avatars/{user.id}/{uuid}.ext
 * ↓
 * Public URL
 * ↓
 * profiles.avatar_url
 * ↓
 * Hapus avatar lama
 */
async function updateAvatar(
    file: File
): Promise<string> {
    const user = await getUser();

    if (!user) {
        throw new Error(
            "User belum login."
        );
    }

    /**
     * Validasi MIME type.
     */
    const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
    ];

    if (
        !allowedTypes.includes(
            file.type
        )
    ) {
        throw new Error(
            "Format avatar harus JPG, PNG, atau WebP."
        );
    }

    /**
     * Maksimal 2 MB.
     */
    const maxSize =
        2 * 1024 * 1024;

    if (file.size > maxSize) {
        throw new Error(
            "Ukuran avatar maksimal 2 MB."
        );
    }

    /**
     * Ambil profile lama
     * sebelum upload.
     */
    const profile =
        await getProfile();

    /**
     * Tentukan extension berdasarkan
     * MIME type.
     */
    const extension =
        file.type === "image/png"
            ? "png"
            : file.type === "image/webp"
                ? "webp"
                : "jpg";

    /**
     * Nama file unik.
     */
    const fileName =
        `${crypto.randomUUID()}.${extension}`;

    /**
     * Storage path.
     */
    const filePath =
        `${user.id}/${fileName}`;

    /**
     * Upload avatar.
     */
    const {
        error: uploadError,
    } = await supabase.storage
        .from(BUCKET)
        .upload(
            filePath,
            file,
            {
                cacheControl: "3600",
                contentType: file.type,
                upsert: false,
            }
        );

    if (uploadError) {
        console.error(
            "Upload avatar error:",
            {
                message:
                    uploadError.message,
                name:
                    uploadError.name,
                status:
                    uploadError.status,
            }
        );

        throw new Error(
            uploadError.message ||
                "Gagal mengupload avatar."
        );
    }

    /**
     * Public URL avatar baru.
     */
    const avatarUrl =
        getPublicUrl(filePath);

    try {
        /**
         * Update profiles.
         */
        await updateProfile({
            avatar_url: avatarUrl,
        });

        /**
         * Hapus avatar lama
         * setelah database berhasil.
         */
        if (
            profile.avatar_url &&
            profile.avatar_url !==
                avatarUrl
        ) {
            await deleteAvatar(
                profile.avatar_url
            );
        }

        return avatarUrl;
    } catch (error) {
        /**
         * Rollback upload jika
         * update database gagal.
         */
        await deleteStorageFile(
            filePath
        );

        throw error;
    }
}

/**
 * =========================================================
 * UPDATE EMAIL
 * =========================================================
 *
 * Email administrator dikelola oleh:
 *
 * auth.users.email
 *
 * BUKAN:
 *
 * public.profiles.email
 *
 * Catatan:
 * Supabase dapat meminta user melakukan
 * konfirmasi email sebelum perubahan
 * benar-benar aktif.
 */
async function updateEmail(
    email: string
): Promise<void> {
    const user = await getUser();

    if (!user) {
        throw new Error(
            "User belum login."
        );
    }

    /**
     * Normalisasi email.
     */
    const normalizedEmail =
        email.trim().toLowerCase();

    /**
     * Validasi kosong.
     */
    if (!normalizedEmail) {
        throw new Error(
            "Email wajib diisi."
        );
    }

    /**
     * Validasi format.
     */
    const emailIsValid =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
            normalizedEmail
        );

    if (!emailIsValid) {
        throw new Error(
            "Format email tidak valid."
        );
    }

    /**
     * Email Auth saat ini.
     */
    const currentEmail =
        user.email
            ?.trim()
            .toLowerCase() ?? "";

    /**
     * Tidak perlu request jika
     * email tidak berubah.
     */
    if (
        normalizedEmail ===
        currentEmail
    ) {
        return;
    }

    /**
     * Update email melalui
     * Supabase Authentication.
     */
    const {
        data,
        error,
    } = await supabase.auth.updateUser({
        email: normalizedEmail,
    });

    if (error) {
        console.error(
            "Update email error:",
            {
                message:
                    error.message,
                name:
                    error.name,
                status:
                    error.status,
            }
        );

        const message =
            error.message
                ?.trim()
                .toLowerCase() ?? "";

        /**
         * Rate limit.
         */
        if (
            message.includes(
                "email rate limit"
            ) ||
            message.includes(
                "rate limit"
            ) ||
            message.includes(
                "too many requests"
            ) ||
            message.includes(
                "for security purposes"
            )
        ) {
            throw new Error(
                "Perubahan email sedang dibatasi oleh Supabase. Silakan tunggu beberapa saat sebelum mencoba lagi."
            );
        }

        /**
         * Email sudah digunakan.
         */
        if (
            message.includes(
                "email address is already registered"
            ) ||
            message.includes(
                "email already registered"
            ) ||
            message.includes(
                "user already registered"
            )
        ) {
            throw new Error(
                "Email tersebut sudah digunakan oleh akun lain."
            );
        }

        /**
         * Email tidak valid.
         */
        if (
            message.includes(
                "invalid email"
            )
        ) {
            throw new Error(
                "Format email tidak valid."
            );
        }

        throw new Error(
            error.message ||
                "Gagal memperbarui email."
        );
    }

    /**
     * Log hanya untuk development.
     *
     * new_email biasanya berisi email
     * yang sedang menunggu konfirmasi
     * apabila secure email change aktif.
     */
    console.info(
        "Email update requested:",
        {
            currentEmail:
                currentEmail || null,

            newEmail:
                normalizedEmail,

            returnedEmail:
                data.user?.email ?? null,

            newEmailPending:
                data.user?.new_email ??
                null,
        }
    );
}

/**
 * =========================================================
 * UPDATE PASSWORD
 * =========================================================
 *
 * Password dikelola Supabase Auth.
 *
 * Jangan trim password karena spasi
 * dapat menjadi bagian dari password.
 */
async function updatePassword(
    password: string
): Promise<void> {
    if (!password) {
        throw new Error(
            "Password wajib diisi."
        );
    }

    if (password.length < 6) {
        throw new Error(
            "Password minimal 6 karakter."
        );
    }

    const {
        error,
    } = await supabase.auth.updateUser({
        password,
    });

    if (error) {
        console.error(
            "Update password error:",
            {
                message:
                    error.message,
                name:
                    error.name,
                status:
                    error.status,
            }
        );

        throw error;
    }
}

/**
 * =========================================================
 * LOGOUT
 * =========================================================
 */
async function logout(): Promise<void> {
    const {
        error,
    } = await supabase.auth.signOut();

    if (error) {
        console.error(
            "Logout error:",
            {
                message:
                    error.message,
                name:
                    error.name,
                status:
                    error.status,
            }
        );

        throw error;
    }
}

/**
 * =========================================================
 * EXPORT
 * =========================================================
 */
export const profileService = {
    getUser,
    getProfile,
    updateProfile,
    updateAvatar,
    updateEmail,
    updatePassword,
    logout,
};