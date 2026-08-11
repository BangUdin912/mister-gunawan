import type { Metadata } from "next";

import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password | Mister Gunawan",
  description:
    "Buat password baru untuk akun administrator Mister Gunawan.",
};

export default function ResetPasswordPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/images/hero/Hero.jpeg')",
          }}
        />

        <div className="absolute inset-0 bg-slate-950/75" />

        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-900/70 to-blue-950/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 py-24">
        <div className="grid w-full items-center gap-16 lg:grid-cols-2">
          {/* Left Section */}
          <div className="hidden lg:block">
            <div className="inline-flex rounded-full border border-blue-400/30 bg-blue-500/10 px-5 py-2 text-sm font-semibold text-blue-200 backdrop-blur">
              Reset Password
            </div>

            <h1 className="mt-8 text-6xl font-bold leading-tight text-white">
              Buat
              <span className="block text-blue-400">
                Password Baru
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-9 text-white/80">
              Masukkan password baru yang kuat agar akun administrator
              tetap aman. Gunakan kombinasi huruf besar, huruf kecil,
              angka, dan simbol untuk meningkatkan keamanan akun Anda.
            </p>

            <div className="mt-10 space-y-5 text-white/90">
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full bg-blue-400" />
                Minimal terdiri dari 8 karakter.
              </div>

              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full bg-blue-400" />
                Gunakan kombinasi huruf, angka, dan simbol.
              </div>

              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full bg-blue-400" />
                Jangan gunakan password lama.
              </div>

              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full bg-blue-400" />
                Password akan langsung diperbarui setelah disimpan.
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="mx-auto w-full max-w-md">
            <ResetPasswordForm />
          </div>
        </div>
      </div>
    </main>
  );
}