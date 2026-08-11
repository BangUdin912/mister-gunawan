"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import Image from "next/image";

import { Upload, Trash2 } from "lucide-react";

import { supabase } from "@/lib/supabase/client";

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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Switch } from "@/components/ui/switch";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type {
  Portfolio,
  PortfolioPayload,
} from "@/types/portfolio";

const formSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(3, "Judul portfolio minimal 3 karakter."),

    slug: z
      .string()
      .trim()
      .min(3, "Slug minimal 3 karakter."),

    type: z.enum(["photo", "youtube"], {
      message: "Jenis portfolio wajib dipilih.",
    }),

    category: z
      .string()
      .trim()
      .min(2, "Kategori wajib diisi."),

    thumbnail: z
      .string()
      .trim()
      .min(1, "Thumbnail wajib diupload."),

    gallery: z.array(z.string()).default([]),

    youtube_url: z
      .string()
      .trim()
      .optional(),

    description: z
      .string()
      .trim()
      .optional(),

    location: z
      .string()
      .trim()
      .optional(),

    event_date: z
      .string()
      .optional(),

    participant_count: z.coerce
      .number()
      .min(0, "Jumlah peserta tidak boleh kurang dari 0."),

    featured: z.boolean(),

    is_active: z.boolean(),
  })
  .superRefine((data, ctx) => {
    // Thumbnail wajib
    if (!data.thumbnail) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["thumbnail"],
        message: "Thumbnail wajib diupload.",
      });
    }

    // Jika jenis photo maka gallery wajib
    if (data.type === "photo") {
      if (data.gallery.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["gallery"],
          message: "Minimal upload 1 foto gallery.",
        });
      }
    }

    // Jika jenis youtube maka URL wajib
    if (data.type === "youtube") {
      if (!data.youtube_url?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["youtube_url"],
          message: "URL YouTube wajib diisi.",
        });
      } else {
        const isValidYoutube =
          /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//i.test(
            data.youtube_url
          );

        if (!isValidYoutube) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["youtube_url"],
            message: "Masukkan URL YouTube yang valid.",
          });
        }
      }
    }
  });

type FormValues = z.infer<typeof formSchema>;

interface PortfolioFormProps {
  initialData?: Portfolio | null;

  loading?: boolean;

  onSubmit: (
    values: PortfolioPayload
  ) => Promise<void>;
}

function createSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-");
}

