"use client";

import {
    useRef,
    useState,
} from "react";

import Image from "next/image";

import { useRouter } from "next/navigation";

import {
    useForm,
} from "react-hook-form";

import {
    z,
} from "zod";

import {
    zodResolver,
} from "@hookform/resolvers/zod";

import {
    toast,
} from "sonner";

import {
    ArrowLeft,
    ImagePlus,
    Loader2,
    Save,
    Trash2,
    Upload,
} from "lucide-react";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";

import {
    Input,
} from "@/components/ui/input";

import {
    Button,
} from "@/components/ui/button";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    Switch,
} from "@/components/ui/switch";

import {
    Label,
} from "@/components/ui/label";

import {
    Card,
} from "@/components/ui/card";

import {
    supabase,
} from "@/lib/supabase/client";

import {
    partnerService,
} from "@/lib/partnerService";

import type {
    Partner,
    PartnerPayload,
} from "@/types/partner";


/* =========================================================
   CONSTANT
========================================================= */

const MAX_FILE_SIZE =
    5 * 1024 * 1024;

const ACCEPTED_IMAGE_TYPES = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
];


/* =========================================================
   VALIDATION
========================================================= */

const formSchema = z.object({

    name: z
        .string()
        .trim()
        .min(
            2,
            "Nama perusahaan minimal 2 karakter"
        ),

    category: z.enum([
        "partner",
        "client",
    ]),

    logo: z
        .string()
        .nullable(),

    website: z
        .string()
        .trim()
        .url(
            "Website tidak valid"
        )
        .optional()
        .or(
            z.literal("")
        ),

    order_number: z.coerce
        .number()
        .min(
            0,
            "Urutan minimal 0"
        ),

    is_active: z.boolean(),

});


export type PartnerFormValues =
    z.infer<typeof formSchema>;


/* =========================================================
   PROPS
========================================================= */

interface PartnerFormProps {

    partner?: Partner | null;

}


/* =========================================================
   COMPONENT
========================================================= */

