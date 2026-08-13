"use client";

import { useEffect, useState } from "react";
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
 * DEFAULT CONTACT
 * =========================================================
 */

const DEFAULT_CONTACT = {
    whatsapp: "+62 877-7610-5547",
    email: "",
    instagram: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    address:
        "Melayani kebutuhan training di seluruh Indonesia.",
    google_maps: "",
};

/**
 * =========================================================
 * HELPERS
 * =========================================================
 */

function getWhatsAppUrl(
    value?: string | null
): string | undefined {
    if (!value?.trim()) {
        return undefined;
    }

    const number = value.replace(/\D/g, "");

    if (!number) {
        return undefined;
    }

    const normalizedNumber =
        number.startsWith("0")
            ? `62${number.slice(1)}`
            : number.startsWith("62")
              ? number
              : `62${number}`;

    return `https://wa.me/${normalizedNumber}`;
}

function getSocialUrl(
    value: string | null | undefined,
    domain: string
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

    const escapedDomain = domain.replace(
        /\./g,
        "\\."
    );

    const username = trimmed
        .replace(/^@/, "")
        .replace(
            new RegExp(
                `^${escapedDomain}/`,
                "i"
            ),
            ""
        )
        .replace(/^\/+/, "");

    if (!username) {
        return undefined;
    }

    return `https://${domain}/${username}`;
}

function getInstagramUrl(
    value?: string | null
): string | undefined {
    return getSocialUrl(
        value,
        "instagram.com"
    );
}

function getFacebookUrl(
    value?: string | null
): string | undefined {
    return getSocialUrl(
        value,
        "facebook.com"
    );
}

function getLinkedinUrl(
    value?: string | null
): string | undefined {
    return getSocialUrl(
        value,
        "linkedin.com"
    );
}

