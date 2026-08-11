"use client";

import {
    useEffect,
    useRef,
    useState,
} from "react";

import Image from "next/image";

import Link from "next/link";

import {
    usePathname,
    useRouter,
} from "next/navigation";

import {
    FolderOpen,
    GraduationCap,
    Handshake,
    LayoutDashboard,
    LogOut,
    Menu,
    MessageSquare,
    Settings,
    UserCircle,
    UserCog,
    X,
} from "lucide-react";

import { authService } from "@/lib/authService";

import { profileService } from "@/lib/profileService";

import type { Profile } from "@/types/profile";

import {
    Button,
} from "@/components/ui/button";

import MessageRealtime from "@/app/admin/messages/components/MessageRealtime";

interface Props {
    children: React.ReactNode;
}

/**
 * =========================================================
 * ADMIN MENU
 * =========================================================
 */

const menus = [
    {
        name: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
    },
    {
        name: "Training",
        href: "/admin/trainings",
        icon: GraduationCap,
    },
    {
        name: "Portofolio",
        href: "/admin/portofolio",
        icon: FolderOpen,
    },
    {
        name: "Partner & Klien",
        href: "/admin/partner",
        icon: Handshake,
    },
    {
        name: "Pesan",
        href: "/admin/messages",
        icon: MessageSquare,
    },
    {
        name: "Pengaturan",
        href: "/admin/settings",
        icon: Settings,
    },
    {
        name: "Account",
        href: "/admin/account",
        icon: UserCircle,
    },
];

/**
 * =========================================================
 * COMPONENT
 * =========================================================
 */

