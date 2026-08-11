import type { Metadata } from "next";
import Image from "next/image";

import LoginCard from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Login Admin | Mister Gunawan",
  description:
    "Halaman login administrator website Mister Gunawan.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/about/Hero.jpeg"
          alt="Mister Gunawan"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-slate-900/90 to-blue-900/70" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.25),transparent_35%)]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_40%)]" />
      </div>

      {/* Content */}
      <section className="relative z-10 flex min-h-screen items-center justify-center px-6 py-16">
        <div className="grid w-full max-w-7xl items-center gap-16 lg:grid-cols-2">
          {/* Left */}
          <div className="hidden text-white lg:block">
            <span className="inline-flex rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-200 backdrop-blur">
              Administrator Panel
            </span>

            <h1 className="mt-8 text-5xl font-bold leading-tight xl:text-6xl">
              Selamat Datang di
              <span className="block text-blue-400">
                Mister Gunawan
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-slate-300">
              Kelola layanan training, portofolio,
              artikel, pesan pelanggan, dan seluruh
              konten website melalui dashboard
              administrator yang aman dan mudah
              digunakan.
            </p>

            <div className="mt-10 space-y-4">
              {[
                "Kelola layanan training",
                "Kelola portofolio kegiatan",
                "Kelola pesan konsultasi",
                "Dashboard administrator",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3"
                >
                  <div className="h-2.5 w-2.5 rounded-full bg-blue-400" />

                  <span className="text-slate-200">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="flex justify-center">
            <LoginCard />
          </div>
        </div>
      </section>
    </main>
  );
}