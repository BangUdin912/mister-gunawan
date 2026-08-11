"use client";

import {
    useEffect,
    useState,
} from "react";

import Image from "next/image";

import {
    Loader2,
    UserCircle2,
} from "lucide-react";

import { profileService } from "@/lib/profileService";

import type { Profile } from "@/types/profile";

export default function AccountHeader() {
    const [profile, setProfile] =
        useState<Profile | null>(null);

    const [email, setEmail] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    /**
     * =====================================================
     * LOAD PROFILE
     * =====================================================
     */
    async function loadProfile() {
        try {
            setLoading(true);

            const [
                user,
                profileData,
            ] = await Promise.all([
                profileService.getUser(),
                profileService.getProfile(),
            ]);

            setEmail(
                user?.email ?? ""
            );

            setProfile(
                profileData
            );
        } catch (error) {
            console.error(
                "Load Account Profile:",
                error
            );
        } finally {
            setLoading(false);
        }
    }

    /**
     * =====================================================
     * INITIAL LOAD
     * =====================================================
     */
    useEffect(() => {
        loadProfile();
    }, []);

    /**
     * =====================================================
     * LISTEN AVATAR UPDATE
     * =====================================================
     *
     * AvatarUpload mengirim:
     *
     * profile:avatar-updated
     *
     * Setelah event diterima, AccountHeader
     * langsung mengganti avatar.
     */
    useEffect(() => {
        function handleAvatarUpdated(
            event: Event
        ) {
            const customEvent =
                event as CustomEvent<{
                    avatarUrl?: string;
                }>;

            const avatarUrl =
                customEvent.detail?.avatarUrl;

            if (!avatarUrl) {
                return;
            }

            setProfile(
                (previous) => {
                    if (!previous) {
                        return previous;
                    }

                    return {
                        ...previous,
                        avatar_url:
                            avatarUrl,
                    };
                }
            );
        }

        window.addEventListener(
            "profile:avatar-updated",
            handleAvatarUpdated
        );

        return () => {
            window.removeEventListener(
                "profile:avatar-updated",
                handleAvatarUpdated
            );
        };
    }, []);

    /**
     * =====================================================
     * LOADING
     * =====================================================
     */
    if (loading) {
        return (
            <div
                className="
                    flex
                    min-h-40
                    items-center
                    justify-center
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

                    <span>
                        Memuat informasi akun...
                    </span>
                </div>
            </div>
        );
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
     * ROLE
     * =====================================================
     */
    const role =
        profile?.role?.trim() ||
        "admin";

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
            <div
                className="
                    flex
                    flex-col
                    items-center
                    gap-6
                    md:flex-row
                "
            >

                {/* =================================================
                    AVATAR
                ================================================= */}

                <div
                    className="
                        relative
                        h-28
                        w-28
                        shrink-0
                        overflow-hidden
                        rounded-full
                        border-4
                        border-stone-100
                        bg-stone-100
                    "
                >
                    {profile?.avatar_url ? (
                        <Image
                            src={
                                profile.avatar_url
                            }
                            alt={`Avatar ${name}`}
                            fill
                            sizes="112px"
                            unoptimized
                            className="object-cover"
                        />
                    ) : (
                        <div
                            className="
                                flex
                                h-full
                                w-full
                                items-center
                                justify-center
                                bg-stone-100
                                text-3xl
                                font-bold
                                text-stone-500
                            "
                        >
                            {initials}
                        </div>
                    )}
                </div>

                {/* =================================================
                    INFORMATION
                ================================================= */}

                <div
                    className="
                        flex-1
                        text-center
                        md:text-left
                    "
                >
                    {/* Role */}

                    <div
                        className="
                            flex
                            items-center
                            justify-center
                            gap-2
                            text-sm
                            font-medium
                            uppercase
                            tracking-wider
                            text-amber-600
                            md:justify-start
                        "
                    >
                        <UserCircle2
                            className="
                                h-4
                                w-4
                            "
                        />

                        <span>
                            {role}
                        </span>
                    </div>

                    {/* Name */}

                    <h1
                        className="
                            mt-2
                            text-2xl
                            font-bold
                            text-stone-800
                            md:text-3xl
                        "
                    >
                        {name}
                    </h1>

                    {/* Email */}

                    <p
                        className="
                            mt-2
                            break-all
                            text-stone-500
                        "
                    >
                        {email ||
                            "Email tidak tersedia"}
                    </p>

                    {/* Description */}

                    <p
                        className="
                            mt-4
                            max-w-2xl
                            text-sm
                            leading-6
                            text-stone-500
                        "
                    >
                        Kelola informasi akun
                        administrator, ubah foto
                        profil, email, dan pengaturan
                        akun melalui halaman ini.
                    </p>
                </div>
            </div>
        </div>
    );
}