export default function AdminLayout({
    children,
}: Props) {
    const pathname =
        usePathname();

    const router =
        useRouter();

    /**
     * =====================================================
     * SIDEBAR
     * =====================================================
     */

    const [
        open,
        setOpen,
    ] = useState(false);

    /**
     * =====================================================
     * ACCOUNT
     * =====================================================
     */

    const [
        profile,
        setProfile,
    ] = useState<Profile | null>(
        null
    );

    const [
        email,
        setEmail,
    ] = useState("");

    const [
        accountLoading,
        setAccountLoading,
    ] = useState(true);

    const [
        accountOpen,
        setAccountOpen,
    ] = useState(false);

    const accountRef =
        useRef<HTMLDivElement | null>(
            null
        );

    /**
     * =====================================================
     * LOAD ACCOUNT
     * =====================================================
     */

    async function loadAccount() {
        try {
            setAccountLoading(true);

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
                "Load admin account error:",
                error
            );
        } finally {
            setAccountLoading(false);
        }
    }

    /**
     * =====================================================
     * INITIAL LOAD
     * =====================================================
     */

    useEffect(() => {
        loadAccount();
    }, []);

    /**
     * =====================================================
     * AVATAR UPDATE LISTENER
     * =====================================================
     *
     * AvatarUpload mengirim event:
     *
     * profile:avatar-updated
     *
     * Header akan langsung memperbarui avatar.
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
     * ACCOUNT DROPDOWN - OUTSIDE CLICK
     * =====================================================
     */

    useEffect(() => {
        function handleOutsideClick(
            event: MouseEvent
        ) {
            if (
                accountRef.current &&
                !accountRef.current.contains(
                    event.target as Node
                )
            ) {
                setAccountOpen(false);
            }
        }

        if (accountOpen) {
            document.addEventListener(
                "mousedown",
                handleOutsideClick
            );
        }

        return () => {
            document.removeEventListener(
                "mousedown",
                handleOutsideClick
            );
        };
    }, [accountOpen]);

    /**
     * =====================================================
     * ESC KEY
     * =====================================================
     */

    useEffect(() => {
        function handleEscape(
            event: KeyboardEvent
        ) {
            if (
                event.key === "Escape"
            ) {
                setAccountOpen(false);
            }
        }

        document.addEventListener(
            "keydown",
            handleEscape
        );

        return () => {
            document.removeEventListener(
                "keydown",
                handleEscape
            );
        };
    }, []);

    /**
     * =====================================================
     * LOGOUT
     * =====================================================
     */

    async function handleLogout() {
        if (accountLoading) {
            return;
        }

        try {
            setAccountOpen(false);

            await authService.logout();

            router.replace(
                "/login"
            );

            router.refresh();
        } catch (error) {
            console.error(
                "Logout error:",
                error
            );
        }
    }

    /**
     * =====================================================
     * ACCOUNT INFORMATION
     * =====================================================
     */

    const name =
        profile?.name?.trim() ||
        "Administrator";

    const role =
        profile?.role?.trim() ||
        "Administrator";

    const initials =
        name
            .split(/\s+/)
            .filter(Boolean)
            .map(
                (item) =>
                    item
                        .charAt(0)
                        .toUpperCase()
            )
            .join("")
            .slice(0, 2) ||
        "AD";

    /**
     * =====================================================
     * RENDER
     * =====================================================
     */

    return (
        <div className="min-h-screen bg-slate-100">

            {/* =================================================
                SUPABASE REALTIME
            ================================================= */}

            <MessageRealtime />

            {/* =================================================
                MOBILE OVERLAY
            ================================================= */}

            {open && (
                <div
                    className="
                        fixed
                        inset-0
                        z-40
                        bg-black/50
                        lg:hidden
                    "
                    onClick={() =>
                        setOpen(false)
                    }
                />
            )}

            {/* =================================================
                SIDEBAR
            ================================================= */}

            <aside
                className={`
                    fixed
                    left-0
                    top-0
                    z-50
                    flex
                    h-screen
                    w-72
                    flex-col
                    bg-slate-900
                    text-white
                    shadow-2xl
                    transition-transform
                    duration-300

                    ${
                        open
                            ? "translate-x-0"
                            : "-translate-x-full"
                    }

                    lg:translate-x-0
                `}
            >

                {/* Sidebar Header */}

                <div
                    className="
                        border-b
                        border-slate-800
                        px-6
                        py-6
                    "
                >
                    <div
                        className="
                            flex
                            items-center
                            justify-between
                        "
                    >
                        <div>
                            <h2
                                className="
                                    text-2xl
                                    font-bold
                                "
                            >
                                Mister Gunawan
                            </h2>

                            <p
                                className="
                                    mt-1
                                    text-sm
                                    text-slate-400
                                "
                            >
                                Administrator
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() =>
                                setOpen(false)
                            }
                            className="
                                rounded-lg
                                p-2
                                transition
                                hover:bg-slate-800
                                lg:hidden
                            "
                            aria-label="Tutup menu"
                        >
                            <X
                                className="
                                    h-6
                                    w-6
                                "
                            />
                        </button>
                    </div>
                </div>

                {/* =================================================
                    NAVIGATION
                ================================================= */}

                <nav
                    className="
                        flex-1
                        space-y-2
                        overflow-y-auto
                        p-4
                    "
                >
                    {menus.map(
                        (menu) => {
                            const Icon =
                                menu.icon;

                            const active =
                                menu.href ===
                                "/admin"
                                    ? pathname ===
                                      "/admin"
                                    : pathname.startsWith(
                                          menu.href
                                      );

                            return (
                                <Link
                                    key={
                                        menu.href
                                    }
                                    href={
                                        menu.href
                                    }
                                    onClick={() =>
                                        setOpen(
                                            false
                                        )
                                    }
                                    className={`
                                        flex
                                        items-center
                                        gap-3
                                        rounded-xl
                                        px-4
                                        py-3
                                        font-medium
                                        transition-all

                                        ${
                                            active
                                                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                                                : "text-slate-300 hover:bg-slate-800 hover:text-white"
                                        }
                                    `}
                                >
                                    <Icon
                                        className="
                                            h-5
                                            w-5
                                            shrink-0
                                        "
                                    />

                                    <span>
                                        {
                                            menu.name
                                        }
                                    </span>
                                </Link>
                            );
                        }
                    )}
                </nav>

                {/* =================================================
                    SIDEBAR LOGOUT
                ================================================= */}

                <div
                    className="
                        mt-auto
                        border-t
                        border-slate-800
                        p-4
                    "
                >
                    <Button
                        type="button"
                        variant="destructive"
                        className="
                            w-full
                            rounded-xl
                        "
                        onClick={
                            handleLogout
                        }
                    >
                        <LogOut
                            className="
                                mr-2
                                h-4
                                w-4
                            "
                        />

                        Logout
                    </Button>
                </div>
            </aside>

            {/* =================================================
                MAIN AREA
            ================================================= */}

            <div
                className="
                    lg:ml-72
                "
            >

                {/* =================================================
                    TOP HEADER
                ================================================= */}

                <header
                    className="
                        sticky
                        top-0
                        z-30
                        flex
                        h-20
                        items-center
                        justify-between
                        border-b
                        border-slate-200
                        bg-white
                        px-6
                        shadow-sm
                    "
                >

                    {/* =================================================
                        LEFT
                    ================================================= */}

                    <div
                        className="
                            flex
                            items-center
                            gap-4
                        "
                    >
                        {/* Mobile Menu */}

                        <button
                            type="button"
                            className="
                                rounded-lg
                                p-2
                                transition
                                hover:bg-slate-100
                                lg:hidden
                            "
                            onClick={() =>
                                setOpen(
                                    true
                                )
                            }
                            aria-label="Buka menu"
                        >
                            <Menu
                                className="
                                    h-6
                                    w-6
                                "
                            />
                        </button>

                        <div>
                            <h1
                                className="
                                    text-2xl
                                    font-bold
                                    text-slate-900
                                "
                            >
                                Dashboard
                                Administrator
                            </h1>

                            <p
                                className="
                                    text-sm
                                    text-slate-500
                                "
                            >
                                Mister Gunawan
                            </p>
                        </div>
                    </div>

                    {/* =================================================
                        ACCOUNT MENU
                    ================================================= */}

                    <div
                        ref={accountRef}
                        className="
                            relative
                        "
                    >

                        {/* Account Button */}

                        <button
                            type="button"
                            onClick={() =>
                                setAccountOpen(
                                    (value) =>
                                        !value
                                )
                            }
                            className="
                                flex
                                items-center
                                gap-3
                                rounded-full
                                border
                                border-slate-200
                                bg-white
                                px-3
                                py-2
                                shadow-sm
                                transition

                                hover:border-blue-200
                                hover:bg-slate-50

                                focus:outline-none
                                focus:ring-2
                                focus:ring-blue-500/20
                            "
                            aria-expanded={
                                accountOpen
                            }
                            aria-haspopup="menu"
                        >

                            {/* Avatar */}

                            <div
                                className="
                                    relative
                                    flex
                                    h-11
                                    w-11
                                    shrink-0
                                    items-center
                                    justify-center
                                    overflow-hidden
                                    rounded-full
                                    bg-blue-100
                                    text-sm
                                    font-bold
                                    text-blue-600
                                "
                            >
                                {profile?.avatar_url ? (
                                    <Image
                                        src={
                                            profile.avatar_url
                                        }
                                        alt={`Avatar ${name}`}
                                        fill
                                        sizes="44px"
                                        unoptimized
                                        className="object-cover"
                                    />
                                ) : (
                                    initials
                                )}
                            </div>

                            {/* Account Information */}

                            <div
                                className="
                                    hidden
                                    text-left
                                    sm:block
                                "
                            >
                                <p
                                    className="
                                        max-w-40
                                        truncate
                                        font-semibold
                                        text-slate-900
                                    "
                                >
                                    {accountLoading
                                        ? "Memuat..."
                                        : name}
                                </p>

                                <p
                                    className="
                                        max-w-40
                                        truncate
                                        text-sm
                                        text-slate-500
                                    "
                                >
                                    {accountLoading
                                        ? "..."
                                        : "Kelola Account"}
                                </p>
                            </div>

                            {/* Arrow */}

                            <svg
                                className={`
                                    hidden
                                    h-4
                                    w-4
                                    text-slate-400
                                    transition-transform
                                    sm:block

                                    ${
                                        accountOpen
                                            ? "rotate-180"
                                            : ""
                                    }
                                `}
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>

                        {/* =================================================
                            DROPDOWN
                        ================================================= */}

                        {accountOpen && (
                            <div
                                className="
                                    absolute
                                    right-0
                                    top-full
                                    z-50
                                    mt-3
                                    w-72
                                    overflow-hidden
                                    rounded-2xl
                                    border
                                    border-slate-200
                                    bg-white
                                    shadow-xl
                                "
                                role="menu"
                            >

                                {/* Account Information */}

                                <div
                                    className="
                                        border-b
                                        border-slate-100
                                        p-4
                                    "
                                >
                                    <div
                                        className="
                                            flex
                                            items-center
                                            gap-3
                                        "
                                    >
                                        <div
                                            className="
                                                relative
                                                flex
                                                h-12
                                                w-12
                                                shrink-0
                                                items-center
                                                justify-center
                                                overflow-hidden
                                                rounded-full
                                                bg-blue-100
                                                font-bold
                                                text-blue-600
                                            "
                                        >
                                            {profile?.avatar_url ? (
                                                <Image
                                                    src={
                                                        profile.avatar_url
                                                    }
                                                    alt={`Avatar ${name}`}
                                                    fill
                                                    sizes="48px"
                                                    unoptimized
                                                    className="object-cover"
                                                />
                                            ) : (
                                                initials
                                            )}
                                        </div>

                                        <div
                                            className="
                                                min-w-0
                                            "
                                        >
                                            <p
                                                className="
                                                    truncate
                                                    font-semibold
                                                    text-slate-900
                                                "
                                            >
                                                {name}
                                            </p>

                                            <p
                                                className="
                                                    truncate
                                                    text-xs
                                                    text-slate-500
                                                "
                                            >
                                                {email ||
                                                    "Email tidak tersedia"}
                                            </p>

                                            <p
                                                className="
                                                    mt-1
                                                    text-xs
                                                    font-medium
                                                    uppercase
                                                    tracking-wide
                                                    text-blue-600
                                                "
                                            >
                                                {role}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Manage Account */}

                                <div className="p-2">

                                    <Link
                                        href="/admin/account"
                                        onClick={() =>
                                            setAccountOpen(
                                                false
                                            )
                                        }
                                        className="
                                            flex
                                            items-center
                                            gap-3
                                            rounded-xl
                                            px-3
                                            py-3
                                            text-sm
                                            font-medium
                                            text-slate-700
                                            transition

                                            hover:bg-slate-100
                                            hover:text-slate-900
                                        "
                                        role="menuitem"
                                    >
                                        <div
                                            className="
                                                flex
                                                h-9
                                                w-9
                                                items-center
                                                justify-center
                                                rounded-lg
                                                bg-blue-50
                                                text-blue-600
                                            "
                                        >
                                            <UserCog
                                                className="
                                                    h-5
                                                    w-5
                                                "
                                            />
                                        </div>

                                        <div>
                                            <p>
                                                Kelola Account
                                            </p>

                                            <p
                                                className="
                                                    text-xs
                                                    font-normal
                                                    text-slate-400
                                                "
                                            >
                                                Profil dan
                                                informasi akun
                                            </p>
                                        </div>
                                    </Link>

                                    {/* Logout */}

                                    <button
                                        type="button"
                                        onClick={
                                            handleLogout
                                        }
                                        className="
                                            flex
                                            w-full
                                            items-center
                                            gap-3
                                            rounded-xl
                                            px-3
                                            py-3
                                            text-left
                                            text-sm
                                            font-medium
                                            text-red-600
                                            transition

                                            hover:bg-red-50
                                        "
                                        role="menuitem"
                                    >
                                        <div
                                            className="
                                                flex
                                                h-9
                                                w-9
                                                items-center
                                                justify-center
                                                rounded-lg
                                                bg-red-50
                                                text-red-600
                                            "
                                        >
                                            <LogOut
                                                className="
                                                    h-5
                                                    w-5
                                                "
                                            />
                                        </div>

                                        <div>
                                            <p>
                                                Logout
                                            </p>

                                            <p
                                                className="
                                                    text-xs
                                                    font-normal
                                                    text-red-400
                                                "
                                            >
                                                Keluar dari
                                                administrator
                                            </p>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </header>

                {/* =================================================
                    PAGE CONTENT
                ================================================= */}

                <main
                    className="
                        min-h-[calc(100vh-80px)]
                        bg-slate-100
                        p-6
                    "
                >
                    {children}
                </main>
            </div>
        </div>
    );
}