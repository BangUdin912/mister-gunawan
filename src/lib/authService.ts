import type {
    Session,
    User,
} from "@supabase/supabase-js";

import { supabase } from "@/lib/supabase/client";

/**
 * =========================================================
 * TYPES
 * =========================================================
 */

export interface LoginPayload {
    email: string;
    password: string;
}

export interface UpdateCredentialsPayload {
    email?: string;
    password?: string;
}

/**
 * =========================================================
 * AUTH SERVICE
 * =========================================================
 */

class AuthService {
    /**
     * =====================================================
     * EMAIL VALIDATION
     * =====================================================
     */

    private validateEmail(
        email: string
    ): string {
        const normalizedEmail =
            email
                .trim()
                .toLowerCase();

        if (!normalizedEmail) {
            throw new Error(
                "Email wajib diisi."
            );
        }

        const emailIsValid =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                normalizedEmail
            );

        if (!emailIsValid) {
            throw new Error(
                "Format email tidak valid."
            );
        }

        return normalizedEmail;
    }

    /**
     * =====================================================
     * PASSWORD VALIDATION
     * =====================================================
     */

    private validatePassword(
        password: string
    ): string {
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

        return password;
    }

    /**
     * =====================================================
     * LOGIN
     * =====================================================
     */

    async login({
        email,
        password,
    }: LoginPayload): Promise<Session> {
        const normalizedEmail =
            this.validateEmail(email);

        const normalizedPassword =
            this.validatePassword(password);

        /**
         * Jangan pernah log password.
         */

        const {
            data,
            error,
        } =
            await supabase.auth.signInWithPassword({
                email: normalizedEmail,
                password: normalizedPassword,
            });

        /**
         * =================================================
         * LOGIN ERROR
         * =================================================
         */

        if (error) {
            const normalizedCode =
                String(
                    error.code ?? ""
                )
                    .trim()
                    .toLowerCase();

            const normalizedMessage =
                String(
                    error.message ?? ""
                )
                    .trim()
                    .toLowerCase();

            /**
             * Invalid credentials adalah kondisi
             * normal ketika user salah memasukkan
             * email atau password.
             *
             * Jangan console.error agar browser
             * tidak menampilkan error merah.
             */
            const isInvalidCredentials =
                normalizedCode ===
                    "invalid_credentials" ||
                normalizedMessage.includes(
                    "invalid login credentials"
                );

            if (
                !isInvalidCredentials
            ) {
                console.warn(
                    "Supabase authentication error:",
                    {
                        message:
                            error.message,
                        status:
                            error.status,
                        code:
                            error.code,
                        name:
                            error.name,
                    }
                );
            }

            throw new Error(
                this.getErrorMessage(
                    error.message,
                    error.code
                )
            );
        }

        /**
         * =================================================
         * VALIDATE SESSION
         * =================================================
         */

        if (
            !data ||
            !data.session ||
            !data.user
        ) {
            throw new Error(
                "Login berhasil tetapi session tidak ditemukan."
            );
        }

        return data.session;
    }

    /**
     * =====================================================
     * LOGOUT
     * =====================================================
     */

    async logout(): Promise<void> {
        const {
            error,
        } =
            await supabase.auth.signOut();

        if (error) {
            console.warn(
                "Supabase logout error:",
                {
                    message:
                        error.message,
                    status:
                        error.status,
                    code:
                        error.code,
                }
            );

            throw new Error(
                this.getErrorMessage(
                    error.message,
                    error.code
                )
            );
        }
    }

    /**
     * =====================================================
     * UPDATE EMAIL
     * =====================================================
     */

    async updateEmail(
        email: string
    ): Promise<User> {
        const normalizedEmail =
            this.validateEmail(email);

        const currentUser =
            await this.getCurrentUser();

        if (!currentUser) {
            throw new Error(
                "Session login tidak ditemukan. Silakan login kembali."
            );
        }

        const currentEmail =
            currentUser.email
                ?.trim()
                .toLowerCase();

        /**
         * Tidak perlu request jika email
         * sama dengan email sekarang.
         */

        if (
            currentEmail ===
            normalizedEmail
        ) {
            return currentUser;
        }

        const {
            data,
            error,
        } =
            await supabase.auth.updateUser({
                email:
                    normalizedEmail,
            });

        if (error) {
            console.warn(
                "Supabase update email error:",
                {
                    message:
                        error.message,
                    status:
                        error.status,
                    code:
                        error.code,
                    name:
                        error.name,
                }
            );

            throw new Error(
                this.getErrorMessage(
                    error.message,
                    error.code
                )
            );
        }

        if (!data.user) {
            throw new Error(
                "Gagal memperbarui email."
            );
        }

        return data.user;
    }

    /**
     * =====================================================
     * UPDATE PASSWORD
     * =====================================================
     */

    async updatePassword(
        password: string
    ): Promise<User> {
        const normalizedPassword =
            this.validatePassword(
                password
            );

        const currentUser =
            await this.getCurrentUser();

        if (!currentUser) {
            throw new Error(
                "Session login tidak ditemukan. Silakan login kembali."
            );
        }

        const {
            data,
            error,
        } =
            await supabase.auth.updateUser({
                password:
                    normalizedPassword,
            });

        if (error) {
            console.warn(
                "Supabase update password error:",
                {
                    message:
                        error.message,
                    status:
                        error.status,
                    code:
                        error.code,
                    name:
                        error.name,
                }
            );

            throw new Error(
                this.getErrorMessage(
                    error.message,
                    error.code
                )
            );
        }

        if (!data.user) {
            throw new Error(
                "Gagal memperbarui password."
            );
        }

        return data.user;
    }

    /**
     * =====================================================
     * UPDATE EMAIL + PASSWORD
     * =====================================================
     *
     * Dipakai oleh SettingForm.
     */

    async updateCredentials({
        email,
        password,
    }: UpdateCredentialsPayload): Promise<User> {
        /**
         * Tidak boleh kosong semua.
         */

        if (
            email === undefined &&
            password === undefined
        ) {
            throw new Error(
                "Tidak ada data account yang diperbarui."
            );
        }

        const currentUser =
            await this.getCurrentUser();

        if (!currentUser) {
            throw new Error(
                "Session login tidak ditemukan. Silakan login kembali."
            );
        }

        /**
         * Payload Supabase.
         */

        const payload: {
            email?: string;
            password?: string;
        } = {};

        /**
         * =================================================
         * EMAIL
         * =================================================
         */

        if (
            email !== undefined
        ) {
            const normalizedEmail =
                this.validateEmail(
                    email
                );

            const currentEmail =
                currentUser.email
                    ?.trim()
                    .toLowerCase();

            /**
             * Hanya kirim email jika
             * benar-benar berbeda.
             */

            if (
                normalizedEmail !==
                currentEmail
            ) {
                payload.email =
                    normalizedEmail;
            }
        }

        /**
         * =================================================
         * PASSWORD
         * =================================================
         */

        if (
            password !== undefined &&
            password !== ""
        ) {
            payload.password =
                this.validatePassword(
                    password
                );
        }

        /**
         * Tidak ada perubahan.
         */

        if (
            Object.keys(payload)
                .length === 0
        ) {
            return currentUser;
        }

        /**
         * =================================================
         * UPDATE SUPABASE AUTH
         * =================================================
         */

        const {
            data,
            error,
        } =
            await supabase.auth.updateUser(
                payload
            );

        if (error) {
            console.warn(
                "Supabase update credentials error:",
                {
                    message:
                        error.message,
                    status:
                        error.status,
                    code:
                        error.code,
                    name:
                        error.name,
                }
            );

            throw new Error(
                this.getErrorMessage(
                    error.message,
                    error.code
                )
            );
        }

        if (!data.user) {
            throw new Error(
                "Gagal memperbarui account."
            );
        }

        return data.user;
    }

    /**
     * =====================================================
     * CURRENT USER
     * =====================================================
     */

    async getCurrentUser(): Promise<User | null> {
        const {
            data,
            error,
        } =
            await supabase.auth.getUser();

        if (error) {
            return null;
        }

        return data.user;
    }

    /**
     * =====================================================
     * CURRENT SESSION
     * =====================================================
     */

    async getSession(): Promise<Session | null> {
        const {
            data,
            error,
        } =
            await supabase.auth.getSession();

        if (error) {
            console.warn(
                "Supabase getSession:",
                error.message
            );

            return null;
        }

        return data.session;
    }

    /**
     * =====================================================
     * AUTHENTICATED
     * =====================================================
     */

    async isAuthenticated(): Promise<boolean> {
        const session =
            await this.getSession();

        return Boolean(session);
    }

    /**
     * =====================================================
     * RESET PASSWORD
     * =====================================================
     */

    async resetPassword(
        email: string
    ): Promise<void> {
        const normalizedEmail =
            this.validateEmail(email);

        const redirectTo =
            typeof window !==
            "undefined"
                ? `${window.location.origin}/reset-password`
                : undefined;

        const {
            error,
        } =
            await supabase.auth.resetPasswordForEmail(
                normalizedEmail,
                {
                    redirectTo,
                }
            );

        if (error) {
            console.warn(
                "Supabase reset password error:",
                {
                    message:
                        error.message,
                    status:
                        error.status,
                    code:
                        error.code,
                }
            );

            throw new Error(
                this.getErrorMessage(
                    error.message,
                    error.code
                )
            );
        }
    }

    /**
     * =====================================================
     * ERROR MESSAGE
     * =====================================================
     */

    private getErrorMessage(
        message: string,
        code?: string
    ): string {
        const normalizedMessage =
            String(message ?? "")
                .trim()
                .toLowerCase();

        const normalizedCode =
            String(code ?? "")
                .trim()
                .toLowerCase();

        /**
         * =================================================
         * INVALID LOGIN
         * =================================================
         */

        if (
            normalizedCode ===
                "invalid_credentials" ||
            normalizedMessage.includes(
                "invalid login credentials"
            )
        ) {
            return (
                "Email atau password salah."
            );
        }

        /**
         * =================================================
         * EMAIL NOT CONFIRMED
         * =================================================
         */

        if (
            normalizedCode ===
                "email_not_confirmed" ||
            normalizedMessage.includes(
                "email not confirmed"
            )
        ) {
            return (
                "Email belum dikonfirmasi. Silakan periksa inbox email Anda."
            );
        }

        /**
         * =================================================
         * EMAIL ALREADY EXISTS
         * =================================================
         */

        if (
            normalizedCode ===
                "email_exists" ||
            normalizedMessage.includes(
                "already registered"
            ) ||
            normalizedMessage.includes(
                "already been registered"
            ) ||
            normalizedMessage.includes(
                "email address is already"
            )
        ) {
            return (
                "Email tersebut sudah digunakan oleh akun lain."
            );
        }

        /**
         * =================================================
         * EMAIL CHANGE / CONFIRMATION
         * =================================================
         */

        if (
            normalizedMessage.includes(
                "email change"
            ) ||
            normalizedMessage.includes(
                "confirmation"
            )
        ) {
            return (
                "Perubahan email memerlukan konfirmasi. Silakan periksa inbox email Anda."
            );
        }

        /**
         * =================================================
         * PASSWORD WEAK
         * =================================================
         */

        if (
            normalizedCode.includes(
                "weak_password"
            ) ||
            normalizedMessage.includes(
                "password should contain"
            ) ||
            normalizedMessage.includes(
                "password is too weak"
            )
        ) {
            return (
                "Password terlalu lemah. Gunakan password yang lebih kuat."
            );
        }

        /**
         * =================================================
         * PASSWORD RECENTLY CHANGED
         * =================================================
         */

        if (
            normalizedMessage.includes(
                "recently changed"
            )
        ) {
            return (
                "Password baru saja diubah. Silakan tunggu beberapa saat sebelum mencoba kembali."
            );
        }

        /**
         * =================================================
         * RATE LIMIT
         * =================================================
         */

        if (
            normalizedCode.includes(
                "rate"
            ) ||
            normalizedMessage.includes(
                "rate limit"
            ) ||
            normalizedMessage.includes(
                "too many requests"
            )
        ) {
            return (
                "Terlalu banyak percobaan. Silakan tunggu beberapa saat sebelum mencoba lagi."
            );
        }

        /**
         * =================================================
         * NETWORK
         * =================================================
         */

        if (
            normalizedMessage.includes(
                "network"
            ) ||
            normalizedMessage.includes(
                "failed to fetch"
            ) ||
            normalizedMessage.includes(
                "fetch failed"
            ) ||
            normalizedMessage.includes(
                "network request failed"
            )
        ) {
            return (
                "Tidak dapat terhubung ke server. Periksa koneksi internet Anda."
            );
        }

        /**
         * =================================================
         * USER BANNED
         * =================================================
         */

        if (
            normalizedCode ===
                "user_banned" ||
            normalizedMessage.includes(
                "user is banned"
            )
        ) {
            return (
                "Akun Anda dinonaktifkan. Silakan hubungi administrator."
            );
        }

        /**
         * =================================================
         * SESSION
         * =================================================
         */

        if (
            normalizedMessage.includes(
                "session"
            ) &&
            (
                normalizedMessage.includes(
                    "expired"
                ) ||
                normalizedMessage.includes(
                    "not found"
                )
            )
        ) {
            return (
                "Session Anda telah berakhir. Silakan login kembali."
            );
        }

        /**
         * =================================================
         * FALLBACK
         * =================================================
         */

        return (
            message ||
            "Terjadi kesalahan pada autentikasi."
        );
    }
}

/**
 * =========================================================
 * EXPORT
 * =========================================================
 */

export const authService =
    new AuthService();