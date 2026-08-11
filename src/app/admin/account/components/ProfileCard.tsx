
"use client";

import {
    useEffect,
    useState,
} from "react";

import {
    Mail,
    User,
    Save,
    Loader2,
} from "lucide-react";

import { toast } from "sonner";

import { profileService } from "@/lib/profileService";

export default function ProfileCard() {
    /**
     * =====================================================
     * PROFILE STATE
     * =====================================================
     */

    const [name, setName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [originalName, setOriginalName] =
        useState("");

    const [originalEmail, setOriginalEmail] =
        useState("");

    /**
     * =====================================================
     * LOADING STATE
     * =====================================================
     */

    const [loadingData, setLoadingData] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    /**
     * =====================================================
     * LOAD PROFILE
     * =====================================================
     *
     * Nama  -> public.profiles.name
     * Email -> auth.users.email
     */

    async function loadProfile() {
        try {
            setLoadingData(true);

            const [
                user,
                profile,
            ] = await Promise.all([
                profileService.getUser(),
                profileService.getProfile(),
            ]);

            if (!user) {
                throw new Error(
                    "User belum login."
                );
            }

            const currentName =
                profile?.name?.trim() ?? "";

            const currentEmail =
                user.email?.trim() ?? "";

            setName(
                currentName
            );

            setOriginalName(
                currentName
            );

            setEmail(
                currentEmail
            );

            setOriginalEmail(
                currentEmail
            );
        } catch (error) {
            console.error(
                "Load Profile:",
                error
            );

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Gagal memuat informasi profil."
            );
        } finally {
            setLoadingData(false);
        }
    }

    useEffect(() => {
        loadProfile();
    }, []);

    /**
     * =====================================================
     * LOGOUT AFTER EMAIL CHANGE
     * =====================================================
     *
     * Jika email berubah:
     *
     * 1. Email disimpan ke Supabase Auth
     * 2. Session lama dihapus
     * 3. User diarahkan ke /login
     * 4. User harus login menggunakan email baru
     */

    async function logoutAfterEmailChange() {
        try {
            await profileService.logout();
        } catch (error) {
            console.error(
                "Logout after email update:",
                error
            );
        } finally {
            window.location.replace(
                "/login"
            );
        }
    }

    /**
     * =====================================================
     * SUBMIT
     * =====================================================
     */

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        if (saving) {
            return;
        }

        /**
         * =================================================
         * NORMALIZE DATA
         * =================================================
         */

        const trimmedName =
            name.trim();

        const trimmedEmail =
            email
                .trim()
                .toLowerCase();

        const currentName =
            originalName.trim();

        const currentEmail =
            originalEmail
                .trim()
                .toLowerCase();

        /**
         * =================================================
         * VALIDATE NAME
         * =================================================
         */

        if (!trimmedName) {
            toast.error(
                "Nama lengkap wajib diisi."
            );

            return;
        }

        if (
            trimmedName.length > 100
        ) {
            toast.error(
                "Nama lengkap maksimal 100 karakter."
            );

            return;
        }

        /**
         * =================================================
         * VALIDATE EMAIL
         * =================================================
         */

        if (!trimmedEmail) {
            toast.error(
                "Email wajib diisi."
            );

            return;
        }

        const emailIsValid =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                trimmedEmail
            );

        if (!emailIsValid) {
            toast.error(
                "Format email tidak valid."
            );

            return;
        }

        /**
         * =================================================
         * DETECT CHANGES
         * =================================================
         */

        const nameChanged =
            trimmedName !==
            currentName;

        const emailChanged =
            trimmedEmail !==
            currentEmail;

        /**
         * =================================================
         * NO CHANGES
         * =================================================
         */

        if (
            !nameChanged &&
            !emailChanged
        ) {
            toast.info(
                "Tidak ada perubahan."
            );

            return;
        }

        try {
            setSaving(true);

            let nameUpdated =
                false;

            let emailUpdated =
                false;

            /**
             * =================================================
             * UPDATE NAME
             * =================================================
             *
             * Hanya dijalankan jika nama berubah.
             */

            if (nameChanged) {
                await profileService.updateProfile({
                    name: trimmedName,
                });

                nameUpdated = true;
            }

            /**
             * =================================================
             * UPDATE EMAIL
             * =================================================
             *
             * Hanya dijalankan jika email berubah.
             */

            if (emailChanged) {
                await profileService.updateEmail(
                    trimmedEmail
                );

                emailUpdated = true;
            }

            /**
             * =================================================
             * EMAIL BERHASIL DIUBAH
             * =================================================
             *
             * Logout supaya user tidak tetap
             * menggunakan session lama.
             *
             * Login berikutnya harus menggunakan
             * email baru.
             */

            if (emailUpdated) {
    toast.success(
        "Permintaan perubahan email berhasil.",
        {
            description:
                "Silakan buka email baru Anda dan klik tombol konfirmasi. Setelah dikonfirmasi, login menggunakan email baru.",
            duration: 7000,
        }
    );

    await new Promise(
        (resolve) =>
            window.setTimeout(
                resolve,
                1500
            )
    );

    await logoutAfterEmailChange();

    return;
}

            /**
             * =================================================
             * NAME ONLY
             * =================================================
             */

            if (nameUpdated) {
                setName(
                    trimmedName
                );

                setOriginalName(
                    trimmedName
                );

                toast.success(
                    "Nama berhasil diperbarui."
                );
            }
        } catch (error) {
            console.error(
                "Update Profile:",
                error
            );

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Gagal memperbarui profil."
            );
        } finally {
            setSaving(false);
        }
    }

    /**
     * =====================================================
     * LOADING
     * =====================================================
     */

    if (loadingData) {
        return (
            <div
                className="
                    rounded-2xl
                    border
                    bg-white
                    p-6
                    shadow-sm
                "
            >
                <div
                    className="
                        flex
                        min-h-64
                        items-center
                        justify-center
                    "
                >
                    <div
                        className="
                            flex
                            items-center
                            gap-3
                            text-sm
                            text-stone-500
                        "
                    >
                        <Loader2
                            className="
                                h-5
                                w-5
                                animate-spin
                            "
                        />

                        Memuat profil...
                    </div>
                </div>
            </div>
        );
    }

    /**
     * =====================================================
     * UI
     * =====================================================
     */

    return (
        <div
            className="
                rounded-2xl
                border
                bg-white
                p-6
                shadow-sm
            "
        >
            {/* =================================================
                HEADER
            ================================================= */}

            <div className="mb-8">
                <h2
                    className="
                        text-2xl
                        font-bold
                        text-stone-800
                    "
                >
                    Informasi Profil
                </h2>

                <p
                    className="
                        mt-2
                        text-sm
                        text-stone-500
                    "
                >
                    Perbarui nama dan email
                    administrator.
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="space-y-6"
            >
                {/* =================================================
                    NAME
                ================================================= */}

                <div>
                    <label
                        htmlFor="profile-name"
                        className="
                            mb-2
                            flex
                            items-center
                            gap-2
                            font-medium
                            text-stone-800
                        "
                    >
                        <User
                            size={18}
                        />

                        Nama Lengkap
                    </label>

                    <input
                        id="profile-name"
                        type="text"
                        value={name}
                        onChange={(
                            event
                        ) =>
                            setName(
                                event.target.value
                            )
                        }
                        disabled={saving}
                        maxLength={100}
                        autoComplete="name"
                        placeholder="Nama Lengkap"
                        className="
                            w-full
                            rounded-xl
                            border
                            border-stone-200
                            bg-white
                            p-4
                            text-stone-800
                            outline-none
                            transition

                            placeholder:text-stone-400

                            focus:border-amber-500
                            focus:ring-2
                            focus:ring-amber-500/20

                            disabled:cursor-not-allowed
                            disabled:bg-stone-50
                        "
                    />

                    <p
                        className="
                            mt-2
                            text-xs
                            text-stone-500
                        "
                    >
                        Nama administrator
                        yang ditampilkan pada
                        dashboard.
                    </p>
                </div>

                {/* =================================================
                    EMAIL
                ================================================= */}

                <div>
                    <label
                        htmlFor="profile-email"
                        className="
                            mb-2
                            flex
                            items-center
                            gap-2
                            font-medium
                            text-stone-800
                        "
                    >
                        <Mail
                            size={18}
                        />

                        Email
                    </label>

                    <input
                        id="profile-email"
                        type="email"
                        value={email}
                        onChange={(
                            event
                        ) =>
                            setEmail(
                                event.target.value
                            )
                        }
                        disabled={saving}
                        autoComplete="email"
                        placeholder="admin@example.com"
                        className="
                            w-full
                            rounded-xl
                            border
                            border-stone-200
                            bg-white
                            p-4
                            text-stone-800
                            outline-none
                            transition

                            placeholder:text-stone-400

                            focus:border-amber-500
                            focus:ring-2
                            focus:ring-amber-500/20

                            disabled:cursor-not-allowed
                            disabled:bg-stone-50
                        "
                    />

                    <p
                        className="
                            mt-2
                            text-xs
                            leading-5
                            text-stone-500
                        "
                    >
                        Email digunakan untuk
                        login administrator.
                        Jika email diubah, Anda
                        akan logout dan harus
                        login menggunakan email
                        baru.
                    </p>
                </div>

                {/* =================================================
                    SUBMIT
                ================================================= */}

                <div
                    className="
                        flex
                        justify-end
                        pt-2
                    "
                >
                    <button
                        type="submit"
                        disabled={saving}
                        className="
                            inline-flex
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            bg-amber-500
                            px-6
                            py-3
                            font-semibold
                            text-white
                            transition

                            hover:bg-amber-600

                            disabled:cursor-not-allowed
                            disabled:opacity-60
                        "
                    >
                        {saving ? (
                            <>
                                <Loader2
                                    className="
                                        h-5
                                        w-5
                                        animate-spin
                                    "
                                />

                                Menyimpan...
                            </>
                        ) : (
                            <>
                                <Save
                                    size={18}
                                />

                                Simpan Perubahan
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}