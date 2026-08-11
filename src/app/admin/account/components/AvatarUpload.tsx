"use client";

import {
    useEffect,
    useRef,
    useState,
} from "react";

import Image from "next/image";

import {
    Camera,
    Loader2,
    UserCircle2,
} from "lucide-react";

import { toast } from "sonner";

import { profileService } from "@/lib/profileService";

import type { Profile } from "@/types/profile";

export default function AvatarUpload() {
    const inputRef =
        useRef<HTMLInputElement | null>(null);

    const [profile, setProfile] =
        useState<Profile | null>(null);

    const [loading, setLoading] =
        useState(true);

    const [uploading, setUploading] =
        useState(false);

    /**
     * =====================================================
     * LOAD PROFILE
     * =====================================================
     */
    async function loadProfile() {
        try {
            setLoading(true);

            const data =
                await profileService.getProfile();

            setProfile(data);
        } catch (error) {
            console.error(
                "Load Avatar error:",
                error instanceof Error
                    ? error.message
                    : error
            );

            toast.error(
                "Gagal memuat foto profil."
            );
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadProfile();
    }, []);

    /**
     * =====================================================
     * UPLOAD AVATAR
     * =====================================================
     */
    async function handleUpload(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const file =
            event.target.files?.[0];

        /**
         * Reset input.
         *
         * Supaya file yang sama dapat
         * dipilih kembali.
         */
        event.target.value = "";

        if (!file) {
            return;
        }

        /**
         * =================================================
         * VALIDASI TYPE
         * =================================================
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
            toast.error(
                "Gunakan format JPG, PNG, atau WebP."
            );

            return;
        }

        /**
         * =================================================
         * VALIDASI SIZE
         * =================================================
         */
        if (
            file.size >
            2 * 1024 * 1024
        ) {
            toast.error(
                "Ukuran foto maksimal 2 MB."
            );

            return;
        }

        try {
            setUploading(true);

            /**
             * Upload ke Supabase.
             *
             * Service harus:
             *
             * 1. upload file
             * 2. mendapatkan public URL
             * 3. menyimpan URL ke profiles.avatar_url
             * 4. return URL tersebut
             */
            const avatarUrl =
                await profileService.updateAvatar(
                    file
                );

            /**
             * Cache buster.
             *
             * Jika file di-upload ke URL/path
             * yang sama, browser bisa menggunakan
             * cache gambar lama.
             */
            const displayAvatarUrl =
                `${avatarUrl}${
                    avatarUrl.includes("?")
                        ? "&"
                        : "?"
                }v=${Date.now()}`;

            /**
             * Update state AvatarUpload.
             */
            setProfile(
                (previous) => {
                    if (!previous) {
                        return previous;
                    }

                    return {
                        ...previous,
                        avatar_url:
                            displayAvatarUrl,
                    };
                }
            );

            /**
             * =================================================
             * NOTIFY ACCOUNT HEADER
             * =================================================
             *
             * AccountHeader akan menerima event ini
             * dan mengganti avatar secara otomatis.
             */
            window.dispatchEvent(
                new CustomEvent(
                    "profile:avatar-updated",
                    {
                        detail: {
                            avatarUrl:
                                displayAvatarUrl,
                        },
                    }
                )
            );

            toast.success(
                "Foto profil berhasil diperbarui."
            );
        } catch (error) {
            console.error(
                "Update Avatar error:",
                error instanceof Error
                    ? error.message
                    : error
            );

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Gagal mengupload foto profil."
            );
        } finally {
            setUploading(false);
        }
    }

    /**
     * =====================================================
     * NAME
     * =====================================================
     */
    const name =
        profile?.name?.trim() ||
        "Admin";

    /**
     * =====================================================
     * INITIALS
     * =====================================================
     */
    const initials =
        name
            .split(/\s+/)
            .filter(Boolean)
            .map(
                (item) =>
                    item.charAt(0)
            )
            .join("")
            .slice(0, 2)
            .toUpperCase() ||
        "A";

    /**
     * =====================================================
     * LOADING
     * =====================================================
     */
    if (loading) {
        return (
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
                <div className="flex min-h-56 items-center justify-center">
                    <div className="flex items-center gap-3 text-sm text-stone-500">
                        <Loader2 className="h-5 w-5 animate-spin" />

                        Memuat foto profil...
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
        <div className="rounded-2xl border bg-white p-6 shadow-sm">

            {/* Header */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-stone-800">
                    Foto Profil
                </h2>

                <p className="mt-2 text-sm text-stone-500">
                    Upload foto profil administrator.
                </p>
            </div>

            {/* Avatar */}
            <div className="flex flex-col items-center">

                <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-stone-200 bg-stone-100">

                    {profile?.avatar_url ? (
                        <Image
                            src={
                                profile.avatar_url
                            }
                            alt={`Avatar ${name}`}
                            fill
                            sizes="160px"
                            unoptimized
                            className="object-cover"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-5xl font-bold text-stone-500">
                            {initials}
                        </div>
                    )}

                    {/* Upload overlay */}
                    {uploading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                            <Loader2 className="h-8 w-8 animate-spin text-white" />
                        </div>
                    )}
                </div>

                {/* Upload Button */}
                <button
                    type="button"
                    disabled={uploading}
                    onClick={() =>
                        inputRef.current?.click()
                    }
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 font-semibold text-white transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {uploading ? (
                        <>
                            <Loader2 className="h-5 w-5 animate-spin" />

                            Mengupload...
                        </>
                    ) : (
                        <>
                            <Camera className="h-5 w-5" />

                            Ganti Foto
                        </>
                    )}
                </button>

                {/* Hidden input */}
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    hidden
                    onChange={handleUpload}
                    disabled={uploading}
                />

                {/* Description */}
                <div className="mt-4 flex items-center gap-2 text-center text-xs text-stone-500">
                    <UserCircle2 className="h-4 w-4 shrink-0" />

                    <span>
                        JPG, PNG, atau WebP.
                        Maksimal 2 MB.
                    </span>
                </div>
            </div>
        </div>
    );
}