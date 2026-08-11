"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

import LoginForm from "./LoginForm";

export default function LoginCard() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      className="w-full max-w-md"
    >
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 px-8 py-10 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_45%)]" />

          <div className="relative flex justify-center">
            <div className="rounded-2xl bg-white p-4 shadow-lg">
              <Image
                src="/images/logo/logo hss.png"
                alt="Hartawan Sukses Sejahtera"
                width={90}
                height={90}
                className="h-auto w-auto object-contain"
                priority
              />
            </div>
          </div>

          <h1 className="relative mt-6 text-3xl font-bold text-white">
            Admin Login
          </h1>

          <p className="relative mt-3 text-sm leading-6 text-blue-100">
            Silakan masuk menggunakan akun administrator
            untuk mengelola website Mister Gunawan.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 px-8 py-8">
          <div className="flex items-center gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-4">
            <div className="rounded-xl bg-blue-600 p-2 text-white">
              <ShieldCheck className="h-5 w-5" />
            </div>

            <div>
              <p className="font-semibold text-slate-900">
                Area Administrator
              </p>

              <p className="text-sm text-slate-600">
                Akses hanya untuk administrator yang
                memiliki akun.
              </p>
            </div>
          </div>

          <LoginForm />
        </div>
      </div>
    </motion.div>
  );
}