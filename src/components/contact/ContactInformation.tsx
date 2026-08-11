"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { motion } from "framer-motion";

import {
    ArrowUpRight,
    Facebook,
    Instagram,
    Linkedin,
    Loader2,
    Mail,
    MapPin,
    MessageCircle,
    Youtube,
    type LucideIcon,
} from "lucide-react";

import { settingService } from "@/lib/settingService";

import type { Setting } from "@/types/setting";

interface ContactInformationItem {
    icon: LucideIcon;
    title: string;
    value: string;
    description: string;
    href?: string;
}

/**
 * =========================================================
 * HELPERS
 * =========================================================
 */

/**
 * Mengubah nomor WhatsApp menjadi format wa.me
 *
 * Contoh:
 * +62 877-7610-5547
 * =>
 * https://wa.me/6287776105547
 */
function getWhatsAppUrl(
    value: string | null | undefined
): string | undefined {
    if (!value?.trim()) {
        return undefined;
    }

    const number = value.replace(/\D/g, "");

    if (!number) {
        return undefined;
    }

    /**
     * Jika nomor dimulai dengan 0,
     * ubah menjadi 62.
     */
    const normalizedNumber =
        number.startsWith("0")
            ? `62${number.slice(1)}`
            : number.startsWith("62")
              ? number
              : `62${number}`;

    return `https://wa.me/${normalizedNumber}`;
}

/**
 * Mengubah username / URL Instagram
 * menjadi URL lengkap.
 *
 * @mistergunawan
 * =>
 * https://instagram.com/mistergunawan
 */
function getInstagramUrl(
    value: string | null | undefined
): string | undefined {
    if (!value?.trim()) {
        return undefined;
    }

    const trimmed = value.trim();

    if (
        trimmed.startsWith("http://") ||
        trimmed.startsWith("https://")
    ) {
        return trimmed;
    }

    const username = trimmed.replace(/^@/, "");

    return `https://instagram.com/${username}`;
}

/**
 * Facebook
 */
function getFacebookUrl(
    value: string | null | undefined
): string | undefined {
    if (!value?.trim()) {
        return undefined;
    }

    const trimmed = value.trim();

    if (
        trimmed.startsWith("http://") ||
        trimmed.startsWith("https://")
    ) {
        return trimmed;
    }

    return `https://facebook.com/${trimmed
        .replace(/^\/+/, "")
        .replace(/^facebook\.com\//i, "")}`;
}

/**
 * LinkedIn
 */
function getLinkedinUrl(
    value: string | null | undefined
): string | undefined {
    if (!value?.trim()) {
        return undefined;
    }

    const trimmed = value.trim();

    if (
        trimmed.startsWith("http://") ||
        trimmed.startsWith("https://")
    ) {
        return trimmed;
    }

    return `https://linkedin.com/${trimmed
        .replace(/^\/+/, "")
        .replace(/^linkedin\.com\//i, "")}`;
}

/**
 * YouTube
 */
function getYoutubeUrl(
    value: string | null | undefined
): string | undefined {
    if (!value?.trim()) {
        return undefined;
    }

    const trimmed = value.trim();

    if (
        trimmed.startsWith("http://") ||
        trimmed.startsWith("https://")
    ) {
        return trimmed;
    }

    /**
     * Jika admin mengisi:
     * @mistergunawan
     */
    if (trimmed.startsWith("@")) {
        return `https://youtube.com/${trimmed}`;
    }

    /**
     * Jika admin hanya mengisi:
     * youtube.com/@mistergunawan
     */
    if (
        trimmed.startsWith("youtube.com/")
    ) {
        return `https://${trimmed}`;
    }

    return `https://youtube.com/@${trimmed}`;
}

/**
 * Google Maps
 *
 * Jika admin memasukkan URL,
 * gunakan URL tersebut.
 *
 * Jika kosong tetapi address tersedia,
 * buat pencarian Google Maps berdasarkan alamat.
 */
