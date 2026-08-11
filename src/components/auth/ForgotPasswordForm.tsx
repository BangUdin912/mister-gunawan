
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    ArrowLeft,
    CheckCircle2,
    Loader2,
    Mail,
    Send,
} from "lucide-react";

import { authService } from "@/lib/authService";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * =========================================================
 * FORGOT PASSWORD SCHEMA
 * =========================================================
 */

const schema = z.object({
    email: z
        .string()
        .trim()
        .min(
            1,
            "Email wajib diisi."
        )
        .email(
            "Format email tidak valid."
        ),
});

type FormValues = z.infer<typeof schema>;

/**
 * =========================================================
 * COMPONENT
 * =========================================================
 */

export default function ForgotPasswordForm() {
    const router = useRouter();

    const [loading, setLoading] =
        useState(false);

    const [success, setSuccess] =
        useState(false);

    const [submittedEmail, setSubmittedEmail] =
        useState("");

    const [error, setError] =
        useState<string | null>(null);

    /**
     * =====================================================
     * FORM
     * =====================================================
     */

    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors,
        },
    } =
        useForm<FormValues>({
            resolver:
                zodResolver(schema),

            mode: "onBlur",

            defaultValues: {
                email: "",
            },
        });

    /**
     * =====================================================
     * AUTO REDIRECT
     * =====================================================
     */

    useEffect(() => {
        if (!success) {
            return;
        }

        const timer =
            window.setTimeout(() => {
                router.replace("/login");
            }, 5000);

        return () => {
            window.clearTimeout(timer);
        };
    }, [
        success,
        router,
    ]);

    /**
     * =====================================================
     * SUBMIT
     * =====================================================
     */

    async function onSubmit(
        values: FormValues
    ) {
        if (loading) {
            return;
        }

        setLoading(true);
        setError(null);

        try {
            /**
             * Normalisasi email.
             */
            const email =
                values.email
                    .trim()
                    .toLowerCase();

            /**
             * Kirim request reset password
             * melalui Supabase Auth.
             */
            await authService.resetPassword(
                email
            );

            /**
             * Simpan email yang digunakan.
             */
            setSubmittedEmail(email);

            /**
             * Bersihkan form.
             */
            reset();

            /**
             * Tampilkan halaman sukses.
             */
            setSuccess(true);

        } catch (err) {
            const message =
                err instanceof Error
                    ? err.message
                    : "Terjadi kesalahan. Silakan coba lagi.";

            setError(message);

        } finally {
            setLoading(false);
        }
    }

    /**
     * =====================================================
     * SUCCESS STATE
     * =====================================================
     */

    if (success) {
        return (
            <div
                className="
                    rounded-3xl
                    border
                    border-green-500/20
                    bg-white/10
                    p-10
                    text-center
                    text-white
                    shadow-2xl
                    backdrop-blur-xl
                "
            >
                {/* SUCCESS ICON */}

                <div
                    className="
                        mx-auto
                        flex
                        h-20
                        w-20
                        items-center
                        justify-center
                        rounded-full
                        bg-green-500/20
                    "
                >
                    <CheckCircle2
                        aria-hidden="true"
                        className="
                            h-10
                            w-10
                            text-green-400
                        "
                    />
                </div>

                {/* TITLE */}

                <h2
                    className="
                        mt-6
                        text-3xl
                        font-bold
                        text-white
                    "
                >
                    Email Terkirim
                </h2>

                {/* DESCRIPTION */}

                <p
                    className="
                        mt-6
                        text-white
                    "
                >
                    Jika alamat email berikut
                    terdaftar:
                </p>

                {/* EMAIL */}

                <p
                    className="
                        mt-2
                        break-all
                        text-lg
                        font-semibold
                        text-blue-300
                    "
                >
                    {submittedEmail}
                </p>

                {/* INSTRUCTION */}

                <p
                    className="
                        mt-6
                        leading-8
                        text-white
                    "
                >
                    Kami telah mengirimkan
                    tautan untuk mengatur
                    ulang password.
                    <br />
                    Silakan periksa Inbox
                    maupun folder Spam.
                </p>

                {/* REDIRECT */}

                <p
                    className="
                        mt-6
                        text-sm
                        text-white/80
                    "
                >
                    Anda akan diarahkan
                    ke halaman login
                    dalam 5 detik.
                </p>

                {/* ACTIONS */}

                <div
                    className="
                        mt-8
                        flex
                        flex-col
                        gap-3
                        sm:flex-row
                        sm:justify-center
                    "
                >
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                            setSuccess(false);
                            setSubmittedEmail("");
                            setError(null);
                        }}
                        className="
                            border-white/30
                            bg-transparent
                            text-white
                            hover:bg-white/10
                            hover:text-white
                        "
                    >
                        Kirim ke Email Lain
                    </Button>

                    <Link href="/login">
                        <Button
                            type="button"
                            className="
                                w-full
                                bg-blue-600
                                text-white
                                hover:bg-blue-700
                                sm:w-auto
                            "
                        >
                            <ArrowLeft
                                aria-hidden="true"
                                className="
                                    mr-2
                                    h-4
                                    w-4
                                "
                            />

                            Kembali ke Login
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    /**
     * =====================================================
     * FORM STATE
     * =====================================================
     */

    return (
        <form
            noValidate
            onSubmit={handleSubmit(
                onSubmit
            )}
            className="
                space-y-7
                text-white
            "
        >
            {/* =================================================
                AUTH ERROR
            ================================================= */}

            {error && (
                <div
                    role="alert"
                    aria-live="polite"
                    className="
                        rounded-xl
                        border
                        border-red-500/30
                        bg-red-500/10
                        p-4
                        text-sm
                        text-red-200
                    "
                >
                    {error}
                </div>
            )}

            {/* =================================================
                EMAIL
            ================================================= */}

            <div className="space-y-3">
                <Label
                    htmlFor="forgot-email"
                    className="
                        font-medium
                        text-white
                    "
                >
                    Email Administrator
                </Label>

                <div className="relative">
                    <Mail
                        aria-hidden="true"
                        className="
                            absolute
                            left-4
                            top-1/2
                            z-10
                            h-5
                            w-5
                            -translate-y-1/2
                            text-blue-300
                        "
                    />

                    <Input
                        id="forgot-email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        autoFocus
                        disabled={loading}
                        placeholder="Masukkan email administrator"
                        aria-invalid={
                            !!errors.email
                        }
                        aria-describedby={
                            errors.email
                                ? "forgot-email-error"
                                : undefined
                        }
                        className="
                            h-14
                            rounded-2xl
                            border
                            border-white/20
                            bg-white/10
                            pl-12
                            pr-4
                            text-[15px]
                            font-medium
                            text-white
                            caret-white
                            placeholder:text-white/50
                            shadow-xl
                            backdrop-blur-xl
                            transition-all

                            focus:border-blue-400
                            focus:bg-white/15
                            focus:text-white
                            focus:ring-4
                            focus:ring-blue-400/20

                            disabled:cursor-not-allowed
                            disabled:opacity-60

                            [&:-webkit-autofill]:!bg-transparent
                            [&:-webkit-autofill]:!text-white
                        "
                        {...register("email")}
                    />
                </div>

                {errors.email && (
                    <p
                        id="forgot-email-error"
                        role="alert"
                        className="
                            text-sm
                            text-red-300
                        "
                    >
                        {
                            errors.email.message
                        }
                    </p>
                )}
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
                    text-white
                    shadow-xl
                    shadow-blue-600/20
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
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

                        Mengirim...
                    </>
                ) : (
                    <>
                        <Send
                            aria-hidden="true"
                            className="
                                mr-2
                                h-5
                                w-5
                            "
                        />

                        Kirim Link Reset Password
                    </>
                )}
            </Button>

            {/* =================================================
                SECURE RESET
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
                        tracking-[0.3em]
                        text-white/70
                    "
                >
                    Secure Reset
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
                DESCRIPTION
            ================================================= */}

            <p
                className="
                    text-center
                    text-sm
                    leading-7
                    text-white
                "
            >
                Masukkan email administrator
                yang terdaftar.
                Kami akan mengirimkan tautan
                untuk mengatur ulang password.
            </p>

            {/* =================================================
                BACK TO LOGIN
            ================================================= */}

            <div className="text-center">
                <Link
                    href="/login"
                    className="
                        inline-flex
                        items-center
                        gap-2
                        font-medium
                        text-blue-300
                        transition
                        hover:text-white
                    "
                >
                    <ArrowLeft
                        aria-hidden="true"
                        className="
                            h-4
                            w-4
                        "
                    />

                    Kembali ke Login
                </Link>
            </div>
        </form>
    );
}