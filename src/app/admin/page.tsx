import Link from "next/link";

import type { LucideIcon } from "lucide-react";

import {
    ArrowRight,
    Bell,
    Briefcase,
    GraduationCap,
    Handshake,
    MessageSquare,
    Settings,
    UserCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import DashboardStats from "./components/DashboardStats";

interface MenuItem {
    title: string;
    description: string;
    href: string;
    icon: LucideIcon;
    color: string;
}

const menus: MenuItem[] = [
    {
        title: "Training",
        description:
            "Kelola program training, seminar, workshop, coaching, dan pelatihan perusahaan.",
        href: "/admin/trainings",
        icon: GraduationCap,
        color: "bg-blue-100 text-blue-600",
    },
    {
        title: "Portofolio",
        description:
            "Kelola dokumentasi kegiatan, foto, video YouTube, dan portofolio pelatihan.",
        href: "/admin/portofolio",
        icon: Briefcase,
        color: "bg-violet-100 text-violet-600",
    },
    {
        title: "Partner & Klien",
        description:
            "Kelola logo partner, perusahaan, instansi, dan klien.",
        href: "/admin/partner",
        icon: Handshake,
        color: "bg-emerald-100 text-emerald-600",
    },
    {
        title: "Pesan",
        description:
            "Kelola pesan konsultasi yang masuk dari customer.",
        href: "/admin/messages",
        icon: MessageSquare,
        color: "bg-pink-100 text-pink-600",
    },
    {
        title: "Pengaturan",
        description:
            "Kelola informasi perusahaan, kontak, logo, favicon, dan media sosial website.",
        href: "/admin/settings",
        icon: Settings,
        color: "bg-slate-100 text-slate-700",
    },
    {
        title: "Account",
        description:
            "Kelola profil administrator, foto profil, email, password, dan sesi akun.",
        href: "/admin/account",
        icon: UserCircle,
        color: "bg-amber-100 text-amber-600",
    },
];

export default function AdminPage() {
    return (
        <div className="space-y-10">

            {/* =========================
                HEADER
            ========================= */}

            <div
                className="
                    flex
                    flex-col
                    gap-6
                    lg:flex-row
                    lg:items-end
                    lg:justify-between
                "
            >
                <div>

                    <p
                        className="
                            text-sm
                            font-semibold
                            uppercase
                            tracking-wider
                            text-blue-600
                        "
                    >
                        Dashboard Administrator
                    </p>

                    <h1
                        className="
                            mt-2
                            text-4xl
                            font-bold
                            tracking-tight
                            text-slate-900
                        "
                    >
                        Selamat Datang 👋
                    </h1>

                    <p
                        className="
                            mt-3
                            max-w-3xl
                            leading-7
                            text-slate-600
                        "
                    >
                        Kelola seluruh konten website
                        Mister Gunawan melalui dashboard
                        administrator.
                    </p>

                </div>

                <Button
                    asChild
                    size="lg"
                    className="
                        w-fit
                        rounded-xl
                        bg-blue-600
                        hover:bg-blue-700
                    "
                >
                    <Link href="/admin/messages">

                        <Bell className="mr-2 h-5 w-5" />

                        Pesan Masuk

                    </Link>
                </Button>

            </div>


            {/* =========================
                STATISTIK
            ========================= */}

            <DashboardStats />


            {/* =========================
                MENU ADMIN
            ========================= */}

            <div>

                <div className="mb-6">

                    <h2
                        className="
                            text-2xl
                            font-bold
                            text-slate-900
                        "
                    >
                        Menu Administrator
                    </h2>

                    <p
                        className="
                            mt-2
                            text-sm
                            text-slate-500
                        "
                    >
                        Pilih menu yang ingin Anda kelola.
                    </p>

                </div>


                <div
                    className="
                        grid
                        gap-6
                        md:grid-cols-2
                        xl:grid-cols-3
                    "
                >

                    {menus.map((menu) => {

                        const Icon =
                            menu.icon;

                        return (
                            <Link
                                key={menu.title}
                                href={menu.href}
                                className="
                                    group
                                    rounded-3xl
                                    border
                                    border-slate-200
                                    bg-white
                                    p-7
                                    shadow-sm
                                    transition-all
                                    duration-200
                                    hover:-translate-y-1
                                    hover:border-slate-300
                                    hover:shadow-lg
                                "
                            >

                                {/* Icon */}

                                <div
                                    className={`
                                        mb-5
                                        flex
                                        h-14
                                        w-14
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        ${menu.color}
                                    `}
                                >
                                    <Icon
                                        className="
                                            h-7
                                            w-7
                                        "
                                    />
                                </div>


                                {/* Title */}

                                <h3
                                    className="
                                        text-xl
                                        font-bold
                                        text-slate-900
                                    "
                                >
                                    {menu.title}
                                </h3>


                                {/* Description */}

                                <p
                                    className="
                                        mt-3
                                        min-h-[84px]
                                        leading-7
                                        text-slate-600
                                    "
                                >
                                    {menu.description}
                                </p>


                                {/* Action */}

                                <div
                                    className="
                                        mt-6
                                        flex
                                        items-center
                                        gap-2
                                        font-semibold
                                        text-blue-600
                                        transition-all
                                        group-hover:gap-3
                                    "
                                >
                                    Kelola

                                    <ArrowRight
                                        className="
                                            h-4
                                            w-4
                                        "
                                    />

                                </div>

                            </Link>
                        );

                    })}

                </div>

            </div>

        </div>
    );
}