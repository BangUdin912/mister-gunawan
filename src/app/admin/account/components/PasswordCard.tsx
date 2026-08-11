"use client";

import { useState } from "react";
import {
    Lock,
    Eye,
    EyeOff,
    Loader2,
    Save,
} from "lucide-react";
import { toast } from "sonner";

import { profileService } from "@/lib/profileService";

export default function PasswordCard() {
    const [newPassword, setNewPassword] =
        useState("");

    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [showNewPassword, setShowNewPassword] =
        useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        const password =
            newPassword.trim();

        const confirmation =
            confirmPassword.trim();

        /*
         * Validasi password
         */
        if (!password) {
            toast.error(
                "Password baru wajib diisi."
            );
            return;
        }

        if (password.length < 6) {
            toast.error(
                "Password baru minimal 6 karakter."
            );
            return;
        }

        if (password.length > 72) {
            toast.error(
                "Password maksimal 72 karakter."
            );
            return;
        }

        /*
         * Konfirmasi password
         */
        if (!confirmation) {
            toast.error(
                "Konfirmasi password wajib diisi."
            );
            return;
        }

        if (
            password !==
            confirmation
        ) {
            toast.error(
                "Konfirmasi password tidak sama."
            );
            return;
        }

        try {
            setLoading(true);

            await profileService.updatePassword(
                password
            );

            toast.success(
                "Password berhasil diperbarui."
            );

            /*
             * Kosongkan form setelah berhasil.
             */
            setNewPassword("");
            setConfirmPassword("");
        } catch (error) {
            console.error(
                "Update Password:",
                error
            );

            toast.error(
                "Gagal memperbarui password."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="rounded-2xl border bg-white p-6 shadow-sm">

            {/* Header */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-stone-800">
                    Password
                </h2>

                <p className="mt-2 text-sm leading-6 text-stone-500">
                    Gunakan password yang kuat untuk
                    menjaga keamanan akun administrator.
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="space-y-6"
            >

                {/* Password Baru */}
                <div>
                    <label
                        htmlFor="new-password"
                        className="mb-2 flex items-center gap-2 font-medium text-stone-800"
                    >
                        <Lock
                            size={18}
                        />

                        Password Baru
                    </label>

                    <div className="relative">
                        <input
                            id="new-password"
                            type={
                                showNewPassword
                                    ? "text"
                                    : "password"
                            }
                            value={newPassword}
                            onChange={(event) =>
                                setNewPassword(
                                    event.target.value
                                )
                            }
                            disabled={loading}
                            autoComplete="new-password"
                            minLength={6}
                            maxLength={72}
                            className="w-full rounded-xl border border-stone-200 bg-white p-4 pr-12 text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 disabled:cursor-not-allowed disabled:bg-stone-50"
                            placeholder="Minimal 6 karakter"
                        />

                        <button
                            type="button"
                            aria-label={
                                showNewPassword
                                    ? "Sembunyikan password"
                                    : "Tampilkan password"
                            }
                            onClick={() =>
                                setShowNewPassword(
                                    (value) =>
                                        !value
                                )
                            }
                            disabled={loading}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-500 transition hover:text-stone-800 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {showNewPassword ? (
                                <EyeOff
                                    size={20}
                                />
                            ) : (
                                <Eye
                                    size={20}
                                />
                            )}
                        </button>
                    </div>

                    <p className="mt-2 text-xs text-stone-500">
                        Minimal 6 karakter.
                    </p>
                </div>

                {/* Konfirmasi Password */}
                <div>
                    <label
                        htmlFor="confirm-password"
                        className="mb-2 flex items-center gap-2 font-medium text-stone-800"
                    >
                        <Lock
                            size={18}
                        />

                        Konfirmasi Password
                    </label>

                    <div className="relative">
                        <input
                            id="confirm-password"
                            type={
                                showConfirmPassword
                                    ? "text"
                                    : "password"
                            }
                            value={confirmPassword}
                            onChange={(event) =>
                                setConfirmPassword(
                                    event.target.value
                                )
                            }
                            disabled={loading}
                            autoComplete="new-password"
                            minLength={6}
                            maxLength={72}
                            className="w-full rounded-xl border border-stone-200 bg-white p-4 pr-12 text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 disabled:cursor-not-allowed disabled:bg-stone-50"
                            placeholder="Ulangi password baru"
                        />

                        <button
                            type="button"
                            aria-label={
                                showConfirmPassword
                                    ? "Sembunyikan password"
                                    : "Tampilkan password"
                            }
                            onClick={() =>
                                setShowConfirmPassword(
                                    (value) =>
                                        !value
                                )
                            }
                            disabled={loading}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-500 transition hover:text-stone-800 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {showConfirmPassword ? (
                                <EyeOff
                                    size={20}
                                />
                            ) : (
                                <Eye
                                    size={20}
                                />
                            )}
                        </button>
                    </div>
                </div>

                {/* Info */}
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                    <p className="text-sm leading-6 text-amber-800">
                        Setelah password diperbarui,
                        gunakan password baru tersebut
                        untuk login berikutnya.
                    </p>
                </div>

                {/* Submit */}
                <div className="flex justify-end pt-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 font-semibold text-white transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? (
                            <>
                                <Loader2
                                    className="h-5 w-5 animate-spin"
                                />

                                Menyimpan...
                            </>
                        ) : (
                            <>
                                <Save
                                    size={18}
                                />

                                Simpan Password
                            </>
                        )}
                    </button>
                </div>

            </form>
        </div>
    );
}