export default function PortfolioForm({
  initialData,
  loading = false,
  onSubmit,
}: PortfolioFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      title: initialData?.title ?? "",
      slug: initialData?.slug ?? "",

      type:
        initialData?.type ??
        "photo",

      category:
        initialData?.category ?? "",

      thumbnail:
        initialData?.thumbnail ?? "",

      gallery:
        initialData?.gallery ?? [],

      youtube_url:
        initialData?.youtube_url ??
        "",

      description:
        initialData?.description ??
        "",

      location:
        initialData?.location ??
        "",

      event_date:
        initialData?.event_date ??
        "",

      participant_count:
        initialData?.participant_count ??
        0,

      featured:
        initialData?.featured ??
        false,

      is_active:
        initialData?.is_active ??
        true,
    },
  });

  const type = form.watch("type");

  const [uploadingThumbnail, setUploadingThumbnail] =
    useState(false);

  const [uploadingGallery, setUploadingGallery] =
    useState(false);

  const title = form.watch("title");

  useEffect(() => {
    if (!initialData) {
      form.setValue(
        "slug",
        createSlug(title)
      );
    }
  }, [
    title,
    form,
    initialData,
  ]);

  async function uploadThumbnail(
    file: File
  ) {
    try {
      setUploadingThumbnail(true);

      const ext = file.name.split(".").pop();

      const fileName =
        `thumbnail-${Date.now()}.${ext}`;

      const path = fileName;

      const { error } =
        await supabase.storage
          .from("portofolio")
          .upload(path, file);

      if (error) throw error;

      const { data } =
        supabase.storage
          .from("portofolio")
          .getPublicUrl(path);

      form.setValue("thumbnail", data.publicUrl, {
  shouldDirty: true,
  shouldTouch: true,
  shouldValidate: true,
});

await form.trigger("thumbnail");
    } catch (err) {
      console.error(err);
    } finally {
      setUploadingThumbnail(false);
    }
  }
  async function uploadGallery(
    files: FileList,
    currentGallery: string[],
    onChange: (value: string[]) => void
  ) {
    try {
      setUploadingGallery(true);

      const uploaded: string[] = [];

      for (const file of Array.from(files)) {
        const ext = file.name.split(".").pop();

        const fileName = `gallery-${Date.now()}-${Math.random()
          .toString(36)
          .substring(2)}.${ext}`;

        const { error } = await supabase.storage
          .from("portofolio")
          .upload(fileName, file);

        if (error) {
          console.error(error);
          continue;
        }

        const { data } = supabase.storage
          .from("portofolio")
          .getPublicUrl(fileName);

        uploaded.push(data.publicUrl);
      }

      const newGallery = [
        ...currentGallery,
        ...uploaded,
      ];

      onChange(newGallery);

      form.setValue("gallery", newGallery, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });

      await form.trigger("gallery");

      toast.success(
        `${uploaded.length} foto berhasil diupload.`
      );
    } catch (error) {
      console.error(error);

      toast.error("Gagal upload gallery.");
    } finally {
      setUploadingGallery(false);
    }
  }
  async function handleSubmit(values: FormValues) {
    const payload: PortfolioPayload = {
      ...values,

      thumbnail: values.thumbnail || null,

      youtube_url: values.youtube_url || null,

      description: values.description || null,

      location: values.location || null,

      event_date: values.event_date || null,

      gallery: values.gallery ?? [],
    };

    await onSubmit(payload);
  }

  function RequiredLabel({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <FormLabel>
        {children}
        <span className="ml-1 text-red-500">*</span>
      </FormLabel>
    );
  }

  function handleInvalidSubmit() {
    const errors = form.formState.errors;

    const labels: Record<string, string> = {
      title: "Judul Portfolio",
      type: "Jenis Portfolio",
      category: "Kategori",
      thumbnail: "Thumbnail",
      gallery: "Gallery",
      youtube_url: "URL Youtube",
    };

    const invalidFields = Object.keys(errors).map(
      (key) => labels[key] ?? key
    );

    toast.error("Data belum lengkap", {
      description:
        "Lengkapi field berikut:\n• " +
        invalidFields.join("\n• "),
    });
  }

  const fieldErrorClass = (name: keyof FormValues) =>
    form.formState.errors[name]
      ? "border-red-500 ring-red-500 focus-visible:ring-red-500 focus-visible:border-red-500"
      : "";

  function getYoutubeEmbedUrl(url: string) {
    if (!url) return null;

    const patterns = [
      /youtu\.be\/([^?&]+)/,
      /youtube\.com\/watch\?v=([^?&]+)/,
      /youtube\.com\/embed\/([^?&]+)/,
      /youtube\.com\/shorts\/([^?&]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);

      if (match) {
        return `https://www.youtube.com/embed/${match[1]}`;
      }
    }

    return null;
  }

  const youtubePreview = getYoutubeEmbedUrl(
    form.watch("youtube_url") ?? ""
  );

  const portfolioCategories = [
  {
    value: "Training",
    label: "Training",
  },
  {
    value: "Public Speaking",
    label: "Public Speaking",
  },
  {
    value: "Outbound",
    label: "Outbound",
  },
  {
    value: "Seminar",
    label: "Seminar",
  },
  {
    value: "Edukasi",
    label: "Edukasi",
  },
];

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {initialData
            ? "Edit Portfolio"
            : "Tambah Portfolio"}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(
              handleSubmit,
              handleInvalidSubmit
            )}
          >
            {/* Judul */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <RequiredLabel>
                    Judul Portfolio
                  </RequiredLabel>

                  <FormControl>
                    <Input
                      placeholder="Masukkan Judul Kegiatan"
                      {...field}
                      className={fieldErrorClass("title")}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />



            {/* Jenis */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <RequiredLabel>Jenis Portfolio</RequiredLabel>

                  <Select
                    value={field.value}
                    onValueChange={
                      field.onChange
                    }
                  >
                    <FormControl>
                      <SelectTrigger className={fieldErrorClass("type")}>
                        <SelectValue placeholder="Pilih jenis portfolio" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <SelectItem value="photo">
                        Dokumentasi Foto
                      </SelectItem>

                      <SelectItem value="youtube">
                        Video Youtube
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Kategori */}
            <FormField
  control={form.control}
  name="category"
  render={({ field }) => (
    <FormItem>
      <RequiredLabel>Kategori</RequiredLabel>

      <Select
        value={field.value}
        onValueChange={field.onChange}
      >
        <FormControl>
          <SelectTrigger
            className={fieldErrorClass("category")}
          >
            <SelectValue placeholder="Pilih Kategori" />
          </SelectTrigger>
        </FormControl>

        <SelectContent>
          {portfolioCategories.map((category) => (
            <SelectItem
              key={category.value}
              value={category.value}
            >
              {category.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <FormMessage />
    </FormItem>
  )}
/>

            {/* Thumbnail */}
            <FormField
              control={form.control}
              name="thumbnail"
              render={({ field }) => (
                <FormItem>
                  <RequiredLabel>Thumbnail</RequiredLabel>

                  <FormControl>
                    <div className="space-y-4">
                      {field.value ? (
                        <div className="relative overflow-hidden rounded-xl border bg-muted shadow-sm">
                          <Image
                            src={field.value}
                            alt="Thumbnail"
                            width={1200}
                            height={700}
                            unoptimized
                            priority
                            className="aspect-video w-full object-cover"
                          />

                          <Button
                            type="button"
                            size="icon"
                            variant="destructive"
                            className="absolute right-3 top-3"
                            onClick={() => {
                              field.onChange("");
                              form.trigger("thumbnail");
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex aspect-video items-center justify-center rounded-xl border border-dashed text-muted-foreground">
                          Thumbnail akan tampil di sini
                        </div>
                      )}

                      <label
                        className={`
    flex
    cursor-pointer
    items-center
    gap-3
    rounded-lg
    border
    border-dashed
    p-4
    transition
    hover:bg-muted

    ${form.formState.errors.thumbnail
                            ? "border-red-500 bg-red-50"
                            : ""
                          }
  `}
                      >
                        <Upload className="h-5 w-5" />

                        <span>
                          {uploadingThumbnail
                            ? "Uploading..."
                            : "Upload Thumbnail"}
                        </span>

                        <input
                          hidden
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file =
                              e.target.files?.[0];

                            if (file) {
                              uploadThumbnail(
                                file
                              );
                            }
                          }}
                        />
                      </label>
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Gallery */}
            {type === "photo" && (
              <FormField
                control={form.control}
                name="gallery"
                render={({ field }) => (
                  <FormItem>
                    <RequiredLabel>Gallery</RequiredLabel>

                    <FormControl>
                      <div className="space-y-5">
                        <label
                          className={`
    flex
    cursor-pointer
    items-center
    gap-3
    rounded-lg
    border
    border-dashed
    p-4
    transition
    hover:bg-muted

    ${form.formState.errors.gallery
                              ? "border-red-500 bg-red-50"
                              : ""
                            }
  `}
                        >
                          <Upload className="h-5 w-5" />

                          <span>
                            {uploadingGallery
                              ? "Uploading..."
                              : "Upload Gallery"}
                          </span>

                          <input
                            hidden
                            multiple
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              if (
                                e.target.files
                              ) {
                                uploadGallery(
                                  e.target
                                    .files,
                                  field.value ??
                                  [],
                                  field.onChange
                                );
                              }
                            }}
                          />
                        </label>

                        {(field.value?.length ?? 0) > 0 ? (
  <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
    {field.value!.map((image, index) => (
      <div
        key={`${image}-${index}`}
        className="group relative overflow-hidden rounded-xl border bg-muted"
      >
        <Image
          src={image}
          alt={`Gallery ${index + 1}`}
          width={500}
          height={350}
          unoptimized
          className="aspect-[4/3] w-full object-cover transition duration-300 group-hover:scale-105"
        />

        <div className="absolute left-2 top-2 rounded bg-black/70 px-2 py-1 text-xs text-white">
          {index + 1}
        </div>

        <Button
          type="button"
          size="icon"
          variant="destructive"
          className="absolute right-2 top-2"
          onClick={() => {
            const updated =
              field.value!.filter((_, i) => i !== index);

            field.onChange(updated);

            form.trigger("gallery");
          }}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    ))}
  </div>
) : (
  <div className="flex aspect-[4/3] items-center justify-center rounded-xl border border-dashed text-muted-foreground">
    Belum ada foto gallery
  </div>
)}
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Youtube */}
            {type === "youtube" && (
              <FormField
                control={form.control}
                name="youtube_url"
                render={({ field }) => (
                  <FormItem>
                    <RequiredLabel>Youtube URL</RequiredLabel>

                    <FormControl>
                      <div className="space-y-4">
  <Input
    placeholder="https://youtu.be/xxxx"
    {...field}
    className={fieldErrorClass("youtube_url")}
  />

  {youtubePreview ? (
    <div className="overflow-hidden rounded-xl border shadow-sm">
      <iframe
        src={youtubePreview}
        title="Youtube Preview"
        className="aspect-video w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  ) : (
    <div className="flex aspect-video items-center justify-center rounded-xl border border-dashed text-muted-foreground">
      Preview video YouTube akan tampil di sini
    </div>
  )}
</div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Deskripsi */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Deskripsi
                  </FormLabel>

                  <FormControl>
                    <Textarea
                      rows={6}
                      placeholder="Deskripsi kegiatan..."
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Lokasi */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Lokasi
                  </FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Purwokerto"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tanggal */}
            <FormField
              control={form.control}
              name="event_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Tanggal Kegiatan
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

            {/* Peserta */}
            <FormField
              control={form.control}
              name="participant_count"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Jumlah Peserta
                  </FormLabel>

                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Featured */}
            <FormField
              control={form.control}
              name="featured"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-xl border p-4">
                  <div>
                    <FormLabel>
                      Tampilkan di Homepage
                    </FormLabel>

                    <p className="text-sm text-muted-foreground">
                      Portfolio akan
                      muncul pada
                      halaman utama.
                    </p>
                  </div>

                  <FormControl>
                    <Switch
                      checked={
                        field.value
                      }
                      onCheckedChange={
                        field.onChange
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Status */}
            <FormField
              control={form.control}
              name="is_active"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-xl border p-4">
                  <div>
                    <FormLabel>
                      Status Aktif
                    </FormLabel>

                    <p className="text-sm text-muted-foreground">
                      Portfolio dapat
                      ditampilkan di
                      website.
                    </p>
                  </div>

                  <FormControl>
                    <Switch
                      checked={
                        field.value
                      }
                      onCheckedChange={
                        field.onChange
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={
                  loading ||
                  uploadingThumbnail ||
                  uploadingGallery
                }
              >
                {loading
                  ? "Menyimpan..."
                  : initialData
                    ? "Update Portofolio"
                    : "Simpan Portofolio"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
};