export default function PartnerForm({
    partner,
}: PartnerFormProps) {

    const router =
        useRouter();


    const fileInputRef =
        useRef<HTMLInputElement | null>(
            null
        );


    const initialLogoRef =
        useRef<string | null>(
            partner?.logo ?? null
        );


    /**
     * File yang baru diupload selama
     * sesi form ini.
     *
     * Digunakan agar file yang belum
     * tersimpan di database bisa
     * dibersihkan jika diganti.
     */
    const uploadedFilesRef =
        useRef<Set<string>>(
            new Set()
        );


    /**
     * Logo lama yang baru boleh
     * dihapus setelah database
     * berhasil disimpan.
     */
    const pendingDeleteRef =
        useRef<Set<string>>(
            new Set()
        );


    const [
        loading,
        setLoading,
    ] = useState(false);


    const [
        uploading,
        setUploading,
    ] = useState(false);


    const [
        preview,
        setPreview,
    ] = useState<string | null>(
        partner?.logo ?? null
    );


    /* =====================================================
       FORM
    ===================================================== */

    const form =
        useForm<PartnerFormValues>({

            resolver:
                zodResolver(
                    formSchema
                ),

            defaultValues: {

                name:
                    partner?.name ??
                    "",

                category:
                    partner?.category ??
                    "partner",

                logo:
                    partner?.logo ??
                    null,

                website:
                    partner?.website ??
                    "",

                order_number:
                    partner?.order_number ??
                    0,

                is_active:
                    partner?.is_active ??
                    true,

            },

        });


    const {
        control,
        handleSubmit,
        watch,
        setValue,
        setError,
        formState: {
            errors,
        },
    } = form;


    const category =
        watch("category");


    const currentLogo =
        watch("logo");


    /* =====================================================
       STORAGE HELPER
    ===================================================== */

    function getLogoBucket(
        categoryValue:
            "partner" | "client"
    ) {

        return categoryValue === "partner"
            ? "partners"
            : "clients";

    }


    /**
     * Mengambil bucket + path
     * dari public URL Supabase.
     */
    function getStoragePathFromUrl(
        url: string
    ): {
        bucket: string;
        path: string;
    } | null {

        try {

            const match =
                url.match(
                    /\/storage\/v1\/object\/public\/([^/]+)\/(.+)$/
                );


            if (!match) {
                return null;
            }


            return {

                bucket:
                    match[1],

                path:
                    decodeURIComponent(
                        match[2]
                    ),

            };

        } catch {

            return null;

        }

    }


    /**
     * Hapus file dari Supabase Storage.
     */
    async function deleteStorageFile(
        url: string
    ) {

        const storage =
            getStoragePathFromUrl(
                url
            );


        if (!storage) {
            return;
        }


        const {
            error,
        } =
            await supabase
                .storage
                .from(
                    storage.bucket
                )
                .remove([
                    storage.path,
                ]);


        if (error) {

            console.warn(
                "Delete storage file error:",
                error
            );

        }

    }


    /* =====================================================
       UPLOAD LOGO
    ===================================================== */

    async function uploadLogo(
        file: File
    ) {

        if (
            !ACCEPTED_IMAGE_TYPES.includes(
                file.type
            )
        ) {

            toast.error(
                "Format gambar harus PNG, JPG, JPEG atau WEBP"
            );

            return;

        }


        if (
            file.size >
            MAX_FILE_SIZE
        ) {

            toast.error(
                "Ukuran logo maksimal 5 MB"
            );

            return;

        }


        try {

            setUploading(true);


            const previousLogo =
                watch("logo");


            /*
             * Jika logo sebelumnya adalah
             * file baru yang belum tersimpan,
             * hapus karena akan diganti.
             */
            if (
                previousLogo &&
                uploadedFilesRef.current.has(
                    previousLogo
                )
            ) {

                await deleteStorageFile(
                    previousLogo
                );

                uploadedFilesRef.current.delete(
                    previousLogo
                );

            }


            /*
             * Jika logo sebelumnya adalah
             * logo lama dari database,
             * jangan hapus sekarang.
             *
             * Tunggu sampai update database
             * berhasil.
             */
            if (
                previousLogo &&
                previousLogo ===
                    initialLogoRef.current
            ) {

                pendingDeleteRef.current.add(
                    previousLogo
                );

            }


            const bucket =
                getLogoBucket(
                    category
                );


            const extension =
                file.name
                    .split(".")
                    .pop()
                    ?.toLowerCase() ??
                "png";


            const filename =
                `${Date.now()}-${Math.random()
                    .toString(36)
                    .substring(2, 10)}.${extension}`;


            const {
                error,
            } =
                await supabase
                    .storage
                    .from(bucket)
                    .upload(
                        filename,
                        file,
                        {
                            cacheControl:
                                "3600",

                            upsert:
                                false,

                            contentType:
                                file.type,
                        }
                    );


            if (error) {
                throw error;
            }


            const {
                data,
            } =
                supabase
                    .storage
                    .from(bucket)
                    .getPublicUrl(
                        filename
                    );


            const newUrl =
                data.publicUrl;


            uploadedFilesRef.current.add(
                newUrl
            );


            setValue(
                "logo",
                newUrl,
                {
                    shouldValidate:
                        true,

                    shouldDirty:
                        true,
                }
            );


            setPreview(
                newUrl
            );


            toast.success(
                "Logo berhasil diupload"
            );

        } catch (error) {

            console.error(
                "Upload logo error:",
                error
            );


            toast.error(
                error instanceof Error
                    ? error.message
                    : "Upload logo gagal"
            );

        } finally {

            setUploading(false);

        }

    }


    /* =====================================================
       FILE CHANGE
    ===================================================== */

    async function handleFileChange(
        event:
            React.ChangeEvent<HTMLInputElement>
    ) {

        const file =
            event.target.files?.[0];


        if (!file) {
            return;
        }


        await uploadLogo(
            file
        );


        event.target.value =
            "";

    }


    /* =====================================================
       REMOVE LOGO
    ===================================================== */

    async function removeLogo() {

        const logo =
            watch("logo");


        if (!logo) {
            return;
        }


        try {

            setUploading(true);


            /*
             * Jika file merupakan file
             * baru yang belum disimpan,
             * aman untuk langsung dihapus.
             */
            if (
                uploadedFilesRef.current.has(
                    logo
                )
            ) {

                await deleteStorageFile(
                    logo
                );

                uploadedFilesRef.current.delete(
                    logo
                );

            }


            /*
             * Jika logo berasal dari database,
             * tandai untuk dihapus setelah
             * database berhasil diperbarui.
             */
            else {

                pendingDeleteRef.current.add(
                    logo
                );

            }


            setValue(
                "logo",
                null,
                {
                    shouldValidate:
                        true,

                    shouldDirty:
                        true,
                }
            );


            setPreview(
                null
            );


            toast.success(
                "Logo berhasil dihapus"
            );

        } catch (error) {

            console.error(
                "Remove logo error:",
                error
            );


            toast.error(
                "Gagal menghapus logo"
            );

        } finally {

            setUploading(false);

        }

    }


    /* =====================================================
       DELETE OLD LOGOS
    ===================================================== */

    async function cleanupOldLogos() {

        const logos =
            Array.from(
                pendingDeleteRef.current
            );


        for (const logo of logos) {

            /*
             * Jangan hapus logo yang
             * sekarang sedang digunakan.
             */
            if (
                logo ===
                watch("logo")
            ) {

                continue;

            }


            try {

                await deleteStorageFile(
                    logo
                );

            } catch (error) {

                console.warn(
                    "Cleanup old logo error:",
                    error
                );

            }

        }


        pendingDeleteRef.current.clear();

    }


    /* =====================================================
       CLEANUP UPLOADED FILES
    ===================================================== */

    async function cleanupUploadedFiles() {

        const files =
            Array.from(
                uploadedFilesRef.current
            );


        for (const file of files) {

            /*
             * File yang sekarang menjadi
             * logo form jangan dihapus.
             */
            if (
                file ===
                watch("logo")
            ) {

                continue;

            }


            try {

                await deleteStorageFile(
                    file
                );

            } catch (error) {

                console.warn(
                    "Cleanup uploaded file error:",
                    error
                );

            }

        }

    }


    /* =====================================================
       SUBMIT
    ===================================================== */

    async function onSubmit(
        values: PartnerFormValues
    ) {

        if (loading) {
            return;
        }


        try {

            setLoading(true);


            /*
             * Logo wajib.
             */
            if (!values.logo) {

                setError(
                    "logo",
                    {
                        type:
                            "manual",

                        message:
                            "Logo wajib diupload",
                    }
                );

                setLoading(false);

                return;

            }


            const payload:
                PartnerPayload =
            {

                name:
                    values.name.trim(),

                category:
                    values.category,

                logo:
                    values.logo,

                website:
                    values.website?.trim()
                    || null,

                order_number:
                    Number(
                        values.order_number
                    ),

                is_active:
                    values.is_active,

            };


            /* =================================================
               UPDATE
            ================================================= */

            if (partner) {

                await partnerService.update(
                    partner.id,
                    payload
                );


                /*
                 * Database sudah berhasil
                 * diperbarui.
                 *
                 * Sekarang aman menghapus
                 * logo lama.
                 */
                await cleanupOldLogos();


                toast.success(
                    "Partner berhasil diperbarui"
                );

            }


            /* =================================================
               CREATE
            ================================================= */

            else {

                try {

                    await partnerService.create(
                        payload
                    );

                } catch (error) {

                    /*
                     * Jika create gagal,
                     * hapus file upload yang
                     * belum tersimpan di database.
                     */
                    await cleanupUploadedFiles();

                    throw error;

                }


                toast.success(
                    "Partner berhasil ditambahkan"
                );

            }


            /*
             * Kembali ke halaman utama.
             */
            router.push(
                "/admin/partner"
            );

        } catch (error) {

            console.error(
                "Save partner error:",
                error
            );


            toast.error(
                error instanceof Error
                    ? error.message
                    : "Terjadi kesalahan saat menyimpan partner"
            );

        } finally {

            setLoading(false);

        }

    }


    /* =====================================================
       PAGE
    ===================================================== */

    return (

        <Form {...form}>

            <form
                onSubmit={
                    handleSubmit(
                        onSubmit
                    )
                }
                className="
                    mx-auto
                    w-full
                    max-w-7xl
                    space-y-8
                "
            >

                {/* =================================================
                    HEADER
                ================================================= */}

                <div
                    className="
                        flex
                        flex-col
                        gap-4
                        lg:flex-row
                        lg:items-center
                        lg:justify-between
                    "
                >

                    <div>

                        <h1
                            className="
                                text-2xl
                                font-bold
                                tracking-tight
                                sm:text-3xl
                            "
                        >

                            {partner
                                ? "Edit Partner / Klien"
                                : "Tambah Partner / Klien"}

                        </h1>


                        <p
                            className="
                                mt-2
                                text-sm
                                text-muted-foreground
                            "
                        >

                            {partner
                                ? "Perbarui informasi partner atau klien yang terdaftar."
                                : "Tambahkan partner atau klien baru ke website."}

                        </p>

                    </div>


                    <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                            router.push(
                                "/admin/partner"
                            )
                        }
                        disabled={
                            loading ||
                            uploading
                        }
                    >

                        <ArrowLeft
                            className="
                                mr-2
                                h-4
                                w-4
                            "
                        />

                        Kembali

                    </Button>

                </div>


                {/* =================================================
                    MAIN CARD
                ================================================= */}

                <Card
                    className="
                        p-5
                        shadow-sm
                        sm:p-6
                        lg:p-8
                        xl:p-10
                    "
                >

                    {/* =================================================
                        INFORMASI DASAR
                    ================================================= */}

                    <div>

                        <div className="mb-6">

                            <h2
                                className="
                                    text-lg
                                    font-semibold
                                "
                            >
                                Informasi Partner
                            </h2>


                            <p
                                className="
                                    mt-1
                                    text-sm
                                    text-muted-foreground
                                "
                            >
                                Masukkan informasi dasar
                                partner atau klien.
                            </p>

                        </div>


                        <div
                            className="
                                grid
                                gap-6
                                lg:grid-cols-2
                            "
                        >

                            {/* NAMA */}

                            <FormField
                                control={control}
                                name="name"
                                render={({
                                    field,
                                }) => (

                                    <FormItem>

                                        <Label>

                                            Nama Perusahaan

                                            <span
                                                className="
                                                    ml-1
                                                    text-red-500
                                                "
                                            >
                                                *
                                            </span>

                                        </Label>


                                        <FormControl>

                                            <Input
                                                {...field}
                                                placeholder="PT Telkom Indonesia"
                                                className="h-11"
                                                disabled={
                                                    loading ||
                                                    uploading
                                                }
                                            />

                                        </FormControl>


                                        <FormMessage />

                                    </FormItem>

                                )}
                            />


                            {/* KATEGORI */}

                            <FormField
                                control={control}
                                name="category"
                                render={({
                                    field,
                                }) => (

                                    <FormItem>

                                        <Label>

                                            Kategori

                                            <span
                                                className="
                                                    ml-1
                                                    text-red-500
                                                "
                                            >
                                                *
                                            </span>

                                        </Label>


                                        <Select
                                            value={
                                                field.value
                                            }
                                            onValueChange={
                                                field.onChange
                                            }
                                            disabled={
                                                loading ||
                                                uploading
                                            }
                                        >

                                            <FormControl>

                                                <SelectTrigger
                                                    className="h-11"
                                                >

                                                    <SelectValue />

                                                </SelectTrigger>

                                            </FormControl>


                                            <SelectContent>

                                                <SelectItem
                                                    value="partner"
                                                >
                                                    Partner Bisnis
                                                </SelectItem>


                                                <SelectItem
                                                    value="client"
                                                >
                                                    Klien HSS
                                                </SelectItem>

                                            </SelectContent>

                                        </Select>


                                        <FormMessage />

                                    </FormItem>

                                )}
                            />

                        </div>

                    </div>


                    {/* =================================================
                        LOGO
                    ================================================= */}

                    <div
                        className="
                            mt-10
                            border-t
                            pt-10
                        "
                    >

                        <div className="mb-6">

                            <h2
                                className="
                                    text-lg
                                    font-semibold
                                "
                            >
                                Logo Perusahaan
                            </h2>


                            <p
                                className="
                                    mt-1
                                    text-sm
                                    text-muted-foreground
                                "
                            >
                                Upload logo yang akan
                                ditampilkan pada website.
                            </p>

                        </div>


                        <FormField
                            control={control}
                            name="logo"
                            render={() => (

                                <FormItem>

                                    <div
                                        className="
                                            grid
                                            gap-8
                                            lg:grid-cols-[minmax(320px,420px)_1fr]
                                        "
                                    >

                                        {/* PREVIEW */}

                                        <div
                                            className="
                                                flex
                                                min-h-[280px]
                                                w-full
                                                items-center
                                                justify-center
                                                overflow-hidden
                                                rounded-2xl
                                                border
                                                bg-muted/40
                                            "
                                        >

                                            {preview ? (

                                                <Image
                                                    src={
                                                        preview
                                                    }
                                                    alt={
                                                        `Logo ${
                                                            partner?.name ??
                                                            "partner"
                                                        }`
                                                    }
                                                    width={
                                                        420
                                                    }
                                                    height={
                                                        280
                                                    }
                                                    className="
                                                        max-h-[280px]
                                                        max-w-full
                                                        object-contain
                                                        p-8
                                                    "
                                                    unoptimized
                                                />

                                            ) : (

                                                <div
                                                    className="
                                                        flex
                                                        flex-col
                                                        items-center
                                                        gap-3
                                                        text-muted-foreground
                                                    "
                                                >

                                                    <ImagePlus
                                                        className="
                                                            h-14
                                                            w-14
                                                        "
                                                    />

                                                    <span
                                                        className="
                                                            text-sm
                                                        "
                                                    >
                                                        Belum ada logo
                                                    </span>

                                                </div>

                                            )}

                                        </div>


                                        {/* ACTION */}

                                        <div
                                            className="
                                                flex
                                                flex-col
                                                justify-center
                                                gap-5
                                            "
                                        >

                                            <input
                                                ref={
                                                    fileInputRef
                                                }
                                                type="file"
                                                accept="
                                                    image/png,
                                                    image/jpeg,
                                                    image/jpg,
                                                    image/webp
                                                "
                                                className="hidden"
                                                onChange={
                                                    handleFileChange
                                                }
                                            />


                                            <div
                                                className="
                                                    flex
                                                    flex-col
                                                    gap-3
                                                    sm:flex-row
                                                "
                                            >

                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    disabled={
                                                        loading ||
                                                        uploading
                                                    }
                                                    onClick={() =>
                                                        fileInputRef.current?.click()
                                                    }
                                                >

                                                    {uploading ? (

                                                        <>

                                                            <Loader2
                                                                className="
                                                                    mr-2
                                                                    h-4
                                                                    w-4
                                                                    animate-spin
                                                                "
                                                            />

                                                            Mengupload...

                                                        </>

                                                    ) : (

                                                        <>

                                                            <Upload
                                                                className="
                                                                    mr-2
                                                                    h-4
                                                                    w-4
                                                                "
                                                            />

                                                            Upload Logo

                                                        </>

                                                    )}

                                                </Button>


                                                {preview && (

                                                    <Button
                                                        type="button"
                                                        variant="destructive"
                                                        disabled={
                                                            loading ||
                                                            uploading
                                                        }
                                                        onClick={
                                                            removeLogo
                                                        }
                                                    >

                                                        <Trash2
                                                            className="
                                                                mr-2
                                                                h-4
                                                                w-4
                                                            "
                                                        />

                                                        Hapus Logo

                                                    </Button>

                                                )}

                                            </div>


                                            <div
                                                className="
                                                    rounded-xl
                                                    border
                                                    bg-muted/30
                                                    p-5
                                                "
                                            >

                                                <h3
                                                    className="
                                                        font-semibold
                                                    "
                                                >
                                                    Ketentuan Upload
                                                </h3>


                                                <ul
                                                    className="
                                                        mt-3
                                                        list-disc
                                                        space-y-2
                                                        pl-5
                                                        text-sm
                                                        text-muted-foreground
                                                    "
                                                >

                                                    <li>
                                                        Format PNG, JPG,
                                                        JPEG atau WEBP
                                                    </li>

                                                    <li>
                                                        Maksimal ukuran 5 MB
                                                    </li>

                                                    <li>
                                                        Disarankan menggunakan
                                                        background transparan
                                                    </li>

                                                    <li>
                                                        Logo akan disimpan
                                                        di Supabase Storage
                                                    </li>

                                                </ul>

                                            </div>


                                            {errors.logo && (

                                                <p
                                                    className="
                                                        text-sm
                                                        font-medium
                                                        text-destructive
                                                    "
                                                >
                                                    {
                                                        errors.logo.message
                                                    }
                                                </p>

                                            )}

                                        </div>

                                    </div>


                                    <FormMessage />

                                </FormItem>

                            )}
                        />

                    </div>


                    {/* =================================================
                        INFORMASI TAMBAHAN
                    ================================================= */}

                    <div
                        className="
                            mt-10
                            border-t
                            pt-10
                        "
                    >

                        <div className="mb-6">

                            <h2
                                className="
                                    text-lg
                                    font-semibold
                                "
                            >
                                Informasi Tambahan
                            </h2>


                            <p
                                className="
                                    mt-1
                                    text-sm
                                    text-muted-foreground
                                "
                            >
                                Informasi tambahan untuk
                                partner atau klien.
                            </p>

                        </div>


                        <div
                            className="
                                grid
                                gap-6
                                lg:grid-cols-2
                            "
                        >

                            {/* WEBSITE */}

                            <FormField
                                control={control}
                                name="website"
                                render={({
                                    field,
                                }) => (

                                    <FormItem>

                                        <Label>

                                            Website

                                            <span
                                                className="
                                                    ml-1
                                                    text-xs
                                                    font-normal
                                                    text-muted-foreground
                                                "
                                            >
                                                (Opsional)
                                            </span>

                                        </Label>


                                        <FormControl>

                                            <Input
                                                {...field}
                                                value={
                                                    field.value ??
                                                    ""
                                                }
                                                placeholder="https://company.com"
                                                className="h-11"
                                                disabled={
                                                    loading ||
                                                    uploading
                                                }
                                            />

                                        </FormControl>


                                        <p
                                            className="
                                                text-xs
                                                text-muted-foreground
                                            "
                                        >
                                            Jika diisi, logo dapat
                                            diarahkan ke website
                                            perusahaan.
                                        </p>


                                        <FormMessage />

                                    </FormItem>

                                )}
                            />


                            {/* ORDER */}

                            <FormField
                                control={control}
                                name="order_number"
                                render={({
                                    field,
                                }) => (

                                    <FormItem>

                                        <Label>
                                            Urutan Tampil
                                        </Label>


                                        <FormControl>

                                            <Input
                                                type="number"
                                                min={0}
                                                {...field}
                                                onChange={(
                                                    event
                                                ) =>
                                                    field.onChange(
                                                        Number(
                                                            event
                                                                .target
                                                                .value
                                                        )
                                                    )
                                                }
                                                className="h-11"
                                                disabled={
                                                    loading ||
                                                    uploading
                                                }
                                            />

                                        </FormControl>


                                        <p
                                            className="
                                                text-xs
                                                text-muted-foreground
                                            "
                                        >
                                            Angka lebih kecil akan
                                            ditampilkan lebih dahulu.
                                        </p>


                                        <FormMessage />

                                    </FormItem>

                                )}
                            />

                        </div>

                    </div>


                    {/* =================================================
                        STATUS
                    ================================================= */}

                    <div
                        className="
                            mt-10
                            rounded-xl
                            border
                            p-5
                        "
                    >

                        <FormField
                            control={control}
                            name="is_active"
                            render={({
                                field,
                            }) => (

                                <FormItem
                                    className="
                                        flex
                                        items-center
                                        justify-between
                                        gap-6
                                    "
                                >

                                    <div>

                                        <Label>
                                            Status Aktif
                                        </Label>


                                        <p
                                            className="
                                                mt-1
                                                text-sm
                                                text-muted-foreground
                                            "
                                        >
                                            Aktifkan agar partner
                                            atau klien ditampilkan
                                            pada website.
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
                                            disabled={
                                                loading ||
                                                uploading
                                            }
                                        />

                                    </FormControl>

                                </FormItem>

                            )}
                        />

                    </div>


                    {/* =================================================
                        INFORMATION
                    ================================================= */}

                    <div
                        className="
                            mt-8
                            rounded-xl
                            border
                            border-blue-200
                            bg-blue-50
                            p-5
                        "
                    >

                        <h3
                            className="
                                font-semibold
                                text-blue-900
                            "
                        >
                            Informasi
                        </h3>


                        <ul
                            className="
                                mt-3
                                list-disc
                                space-y-2
                                pl-5
                                text-sm
                                text-blue-800
                            "
                        >

                            <li>
                                Partner akan tampil pada
                                section Partner Bisnis.
                            </li>

                            <li>
                                Client akan tampil pada
                                section Klien HSS.
                            </li>

                            <li>
                                Data nonaktif tidak akan
                                ditampilkan pada website.
                            </li>

                            <li>
                                Logo partner dan client
                                disimpan pada bucket
                                Supabase Storage masing-masing.
                            </li>

                        </ul>

                    </div>


                    {/* =================================================
                        ACTION
                    ================================================= */}

                    <div
                        className="
                            mt-10
                            flex
                            flex-col-reverse
                            gap-3
                            border-t
                            pt-6
                            sm:flex-row
                            sm:justify-end
                        "
                    >

                        <Button
                            type="button"
                            variant="outline"
                            disabled={
                                loading ||
                                uploading
                            }
                            onClick={() =>
                                router.push(
                                    "/admin/partner"
                                )
                            }
                        >
                            Batal
                        </Button>


                        <Button
                            type="submit"
                            disabled={
                                loading ||
                                uploading
                            }
                            className="
                                min-w-44
                            "
                        >

                            {loading ? (

                                <>

                                    <Loader2
                                        className="
                                            mr-2
                                            h-4
                                            w-4
                                            animate-spin
                                        "
                                    />

                                    Menyimpan...

                                </>

                            ) : (

                                <>

                                    <Save
                                        className="
                                            mr-2
                                            h-4
                                            w-4
                                        "
                                    />

                                    {partner
                                        ? "Simpan Perubahan"
                                        : "Tambah Partner"}

                                </>

                            )}

                        </Button>

                    </div>

                </Card>

            </form>

        </Form>

    );

}