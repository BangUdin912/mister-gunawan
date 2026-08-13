"use client";

import { motion } from "framer-motion";

import ContactInformation from "./ContactInformation";
import ContactForm from "./ContactForm";

export default function ContactSection() {
    return (
        <section
            id="contact-form"
            className="
                relative
                overflow-hidden
                bg-slate-50
                py-20
                lg:py-24
            "
        >
            {/* =========================================================
                BACKGROUND DECORATION
            ========================================================= */}

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    overflow-hidden
                "
            >
                <div
                    className="
                        absolute
                        -left-24
                        top-10
                        h-72
                        w-72
                        rounded-full
                        bg-blue-100/60
                        blur-3xl
                    "
                />

                <div
                    className="
                        absolute
                        -right-24
                        bottom-0
                        h-96
                        w-96
                        rounded-full
                        bg-slate-200/60
                        blur-3xl
                    "
                />
            </div>

            {/* =========================================================
                MAIN CONTAINER
            ========================================================= */}

            <div
                className="
                    relative
                    mx-auto
                    w-full
                    max-w-7xl
                    px-4
                    sm:px-6
                    lg:px-8
                "
            >
                {/* =====================================================
                    HEADER
                ===================================================== */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 24,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: true,
                        amount: 0.2,
                    }}
                    transition={{
                        duration: 0.5,
                        ease: "easeOut",
                    }}
                    className="
                        mx-auto
                        max-w-3xl
                        text-center
                    "
                >
                    <h2
                        className="
                            text-3xl
                            font-bold
                            tracking-tight
                            text-slate-900
                            sm:text-4xl
                            lg:text-5xl
                        "
                    >
                        Mari Diskusikan Kebutuhan
                        <span
                            className="
                                block
                                text-blue-600
                            "
                        >
                            Pengembangan SDM Anda
                        </span>
                    </h2>

                    <p
                        className="
                            mx-auto
                            mt-5
                            max-w-2xl
                            text-base
                            leading-7
                            text-slate-600
                            sm:text-lg
                            sm:leading-8
                        "
                    >
                        Tim Hartawan Sukses Sejahtera siap
                        membantu merancang program training
                        yang sesuai dengan kebutuhan
                        perusahaan, instansi, sekolah,
                        maupun organisasi Anda.
                    </p>
                </motion.div>

                {/* =====================================================
                    CONTENT GRID
                ===================================================== */}

                <div
                    className="
                        mt-12
                        grid
                        min-w-0
                        grid-cols-1
                        gap-8
                        lg:mt-16
                        lg:grid-cols-12
                        lg:items-start
                        lg:gap-10
                        xl:gap-12
                    "
                >
                    {/* =================================================
                        LEFT - CONTACT INFORMATION
                    ================================================= */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            x: -30,
                        }}
                        whileInView={{
                            opacity: 1,
                            x: 0,
                        }}
                        viewport={{
                            once: true,
                            amount: 0.1,
                        }}
                        transition={{
                            duration: 0.5,
                            ease: "easeOut",
                        }}
                        className="
                            min-w-0
                            w-full
                            lg:col-span-5
                        "
                    >
                        <div
                            className="
                                min-w-0
                                w-full
                            "
                        >
                            <ContactInformation />
                        </div>
                    </motion.div>

                    {/* =================================================
                        RIGHT - CONTACT FORM
                    ================================================= */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            x: 30,
                        }}
                        whileInView={{
                            opacity: 1,
                            x: 0,
                        }}
                        viewport={{
                            once: true,
                            amount: 0.1,
                        }}
                        transition={{
                            duration: 0.5,
                            ease: "easeOut",
                        }}
                        className="
                            min-w-0
                            w-full
                            lg:col-span-7
                        "
                    >
                        <div
                            className="
                                w-full
                                min-w-0
                                overflow-hidden
                                rounded-[2rem]
                                border
                                border-slate-200
                                bg-white
                                shadow-xl
                                shadow-slate-200/50
                            "
                        >
                            <div
                                className="
                                    w-full
                                    min-w-0
                                    p-6
                                    sm:p-8
                                    lg:p-10
                                "
                            >
                                <ContactForm />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}