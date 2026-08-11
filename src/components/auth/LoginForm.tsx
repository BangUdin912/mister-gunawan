
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Eye,
    EyeOff,
    Loader2,
    LogIn,
    Mail,
    Lock,
    AlertCircle,
} from "lucide-react";

import { authService } from "@/lib/authService";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * =========================================================
 * LOGIN SCHEMA
 * =========================================================
 */

const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, "Email wajib diisi.")
        .email("Format email tidak valid."),

    password: z
        .string()
        .min(6, "Password minimal 6 karakter."),
});

type LoginValues = z.infer<typeof loginSchema>;

/**
 * =========================================================
 * COMPONENT
 * =========================================================
 */

export default function LoginForm() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        clearErrors,
    } = useForm<LoginValues>({
        resolver: zodResolver(loginSchema),
        mode: "onSubmit",
        defaultValues: {
            email: "",
            password: "",
        },
    });

    /**
     * =========================================================
     * LOGIN
     * =========================================================
     */

    async function onSubmit(values: LoginValues) {
        if (loading) {
            return;
        }

        setLoading(true);
        setLoginError(null);

        try {
            const email = values.email.trim().toLowerCase();

            /**
             * Login menggunakan Supabase Auth.
             */
            const session = await authService.login({
                email,
                password: values.password,
            });

            /**
             * Pastikan session benar-benar tersedia.
             */
            if (!session?.user) {
                throw new Error(
                    "Login berhasil tetapi session tidak ditemukan."
                );
            }

            /**
             * Login berhasil.
             *
             * Jangan menggunakan setTimeout.
             * Jangan melakukan reload manual.
             */
            router.replace("/admin");

        } catch (error) {
            /**
             * Error dari authService sudah berupa
             * pesan yang aman untuk ditampilkan.
             */
            const message =
                error instanceof Error
                    ? error.message
                    : "Gagal login. Silakan coba lagi.";

            /**
             * Jangan console.error untuk credential
             * yang salah karena browser akan menganggapnya
             * sebagai Console Error.
             *
             * Ini adalah kondisi login gagal yang normal.
             */
            setLoginError(message);

        } finally {
            setLoading(false);
        }
    }

    /**
     * =========================================================
     * CLEAR LOGIN ERROR
     * =========================================================
     */

    function handleFieldChange() {
        if (loginError) {
            setLoginError(null);
        }
    }

    return (
        <div
            className="
                rounded-[30px]
                border
                border-white/15
                bg-black/35
                p-8
                backdrop-blur-2xl
                shadow-[0_20px_80px_rgba(0,0,0,.45)]
            "
        >
            {/* =================================================
                HEADER
            ================================================= */}

            <div className="mb-8 text-center">
                <h2
                    className="
                        text-3xl
                        font-bold
                        text-white
                        drop-shadow-lg
                    "
                >
                    Administrator Login
                </h2>

                <p
                    className="
                        mt-2
                        text-sm
                        leading-7
                        text-white/75
                    "
                >
                    Masuk untuk mengakses
                    dashboard administrator
                    Mister Gunawan.
                </p>
            </div>

            {/* =================================================
                FORM
            ================================================= */}

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
                noValidate
            >
                {/* =================================================
                    AUTH ERROR
                ================================================= */}

                {loginError && (
                    <div
                        role="alert"
                        aria-live="assertive"
                        className="
                            flex
                            items-start
                            gap-3
                            rounded-2xl
                            border
                            border-red-400/30
                            bg-red-500/15
                            px-4
                            py-3
                            text-red-100
                            backdrop-blur-xl
                        "
                    >
                        <AlertCircle
                            aria-hidden="true"
                            className="
                                mt-0.5
                                h-5
                                w-5
                                shrink-0
                            "
                        />

                        <span
                            className="
                                text-sm
                                leading-6
                            "
                        >
                            {loginError}
                        </span>
                    </div>
                )}

                {/* =================================================
                    EMAIL
                ================================================= */}

                <div className="space-y-2">
                    <Label
                        htmlFor="login-email"
                        className="
                            text-sm
                            font-semibold
                            tracking-wide
                            text-white
                        "
                    >
                        Email
                    </Label>

                    <div className="relative">
                        <Mail
                            aria-hidden="true"
                            className="
                                absolute
                                left-5
                                top-1/2
                                h-5
                                w-5
                                -translate-y-1/2
                                text-slate-500
                            "
                        />

                        <Input
                            id="login-email"
                            type="email"
                            autoComplete="email"
                            inputMode="email"
                            placeholder="admin@mistergunawan.com"
                            disabled={loading}
                            aria-invalid={Boolean(errors.email)}
                            aria-describedby={
                                errors.email
                                    ? "login-email-error"
                                    : undefined
                            }
                            className="
                                h-14
                                rounded-2xl
                                border
                                border-white/20
                                bg-white/95
                                pl-14
                                text-[15px]
                                font-medium
                                text-slate-900
                                placeholder:text-slate-400
                                shadow-xl
                                transition-all
                                focus:border-blue-500
                                focus:ring-4
                                focus:ring-blue-400/20
                                disabled:cursor-not-allowed
                                disabled:opacity-70
                            "
                            {...register("email", {
                                onChange: handleFieldChange,
                            })}
                        />
                    </div>

                    {errors.email && (
                        <p
                            id="login-email-error"
                            role="alert"
                            className="text-sm text-red-300"
                        >
                            {errors.email.message}
                        </p>
                    )}
                </div>

                {/* =================================================
                    PASSWORD
                ================================================= */}

                <div className="space-y-2">
                    <Label
                        htmlFor="login-password"
                        className="
                            text-sm
                            font-semibold
                            tracking-wide
                            text-white
                        "
                    >
                        Password
                    </Label>

                    <div className="relative">
                        <Lock
                            aria-hidden="true"
                            className="
                                absolute
                                left-5
                                top-1/2
                                h-5
                                w-5
                                -translate-y-1/2
                                text-slate-500
                            "
                        />

                        <Input
                            id="login-password"
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            autoComplete="current-password"
                            placeholder="••••••••"
                            disabled={loading}
                            aria-invalid={Boolean(errors.password)}
                            aria-describedby={
                                errors.password
                                    ? "login-password-error"
                                    : undefined
                            }
                            className="
                                h-14
                                rounded-2xl
                                border
                                border-white/20
                                bg-white/95
                                pl-14
                                pr-14
                                text-[15px]
                                font-medium
                                text-slate-900
                                placeholder:text-slate-400
                                shadow-xl
                                transition-all
                                focus:border-blue-500
                                focus:ring-4
                                focus:ring-blue-400/20
                                disabled:cursor-not-allowed
                                disabled:opacity-70
                            "
                            {...register("password", {
                                onChange: handleFieldChange,
                            })}
                        />

                        <button
                            type="button"
                            disabled={loading}
                            onClick={() =>
                                setShowPassword(
                                    (previous) => !previous
                                )
                            }
                            aria-label={
                                showPassword
                                    ? "Sembunyikan password"
                                    : "Tampilkan password"
                            }
                            className="
                                absolute
                                right-3
                                top-1/2
                                flex
                                h-10
                                w-10
                                -translate-y-1/2
                                items-center
                                justify-center
                                rounded-full
                                text-slate-500
                                transition
                                hover:bg-slate-100
                                hover:text-blue-600
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                            "
                        >
                            {showPassword ? (
                                <EyeOff
                                    aria-hidden="true"
                                    className="h-5 w-5"
                                />
                            ) : (
                                <Eye
                                    aria-hidden="true"
                                    className="h-5 w-5"
                                />
                            )}
                        </button>
                    </div>

                    {errors.password && (
                        <p
                            id="login-password-error"
                            role="alert"
                            className="text-sm text-red-300"
                        >
                            {errors.password.message}
                        </p>
                    )}
                </div>

                {/* =================================================
                    REMEMBER + FORGOT PASSWORD
                ================================================= */}

                <div
                    className="
                        flex
                        items-center
                        justify-between
                        text-sm
                    "
                >
                    <label
                        className="
                            flex
                            cursor-pointer
                            items-center
                            gap-3
                            text-white/90
                        "
                    >
                        <input
                            type="checkbox"
                            disabled={loading}
                            className="
                                h-4
                                w-4
                                rounded
                                border-white/30
                                text-blue-600
                            "
                        />

                        <span>
                            Ingat saya
                        </span>
                    </label>

                    <Link
                        href="/forgot-password"
                        className="
                            font-semibold
                            text-blue-300
                            transition
                            hover:text-white
                        "
                    >
                        Lupa Password?
                    </Link>
                </div>

                {/* =================================================
                    SUBMIT
                ================================================= */}

                <Button
                    type="submit"
                    disabled={loading}
                    className="
                        h-14
                        w-full
                        rounded-2xl
                        bg-gradient-to-r
                        from-blue-600
                        to-blue-500
                        text-base
                        font-semibold
                        shadow-2xl
                        shadow-blue-600/30
                        transition-all
                        duration-300
                        hover:-translate-y-1
                        hover:from-blue-700
                        hover:to-blue-600
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                    "
                >
                    {loading ? (
                        <>
                            <Loader2
                                aria-hidden="true"
                                className="
                                    mr-2
                                    h-5
                                    w-5
                                    animate-spin
                                "
                            />

                            Memproses...
                        </>
                    ) : (
                        <>
                            <LogIn
                                aria-hidden="true"
                                className="
                                    mr-2
                                    h-5
                                    w-5
                                "
                            />

                            Masuk ke Dashboard
                        </>
                    )}
                </Button>

                {/* =================================================
                    SECURE LOGIN
                ================================================= */}

                <div
                    className="
                        flex
                        items-center
                        gap-4
                    "
                >
                    <div
                        className="
                            h-px
                            flex-1
                            bg-white/20
                        "
                    />

                    <span
                        className="
                            text-xs
                            font-semibold
                            uppercase
                            tracking-[0.35em]
                            text-white/70
                        "
                    >
                        Secure Login
                    </span>

                    <div
                        className="
                            h-px
                            flex-1
                            bg-white/20
                        "
                    />
                </div>

                {/* =================================================
                    FOOTER
                ================================================= */}

                <p
                    className="
                        text-center
                        text-sm
                        leading-7
                        text-white/75
                    "
                >
                    Halaman ini hanya dapat
                    diakses oleh administrator
                    resmi.

                    <br />

                    <span
                        className="
                            font-semibold
                            text-white
                        "
                    >
                        Mister Gunawan
                    </span>
                </p>
            </form>
        </div>
    );
}