function getYoutubeUrl(
    value?: string | null
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

    if (
        trimmed.startsWith("youtube.com/")
    ) {
        return `https://${trimmed}`;
    }

    if (trimmed.startsWith("@")) {
        return `https://youtube.com/${trimmed}`;
    }

    return `https://youtube.com/@${trimmed}`;
}

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
        return (
            "https://www.google.com/maps/search/" +
            "?api=1&query=" +
            encodeURIComponent(
                address.trim()
            )
        );
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
        useState(false);

    /**
     * =======================================================
     * LOAD PUBLIC SETTINGS
     * =======================================================
     */

    useEffect(() => {
        let mounted = true;

        async function loadSettings() {
            try {
                setLoading(true);
                setError(false);

                const data =
                    await settingService.getPublic();

                if (!mounted) {
                    return;
                }

                setSetting(data);
            } catch (error) {
                console.error(
                    "Load public settings error:",
                    error
                );

                if (!mounted) {
                    return;
                }

                setSetting(null);
                setError(true);
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        }

        loadSettings();

        return () => {
            mounted = false;
        };
    }, []);

    /**
     * =======================================================
     * MERGE SETTINGS
     * =======================================================
     */

    const whatsapp =
        setting?.whatsapp?.trim() ||
        DEFAULT_CONTACT.whatsapp;

    const email =
        setting?.email?.trim() ||
        DEFAULT_CONTACT.email;

    const instagram =
        setting?.instagram?.trim() ||
        DEFAULT_CONTACT.instagram;

    const facebook =
        setting?.facebook?.trim() ||
        DEFAULT_CONTACT.facebook;

    const linkedin =
        setting?.linkedin?.trim() ||
        DEFAULT_CONTACT.linkedin;

    const youtube =
        setting?.youtube?.trim() ||
        DEFAULT_CONTACT.youtube;

    const address =
        setting?.address?.trim() ||
        DEFAULT_CONTACT.address;

    const googleMaps =
        setting?.google_maps?.trim() ||
        DEFAULT_CONTACT.google_maps;

    /**
     * =======================================================
     * BUILD INFORMATION
     * =======================================================
     */

    const informations: ContactInformationItem[] = [];

    if (whatsapp) {
        informations.push({
            icon: MessageCircle,
            title: "WhatsApp",
            value: whatsapp,
            href: getWhatsAppUrl(
                whatsapp
            ),
            description:
                "Hubungi kami untuk konsultasi training, seminar, workshop, coaching, maupun pengembangan SDM.",
        });
    }

    if (email) {
        informations.push({
            icon: Mail,
            title: "Email",
            value: email,
            href: `mailto:${email}`,
            description:
                "Kirim pertanyaan, permintaan penawaran, atau kebutuhan pelatihan perusahaan.",
        });
    }

    if (instagram) {
        informations.push({
            icon: Instagram,
            title: "Instagram",
            value: instagram,
            href: getInstagramUrl(
                instagram
            ),
            description:
                "Ikuti aktivitas training, seminar, motivasi, dan konten edukasi terbaru.",
        });
    }

    if (facebook) {
        informations.push({
            icon: Facebook,
            title: "Facebook",
            value: facebook,
            href: getFacebookUrl(
                facebook
            ),
            description:
                "Lihat dokumentasi kegiatan training dan informasi terbaru melalui Facebook.",
        });
    }

    if (linkedin) {
        informations.push({
            icon: Linkedin,
            title: "LinkedIn",
            value: linkedin,
            href: getLinkedinUrl(
                linkedin
            ),
            description:
                "Terhubung secara profesional dan lihat pengalaman sebagai trainer.",
        });
    }

    if (youtube) {
        informations.push({
            icon: Youtube,
            title: "YouTube",
            value: youtube,
            href: getYoutubeUrl(
                youtube
            ),
            description:
                "Tonton video training, motivasi, public speaking, dan pengembangan SDM.",
        });
    }

    if (address) {
        informations.push({
            icon: MapPin,
            title: "Lokasi",
            value: address,
            href: getGoogleMapsUrl(
                googleMaps,
                address
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
        <div className="min-w-0 w-full space-y-10">
            {/* HEADER */}

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
                className="min-w-0"
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
                        max-w-full
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

            {/* ERROR */}

            {error && (
                <div
                    className="
                        rounded-2xl
                        border
                        border-amber-200
                        bg-amber-50
                        p-4
                        text-sm
                        text-amber-700
                    "
                >
                    Data dari server belum dapat dimuat.
                    Informasi kontak default digunakan.
                </div>
            )}

            {/* LOADING */}

            {loading ? (
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
                            text-slate-500
                        "
                    >
                        <Loader2
                            className="
                                h-5
                                w-5
                                animate-spin
                            "
                        />

                        Memuat informasi kontak...
                    </div>
                </div>
            ) : (
                <>
                    {informations.length > 0 ? (
                        <div
                            className="
                                grid
                                min-w-0
                                w-full
                                gap-6
                            "
                        >
                            {informations.map(
                                (
                                    item,
                                    index
                                ) => {
                                    const Icon =
                                        item.icon;

                                    const card = (
                                        <div
                                            className="
                                                group
                                                flex
                                                min-w-0
                                                w-full
                                                gap-4
                                                overflow-hidden
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
                                            "
                                        >
                                            {/* ICON */}

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
                                                <Icon
                                                    className="
                                                        h-7
                                                        w-7
                                                    "
                                                />
                                            </div>

                                            {/* CONTENT */}

                                            <div
                                                className="
                                                    min-w-0
                                                    flex-1
                                                "
                                            >
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
                                                        min-w-0
                                                        break-words
                                                        [overflow-wrap:anywhere]
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
                                                        break-words
                                                        leading-7
                                                        text-slate-600
                                                    "
                                                >
                                                    {
                                                        item.description
                                                    }
                                                </p>
                                            </div>

                                            {/* ARROW */}

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
                                            className="min-w-0 w-full"
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
                                                <a
                                                    href={
                                                        item.href
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="
                                                        block
                                                        min-w-0
                                                        w-full
                                                    "
                                                >
                                                    {card}
                                                </a>
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
                            Informasi kontak belum
                            tersedia.
                        </div>
                    )}
                </>
            )}
        </div>
    );
}