function getGoogleMapsUrl(
    value: string | null | undefined,
    address: string | null | undefined
): string | undefined {
    if (value?.trim()) {
        const trimmed = value.trim();

        if (
            trimmed.startsWith("http://") ||
            trimmed.startsWith("https://")
        ) {
            return trimmed;
        }

        return `https://${trimmed}`;
    }

    if (address?.trim()) {
        return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            address.trim()
        )}`;
    }

    return undefined;
}

/**
 * =========================================================
 * COMPONENT
 * =========================================================
 */

export default function ContactInformation() {
    const [setting, setSetting] =
        useState<Setting | null>(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState<string | null>(null);

    /**
     * =======================================================
     * LOAD DATA SUPABASE
     * =======================================================
     */

    useEffect(() => {
        let mounted = true;

        async function loadContactInformation() {
            try {
                setLoading(true);
                setError(null);

                const data =
                    await settingService.get();

                if (!mounted) {
                    return;
                }

                setSetting(data);
            } catch (error) {
                console.error(
                    "Load Contact Information error:",
                    error
                );

                if (!mounted) {
                    return;
                }

                setError(
                    error instanceof Error
                        ? error.message
                        : "Gagal memuat informasi kontak."
                );
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        }

        loadContactInformation();

        return () => {
            mounted = false;
        };
    }, []);

    /**
     * =======================================================
     * LOADING
     * =======================================================
     */

    if (loading) {
        return (
            <div className="flex min-h-64 items-center justify-center">
                <div className="flex items-center gap-3 text-sm text-slate-500">
                    <Loader2 className="h-5 w-5 animate-spin" />

                    Memuat informasi kontak...
                </div>
            </div>
        );
    }

    /**
     * =======================================================
     * ERROR
     * =======================================================
     */

    if (error) {
        return (
            <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-sm text-red-600">
                Gagal memuat informasi kontak.
            </div>
        );
    }

    /**
     * Jika data settings belum tersedia.
     */
    if (!setting) {
        return (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
                Informasi kontak belum tersedia.
            </div>
        );
    }

    /**
     * =======================================================
     * BUILD CONTACT INFORMATION
     * =======================================================
     */

    const informations: ContactInformationItem[] = [];

    /**
     * WhatsApp
     */
    if (setting.whatsapp?.trim()) {
        informations.push({
            icon: MessageCircle,
            title: "WhatsApp",
            value: setting.whatsapp,
            href: getWhatsAppUrl(
                setting.whatsapp
            ),
            description:
                "Hubungi kami untuk konsultasi training, seminar, workshop, coaching, maupun pengembangan SDM.",
        });
    }

    /**
     * Email
     */
    if (setting.email?.trim()) {
        informations.push({
            icon: Mail,
            title: "Email",
            value: setting.email,
            href: `mailto:${setting.email.trim()}`,
            description:
                "Kirim pertanyaan, permintaan penawaran, atau kebutuhan pelatihan perusahaan.",
        });
    }

    /**
     * Instagram
     */
    if (setting.instagram?.trim()) {
        informations.push({
            icon: Instagram,
            title: "Instagram",
            value: setting.instagram,
            href: getInstagramUrl(
                setting.instagram
            ),
            description:
                "Ikuti aktivitas training, seminar, motivasi, dan konten edukasi terbaru.",
        });
    }

    /**
     * Facebook
     */
    if (setting.facebook?.trim()) {
        informations.push({
            icon: Facebook,
            title: "Facebook",
            value: setting.facebook,
            href: getFacebookUrl(
                setting.facebook
            ),
            description:
                "Lihat dokumentasi kegiatan training dan informasi terbaru melalui Facebook.",
        });
    }

    /**
     * LinkedIn
     */
    if (setting.linkedin?.trim()) {
        informations.push({
            icon: Linkedin,
            title: "LinkedIn",
            value: setting.linkedin,
            href: getLinkedinUrl(
                setting.linkedin
            ),
            description:
                "Terhubung secara profesional dan lihat pengalaman sebagai trainer.",
        });
    }

    /**
     * YouTube
     */
    if (setting.youtube?.trim()) {
        informations.push({
            icon: Youtube,
            title: "YouTube",
            value: setting.youtube,
            href: getYoutubeUrl(
                setting.youtube
            ),
            description:
                "Tonton video training, motivasi, public speaking, dan pengembangan SDM.",
        });
    }

    /**
     * Lokasi
     */
    if (setting.address?.trim()) {
        informations.push({
            icon: MapPin,
            title: "Lokasi",
            value: setting.address,
            href: getGoogleMapsUrl(
                setting.google_maps,
                setting.address
            ),
            description:
                "Melayani training secara offline maupun online di seluruh Indonesia.",
        });
    }

    /**
     * =======================================================
     * RENDER
     * =======================================================
     */

    return (
        <div className="space-y-10">

            {/* =================================================
                HEADER
            ================================================= */}

            <motion.div
                initial={{
                    opacity: 0,
                    y: 20,
                }}
                whileInView={{
                    opacity: 1,
                    y: 0,
                }}
                viewport={{
                    once: true,
                }}
                transition={{
                    duration: 0.5,
                }}
            >
                <span
                    className="
                        inline-flex
                        rounded-full
                        border
                        border-blue-200
                        bg-blue-50
                        px-4
                        py-2
                        text-sm
                        font-semibold
                        text-blue-700
                    "
                >
                    Informasi Kontak
                </span>

                <h2
                    className="
                        mt-5
                        text-4xl
                        font-bold
                        tracking-tight
                        text-slate-900
                    "
                >
                    Kami Siap Membantu Anda
                </h2>

                <p
                    className="
                        mt-5
                        max-w-2xl
                        text-lg
                        leading-8
                        text-slate-600
                    "
                >
                    Konsultasikan kebutuhan training,
                    seminar, workshop, coaching, maupun
                    pengembangan SDM bersama Mister
                    Gunawan dan Hartawan Sukses
                    Sejahtera.
                </p>
            </motion.div>

            {/* =================================================
                CONTACT LIST
            ================================================= */}

            {informations.length > 0 ? (
                <div className="grid gap-6">
                    {informations.map(
                        (item, index) => {
                            const Icon =
                                item.icon;

                            const card = (
                                <div
                                    className={`
                                        group
                                        flex
                                        gap-5
                                        rounded-3xl
                                        border
                                        border-slate-200
                                        bg-white
                                        p-6
                                        shadow-sm
                                        transition-all
                                        duration-300
                                        hover:-translate-y-1
                                        hover:border-blue-200
                                        hover:shadow-xl
                                        ${
                                            item.href
                                                ? "cursor-pointer"
                                                : ""
                                        }
                                    `}
                                >
                                    {/* Icon */}

                                    <div
                                        className="
                                            flex
                                            h-14
                                            w-14
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-2xl
                                            bg-blue-50
                                            text-blue-600
                                            transition-all
                                            duration-300
                                            group-hover:bg-blue-600
                                            group-hover:text-white
                                        "
                                    >
                                        <Icon className="h-7 w-7" />
                                    </div>

                                    {/* Content */}

                                    <div className="min-w-0 flex-1">
                                        <p
                                            className="
                                                text-sm
                                                font-medium
                                                text-slate-500
                                            "
                                        >
                                            {
                                                item.title
                                            }
                                        </p>

                                        <h3
                                            className="
                                                mt-1
                                                break-words
                                                text-lg
                                                font-semibold
                                                text-slate-900
                                            "
                                        >
                                            {
                                                item.value
                                            }
                                        </h3>

                                        <p
                                            className="
                                                mt-2
                                                leading-7
                                                text-slate-600
                                            "
                                        >
                                            {
                                                item.description
                                            }
                                        </p>
                                    </div>

                                    {/* Arrow */}

                                    {item.href && (
                                        <ArrowUpRight
                                            className="
                                                mt-1
                                                h-5
                                                w-5
                                                shrink-0
                                                text-slate-400
                                                transition-all
                                                duration-300
                                                group-hover:-translate-y-1
                                                group-hover:translate-x-1
                                                group-hover:text-blue-600
                                            "
                                        />
                                    )}
                                </div>
                            );

                            return (
                                <motion.div
                                    key={`${item.title}-${index}`}
                                    initial={{
                                        opacity: 0,
                                        x: -20,
                                    }}
                                    whileInView={{
                                        opacity: 1,
                                        x: 0,
                                    }}
                                    viewport={{
                                        once: true,
                                    }}
                                    transition={{
                                        duration: 0.4,
                                        delay:
                                            index *
                                            0.08,
                                    }}
                                >
                                    {item.href ? (
                                        <Link
                                            href={
                                                item.href
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block"
                                        >
                                            {card}
                                        </Link>
                                    ) : (
                                        card
                                    )}
                                </motion.div>
                            );
                        }
                    )}
                </div>
            ) : (
                <div
                    className="
                        rounded-3xl
                        border
                        border-slate-200
                        bg-white
                        p-8
                        text-center
                        text-slate-500
                    "
                >
                    Informasi kontak belum diatur
                    oleh administrator.
                </div>
            )}
        </div>
    );
}