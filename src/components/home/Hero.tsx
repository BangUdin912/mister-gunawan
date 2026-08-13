"use client";

import Link from "next/link";
import {
    ArrowRight,
    PlayCircle,
    Star,
} from "lucide-react";
import { motion } from "framer-motion";

const HERO_IMAGE =
    "/images/hero/hero.jpeg";

export default function Hero() {
    return (
        <section
            className="
                relative
                isolate
                min-h-screen
                overflow-hidden
                bg-slate-950
            "
        >
            {/* =====================================================
                BACKGROUND IMAGE
            ===================================================== */}

            <div
                aria-hidden="true"
                className="
                    absolute
                    inset-0
                    z-0
                    scale-105
                    bg-cover
                    bg-center
                    bg-no-repeat
                "
                style={{
                    backgroundImage: `url("${HERO_IMAGE}")`,
                }}
            />

            {/* =====================================================
                DARK OVERLAY
            ===================================================== */}

            <div
                aria-hidden="true"
                className="
                    absolute
                    inset-0
                    z-10
                    bg-black/55
                "
            />

            {/* =====================================================
                GRADIENT OVERLAY
            ===================================================== */}

            <div
                aria-hidden="true"
                className="
                    absolute
                    inset-0
                    z-10
                    bg-gradient-to-r
                    from-slate-950/95
                    via-slate-900/70
                    to-blue-950/40
                "
            />

            {/* =====================================================
                CONTENT
            ===================================================== */}

            <div
                className="
                    relative
                    z-20
                    mx-auto
                    flex
                    min-h-screen
                    w-full
                    max-w-7xl
                    items-center
                    px-6
                    pb-16
                    pt-32
                    lg:px-8
                "
            >
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 40,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.7,
                        ease: "easeOut",
                    }}
                    className="
                        max-w-3xl
                    "
                >
                    {/* =================================================
                        BADGE
                    ================================================= */}

                    <div
                        className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-blue-400/30
                            bg-blue-500/10
                            px-5
                            py-3
                            backdrop-blur-md
                        "
                    >
                        <Star
                            className="
                                h-4
                                w-4
                                fill-yellow-400
                                text-yellow-400
                            "
                        />

                        <span
                            className="
                                text-sm
                                font-semibold
                                tracking-wide
                                text-white
                            "
                        >
                            Professional Trainer •
                            Public Speaker • Coach
                        </span>
                    </div>

                    {/* =================================================
                        HEADING
                    ================================================= */}

                    <h1
                        className="
                            mt-8
                            text-5xl
                            font-extrabold
                            leading-tight
                            text-white
                            sm:text-6xl
                            md:text-6xl
                            lg:text-7xl
                        "
                    >
                        Membangun

                        <span
                            className="
                                block
                                bg-gradient-to-r
                                from-sky-300
                                to-blue-500
                                bg-clip-text
                                text-transparent
                            "
                        >
                            SDM Berkualitas
                        </span>

                        Bersama Mister Gunawan
                    </h1>

                    {/* =================================================
                        DESCRIPTION
                    ================================================= */}

                    <p
                        className="
                            mt-8
                            max-w-2xl
                            text-lg
                            leading-9
                            text-slate-200
                        "
                    >
                        Professional Trainer, Public Speaker,
                        Coach, dan Consultant melalui{" "}
                        <strong>
                            Hartawan Sukses Sejahtera (HSS)
                        </strong>{" "}
                        yang membantu perusahaan, instansi,
                        organisasi, maupun komunitas meningkatkan
                        kualitas pelayanan, leadership, komunikasi,
                        motivasi, dan budaya kerja.
                    </p>

                    {/* =================================================
                        CTA
                    ================================================= */}

                    <div
                        className="
                            mt-10
                            flex
                            flex-wrap
                            gap-5
                        "
                    >
                        <Link
                            href="/contact"
                            className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-full
                                bg-blue-600
                                px-8
                                py-4
                                font-semibold
                                text-white
                                shadow-lg
                                shadow-blue-600/30
                                transition-all
                                duration-300
                                hover:-translate-y-1
                                hover:bg-blue-700
                            "
                        >
                            Konsultasi Gratis

                            <ArrowRight
                                className="
                                    h-5
                                    w-5
                                "
                            />
                        </Link>

                        <Link
                            href="/services"
                            className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-full
                                border
                                border-white/20
                                bg-white/10
                                px-8
                                py-4
                                font-semibold
                                text-white
                                backdrop-blur
                                transition-all
                                duration-300
                                hover:bg-blue-500/15
                            "
                        >
                            <PlayCircle
                                className="
                                    h-5
                                    w-5
                                "
                            />

                            Lihat Layanan
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* =====================================================
                BOTTOM FADE
            ===================================================== */}


        </section>
    );
}