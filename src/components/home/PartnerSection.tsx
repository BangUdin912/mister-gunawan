"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { supabase } from "@/lib/supabase/client";

import { getPartnerLogoUrl } from "@/lib/storage";

import type { Partner } from "@/types/partner";

/* =========================================================
   LOGO CARD
========================================================= */

function LogoCard({
    item,
}: {
    item: Partner;
}) {
    const logo = getPartnerLogoUrl(
        item.logo,
        item.category
    );

    /**
     * Website dari database
     */
    const website = item.website?.trim() || null;

    /**
     * Pastikan URL memiliki protocol.
     *
     * Contoh:
     * company.com
     * menjadi
     * https://company.com
     */
    const websiteUrl = website
        ? /^https?:\/\//i.test(website)
            ? website
            : `https://${website}`
        : null;

    /**
     * Isi card
     */
    const cardContent = (
        <div
            className="
                flex
                h-40
                w-72
                shrink-0
                items-center
                justify-center
                rounded-3xl
                border
                border-slate-200
                bg-white
                p-8
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-blue-200
                hover:shadow-xl
            "
        >
            {logo ? (
                <Image
                    src={logo}
                    alt={`Logo ${item.name}`}
                    width={220}
                    height={120}
                    className="
                        max-h-full
                        max-w-full
                        object-contain
                    "
                    loading="lazy"
                />
            ) : (
                <span
                    className="
                        text-sm
                        text-muted-foreground
                    "
                >
                    Logo tidak tersedia
                </span>
            )}
        </div>
    );

    /**
     * Jika memiliki website,
     * seluruh card menjadi clickable.
     */
    if (websiteUrl) {
        return (
            <a
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={`Kunjungi website ${item.name}`}
                aria-label={`Kunjungi website ${item.name}`}
                className="
                    block
                    shrink-0
                    rounded-3xl
                    outline-none
                    focus-visible:ring-2
                    focus-visible:ring-blue-500
                    focus-visible:ring-offset-2
                "
            >
                {cardContent}
            </a>
        );
    }

    /**
     * Jika tidak memiliki website,
     * tampilkan sebagai card biasa.
     */
    return cardContent;
}

/* =========================================================
   LOGO MARQUEE
========================================================= */

function LogoMarquee({
    items,
    reverse = false,
}: {
    items: Partner[];
    reverse?: boolean;
}) {
    if (items.length === 0) {
        return null;
    }

    /**
     * Jika data sedikit,
     * tampilkan normal agar tidak terlihat double.
     */
    if (items.length < 5) {
        return (
            <div
                className="
                    flex
                    flex-wrap
                    justify-center
                    gap-8
                "
            >
                {items.map((item) => (
                    <LogoCard
                        key={item.id}
                        item={item}
                    />
                ))}
            </div>
        );
    }

    /**
     * Jika data cukup banyak,
     * gunakan marquee.
     */
    return (
        <div
            className="
                overflow-hidden
                py-2
            "
        >
            <div
                className={`
                    flex
                    w-max
                    gap-8
                    ${
                        reverse
                            ? "animate-marquee-reverse"
                            : "animate-marquee"
                    }
                `}
            >
                {[...items, ...items].map(
                    (item, index) => (
                        <LogoCard
                            key={`${item.id}-${index}`}
                            item={item}
                        />
                    )
                )}
            </div>
        </div>
    );
}

/* =========================================================
   PARTNER SECTION
========================================================= */

export default function PartnerSection() {
    const [partners, setPartners] =
        useState<Partner[]>([]);

    const [clients, setClients] =
        useState<Partner[]>([]);

    const [loading, setLoading] =
        useState(true);

    /* =====================================================
       FETCH PARTNERS
    ===================================================== */

    useEffect(() => {
        async function fetchPartners() {
            try {
                const {
                    data,
                    error,
                } = await supabase
                    .from("partners")
                    .select(`
                        id,
                        name,
                        logo,
                        website,
                        category,
                        is_active,
                        order_number
                    `)
                    .eq(
                        "is_active",
                        true
                    )
                    .order(
                        "order_number",
                        {
                            ascending: true,
                        }
                    );

                if (error) {
                    throw error;
                }

                const rows =
                    (data ?? []) as Partner[];

                setPartners(
                    rows.filter(
                        (item) =>
                            item.category ===
                            "partner"
                    )
                );

                setClients(
                    rows.filter(
                        (item) =>
                            item.category ===
                            "client"
                    )
                );
            } catch (error) {
                console.error(
                    "Load partner error:",
                    error
                );
            } finally {
                setLoading(false);
            }
        }

        fetchPartners();
    }, []);

    /* =====================================================
       LOADING
    ===================================================== */

    if (loading) {
        return null;
    }

    /* =====================================================
       RENDER
    ===================================================== */

    return (
        <section
            className="
                bg-white
                py-24
            "
        >
            <div
                className="
                    mx-auto
                    max-w-7xl
                    px-6
                "
            >
                {/* =================================================
                    HEADER
                ================================================= */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 25,
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
                    className="
                        mx-auto
                        max-w-3xl
                        text-center
                    "
                >
                    <span
                        className="
                            rounded-full
                            bg-blue-100
                            px-4
                            py-2
                            text-sm
                            font-semibold
                            text-blue-700
                        "
                    >
                        Dipercaya Berbagai Instansi
                    </span>

                    <h2
                        className="
                            mt-6
                            text-4xl
                            font-bold
                            text-slate-900
                            lg:text-5xl
                        "
                    >
                        Mitra Bisnis & Klien HSS
                    </h2>

                    <p
                        className="
                            mt-6
                            text-lg
                            leading-8
                            text-slate-600
                        "
                    >
                        Hartawan Sukses Sejahtera
                        dipercaya oleh berbagai
                        perusahaan, instansi pemerintah,
                        universitas, sekolah, dan
                        organisasi.
                    </p>
                </motion.div>

                {/* =================================================
                    PARTNER
                ================================================= */}

                {partners.length > 0 && (
                    <div className="mt-20">
                        <h3
                            className="
                                mb-8
                                text-center
                                text-3xl
                                font-bold
                                text-slate-900
                            "
                        >
                            Mitra Bisnis
                        </h3>

                        <LogoMarquee
                            items={partners}
                        />
                    </div>
                )}

                {/* =================================================
                    CLIENT
                ================================================= */}

                {clients.length > 0 && (
                    <div className="mt-24">
                        <h3
                            className="
                                mb-10
                                text-center
                                text-3xl
                                font-bold
                                text-slate-900
                            "
                        >
                            Klien HSS
                        </h3>

                        <LogoMarquee
                            items={clients}
                            reverse
                        />
                    </div>
                )}
            </div>
        </section>
    );
}