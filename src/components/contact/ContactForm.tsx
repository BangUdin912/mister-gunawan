"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Loader2,
  Send,
} from "lucide-react";

import { toast } from "sonner";

import { messageService } from "@/lib/messageService";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z
    .string()
    .min(3, "Nama minimal 3 karakter"),

  company: z
    .string()
    .optional(),

  email: z
    .string()
    .email("Email tidak valid"),

  phone: z
    .string()
    .min(10, "Nomor WhatsApp tidak valid"),

  participant_count: z.coerce
    .number()
    .min(1, "Minimal 1 peserta"),

  event_date: z
    .string()
    .min(1, "Tanggal kegiatan wajib diisi"),

  event_time: z
    .string()
    .min(1, "Waktu kegiatan wajib diisi"),

  subject: z
    .string()
    .min(3, "Subjek wajib diisi"),

  message: z
    .string()
    .min(10, "Pesan minimal 10 karakter"),
});

type ContactFormValues = z.infer<typeof formSchema>;

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
    },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      participant_count: 1,
      event_date: "",
      event_time: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(
    values: ContactFormValues
  ) {
    try {
      setLoading(true);

      await messageService.create({
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        company: values.company?.trim() || null,
        participant_count: values.participant_count,
        event_date: values.event_date,
        event_time: values.event_time,
        subject: values.subject.trim(),
        message: values.message.trim(),
        status: "New",
      });

      toast.success(
        "Pesan berhasil dikirim. Tim kami akan segera menghubungi Anda."
      );

      reset();
    } catch (error) {
      console.error(error);

      toast.error(
        "Terjadi kesalahan saat mengirim pesan."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>

      <div className="mb-8">

        <h2 className="text-3xl font-bold">
          Form Konsultasi
        </h2>

        <p className="mt-3 text-muted-foreground">
          Isi formulir berikut dan tim kami akan segera menghubungi Anda.
        </p>

      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >

        <div className="grid gap-6 md:grid-cols-2">

          <InputField
            label="Nama Lengkap *"
            error={errors.name?.message}
            placeholder="Nama Lengkap"
            {...register("name")}
          />

          <InputField
            label="Perusahaan"
            placeholder="PT Contoh Indonesia"
            {...register("company")}
          />

        </div>

        <div className="grid gap-6 md:grid-cols-2">

          <InputField
            label="Email *"
            type="email"
            placeholder="email@contoh.com"
            error={errors.email?.message}
            {...register("email")}
          />

          <InputField
            label="WhatsApp *"
            placeholder="08123456789"
            error={errors.phone?.message}
            {...register("phone")}
          />

        </div>

        <div className="grid gap-6 md:grid-cols-2">

          <InputField
            label="Jumlah Peserta *"
            type="number"
            min={1}
            error={errors.participant_count?.message}
            {...register("participant_count", {
              valueAsNumber: true,
            })}
          />

          <InputField
            label="Subjek *"
            placeholder="Contoh: Training Leadership"
            error={errors.subject?.message}
            {...register("subject")}
          />

        </div>

        <div className="grid gap-6 md:grid-cols-2">

          <InputField
            label="Tanggal Kegiatan *"
            type="date"
            error={errors.event_date?.message}
            {...register("event_date")}
          />

          <InputField
            label="Waktu Kegiatan *"
            type="time"
            error={errors.event_time?.message}
            {...register("event_time")}
          />

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium">
            Pesan *
          </label>

          <Textarea
            rows={6}
            placeholder="Jelaskan kebutuhan training perusahaan Anda..."
            {...register("message")}
          />

          {errors.message && (
            <p className="mt-2 text-sm text-destructive">
              {errors.message.message}
            </p>
          )}

        </div>

        <Button
          type="submit"
          size="lg"
          disabled={loading}
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Mengirim...
            </>
          ) : (
            <>
              <Send className="mr-2 h-5 w-5" />
              Kirim Konsultasi
            </>
          )}
        </Button>

      </form>

    </div>
  );
}

interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {

  label: string;

  error?: string;
}

function InputField({
  label,
  error,
  ...props
}: InputFieldProps) {
  return (
    <div>

      <label className="mb-2 block text-sm font-medium">
        {label}
      </label>

      <Input {...props} />

      {error && (
        <p className="mt-2 text-sm text-destructive">
          {error}
        </p>
      )}

    </div>
  );
}