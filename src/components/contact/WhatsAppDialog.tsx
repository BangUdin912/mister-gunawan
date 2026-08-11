"use client";

import { useState } from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Loader2,
  MessageCircle,
} from "lucide-react";

import { toast } from "sonner";

import { messageService } from "@/lib/messageService";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const PHONE =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ??
  "6285219915626";

const schema = z.object({
  name: z
    .string()
    .min(2, "Nama minimal 2 karakter"),

  email: z
    .string()
    .email("Email tidak valid")
    .optional()
    .or(z.literal("")),

  phone: z
    .string()
    .min(10, "Nomor WhatsApp minimal 10 digit"),

  company: z.string().optional(),

  participant_count: z.coerce
    .number()
    .min(1, "Minimal 1 peserta"),

  event_date: z.string().min(
    1,
    "Tanggal kegiatan wajib diisi"
  ),

  event_time: z.string().min(
    1,
    "Waktu kegiatan wajib diisi"
  ),

  subject: z
    .string()
    .min(3, "Subjek minimal 3 karakter"),

  message: z
    .string()
    .min(10, "Pesan minimal 10 karakter"),
});

type FormValues = z.infer<typeof schema>;

interface WhatsAppDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function WhatsAppDialog({
  open,
  onOpenChange,
}: WhatsAppDialogProps) {
  const [loading, setLoading] =
    useState(false);

  const form =
    useForm<FormValues>({
      resolver: zodResolver(schema),
      defaultValues: {
        name: "",
        email: "",
        phone: "",
        company: "",
        participant_count: 1,
        event_date: "",
        event_time: "",
        subject: "",
        message: "",
      },
    });

  function handleOpenChange(
    value: boolean
  ) {
    if (!value) {
      form.reset();
    }

    onOpenChange(value);
  }

  async function onSubmit(
    values: FormValues
  ) {
    try {
      setLoading(true);

      await messageService.create({
        name: values.name.trim(),
        email: values.email || null,
        phone: values.phone.trim(),
        company:
          values.company?.trim() || null,
        participant_count:
          values.participant_count,
        event_date: values.event_date,
        event_time: values.event_time,
        subject: values.subject.trim(),
        message: values.message.trim(),
        status: "New",
      });

      const waMessage =
        encodeURIComponent(`
Halo Hartawan Sukses Sejahtera,

Saya ingin berkonsultasi mengenai training.

Nama : ${values.name}
Perusahaan : ${values.company || "-"}
WhatsApp : ${values.phone}
Email : ${values.email || "-"}

Jumlah Peserta : ${values.participant_count} Orang

Tanggal Kegiatan : ${values.event_date}
Waktu Kegiatan : ${values.event_time}

Subjek :
${values.subject}

Pesan :
${values.message}
`);

      window.open(
        `https://wa.me/${PHONE}?text=${waMessage}`,
        "_blank",
        "noopener,noreferrer"
      );

      toast.success(
        "Pesan berhasil dikirim."
      );

      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error(error);

      toast.error(
        "Gagal mengirim pesan."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={handleOpenChange}
    >
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            Konsultasi via WhatsApp
          </DialogTitle>

          <DialogDescription>
            Isi data berikut terlebih
            dahulu. Data akan tersimpan
            pada sistem kami sebelum Anda
            diarahkan ke WhatsApp.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(
              onSubmit
            )}
            className="space-y-6"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Nama Lengkap *
                    </FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Nama Lengkap"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      WhatsApp *
                    </FormLabel>

                    <FormControl>
                      <Input
                        placeholder="08xxxxxxxxxx"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Email
                    </FormLabel>

                    <FormControl>
                      <Input
                        type="email"
                        placeholder="email@contoh.com"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Perusahaan
                    </FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Nama Perusahaan"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="participant_count"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Jumlah Peserta *
                    </FormLabel>

                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Subjek *
                    </FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Training Leadership"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="event_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Tanggal Kegiatan *
                    </FormLabel>

                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="event_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Waktu Kegiatan *
                    </FormLabel>

                    <FormControl>
                      <Input
                        type="time"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Pesan *
                  </FormLabel>

                  <FormControl>
                    <Textarea
                      rows={6}
                      placeholder="Jelaskan kebutuhan training perusahaan Anda..."
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                disabled={loading}
                onClick={() =>
                  handleOpenChange(false)
                }
              >
                Batal
              </Button>

              <Button
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Mengirim...
                  </>
                ) : (
                  <>
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Lanjut ke WhatsApp
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}