"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  ShieldCheck,
} from "lucide-react";

import { authService } from "@/lib/authService";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const schema = z
  .object({
    password: z
      .string()
      .min(8, "Password minimal 8 karakter"),

    confirmPassword: z.string(),
  })
  .refine(
    (data) =>
      data.password === data.confirmPassword,
    {
      path: ["confirmPassword"],
      message:
        "Konfirmasi password tidak sama",
    }
  );

type FormValues = z.infer<typeof schema>;

export default function ResetPasswordForm() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  const [error, setError] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(
    values: FormValues
  ) {
    try {
      setLoading(true);
      setError("");

      await authService.updatePassword(
        values.password
      );

      setSuccess(true);

      setTimeout(() => {
        router.replace("/login");
      }, 2500);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(
          "Terjadi kesalahan saat memperbarui password."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div
        className="
          rounded-[32px]
          border
          border-green-400/30
          bg-white/10
          p-10
          text-center
          backdrop-blur-2xl
          shadow-2xl
        "
      >
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
          <CheckCircle2 className="h-10 w-10 text-green-400" />
        </div>

        <h2 className="mt-6 text-3xl font-bold text-white">
          Password Berhasil Diubah
        </h2>

        <p className="mt-4 text-base leading-8 text-white/80">
          Password administrator berhasil
          diperbarui.
          <br />
          Anda akan diarahkan ke halaman login.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-7"
    >
      {error && (
        <div
          className="
            rounded-2xl
            border
            border-red-500/30
            bg-red-500/15
            px-4
            py-3
            text-sm
            text-red-200
            backdrop-blur-xl
          "
        >
          {error}
        </div>
      )}

      {/* Password */}

      <div className="space-y-3">
        <Label
          htmlFor="password"
          className="
            text-sm
            font-semibold
            tracking-wide
            text-white
            drop-shadow-md
          "
        >
          Password Baru
        </Label>

        <div className="relative">
          <Lock
            className="
              absolute
              left-5
              top-1/2
              -translate-y-1/2
              h-5
              w-5
              text-blue-300
            "
          />

          <Input
            id="password"
            type={
              showPassword
                ? "text"
                : "password"
            }
            autoComplete="new-password"
            placeholder="Masukkan password baru"
            className="
              h-14
              rounded-2xl

              border
              border-white/30

              bg-white/15
              backdrop-blur-xl

              pl-14
              pr-14

              text-base
              font-medium
              text-white
              caret-white

              placeholder:text-white/55

              shadow-lg
              shadow-black/20

              transition-all
              duration-300

              focus:border-blue-400
              focus:bg-white/20
              focus:ring-4
              focus:ring-blue-500/20
            "
            {...register("password")}
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
            className="
              absolute
              right-3
              top-1/2
              -translate-y-1/2

              rounded-full
              p-2

              text-white/70

              transition

              hover:bg-white/10
              hover:text-white
            "
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>

        {errors.password && (
          <p className="text-sm text-red-300">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Confirm */}

      <div className="space-y-3">
        <Label
          htmlFor="confirmPassword"
          className="
            text-sm
            font-semibold
            tracking-wide
            text-white
            drop-shadow-md
          "
        >
          Konfirmasi Password
        </Label>

        <div className="relative">
          <Lock
            className="
              absolute
              left-5
              top-1/2
              -translate-y-1/2
              h-5
              w-5
              text-blue-300
            "
          />

          <Input
            id="confirmPassword"
            type={
              showConfirmPassword
                ? "text"
                : "password"
            }
            autoComplete="new-password"
            placeholder="Ulangi password baru"
            className="
              h-14
              rounded-2xl

              border
              border-white/30

              bg-white/15
              backdrop-blur-xl

              pl-14
              pr-14

              text-base
              font-medium
              text-white
              caret-white

              placeholder:text-white/55

              shadow-lg
              shadow-black/20

              transition-all
              duration-300

              focus:border-blue-400
              focus:bg-white/20
              focus:ring-4
              focus:ring-blue-500/20
            "
            {...register(
              "confirmPassword"
            )}
          />

          <button
            type="button"
            onClick={() =>
              setShowConfirmPassword(
                !showConfirmPassword
              )
            }
            className="
              absolute
              right-3
              top-1/2
              -translate-y-1/2

              rounded-full
              p-2

              text-white/70

              transition

              hover:bg-white/10
              hover:text-white
            "
          >
            {showConfirmPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>

        {errors.confirmPassword && (
          <p className="text-sm text-red-300">
            {
              errors.confirmPassword
                .message
            }
          </p>
        )}
      </div>

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

          shadow-xl
          shadow-blue-600/30

          transition-all
          duration-300

          hover:-translate-y-0.5
          hover:from-blue-700
          hover:to-blue-600
          hover:shadow-2xl
        "
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Menyimpan...
          </>
        ) : (
          <>
            <ShieldCheck className="mr-2 h-5 w-5" />
            Simpan Password Baru
          </>
        )}
      </Button>

      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-white/20" />

        <span
          className="
            text-xs
            font-semibold
            uppercase
            tracking-[0.35em]
            text-white/60
          "
        >
          Secure Password
        </span>

        <div className="h-px flex-1 bg-white/20" />
      </div>

      <p className="text-center text-sm leading-7 text-white/75">
        Gunakan password yang kuat dengan
        kombinasi huruf besar, huruf kecil,
        angka, dan simbol agar akun
        administrator tetap aman.
      </p>

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
            hover:text-blue-200
          "
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Login
        </Link>
      </div>
    </form>
  );
}