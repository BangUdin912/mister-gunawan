"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    LogOut,
    Loader2,
} from "lucide-react";
import { toast } from "sonner";

import { profileService } from "@/lib/profileService";

export default function LogoutCard() {
    const router =
        useRouter();

    const [loading, setLoading] =
        useState(false);

    async function handleLogout() {
        if (loading) {
            return;
        }

        const confirmed =
            window.confirm(
                "Apakah Anda yakin ingin keluar dari akun administrator?"
            );

        if (!confirmed) {
            return;
        }

        try {
            setLoading(true);

            await profileService.logout();

            toast.success(
                "Anda berhasil logout."
            );

            /*
             * Gunakan replace agar halaman admin
             * tidak dapat kembali menggunakan
             * tombol Back browser.
             */
            router.replace(
                "/login"
            );

            router.refresh();
        } catch (error) {
            console.error(
                "Logout:",
                error
            );

            toast.error(
                "Gagal logout. Silakan coba lagi."
            );

            setLoading(false);
        }
    }

    return (
        <div className="rounded-2xl border border-red-200 bg-white p-6 shadow-sm">

            {/* Header */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-red-600">
                    Logout
                </h2>

                <p className="mt-2 text-sm leading-6 text-stone-500">
                    Keluar dari akun administrator.
                </p>
            </div>

            {/* Warning */}
            <div className="rounded-xl border border-red-200 bg-red-50 p-4">
                <p className="text-sm leading-6 text-red-700">
                    Setelah logout, Anda harus login
                    kembali untuk mengakses Dashboard
                    Admin.
                </p>
            </div>

            {/* Button */}
            <button
                type="button"
                onClick={handleLogout}
                disabled={loading}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {loading ? (
                    <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Keluar...
                    </>
                ) : (
                    <>
                        <LogOut size={18} />
                        Logout
                    </>
                )}
            </button>
        </div>
    );
}
