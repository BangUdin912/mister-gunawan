"use client";

import { useEffect, useState } from "react";

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
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import {
    Input,
} from "@/components/ui/input";

import {
    Textarea,
} from "@/components/ui/textarea";

import {
    Button,
} from "@/components/ui/button";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Loader2,
    Mail,
    MapPin,
    MessageCircle,
    Instagram,
    Facebook,
    Linkedin,
    Youtube,
    Save,
    ExternalLink,
} from "lucide-react";

import {
    settingService,
} from "@/lib/settingService";

import type {
    Setting,
    SettingPayload,
} from "@/types/setting";

/**
 * =========================================================
 * VALIDATION
 * =========================================================
 */

/**
 * String nullable.
 *
 * String kosong akan dikonversi menjadi null.
 */
const nullableString = z.preprocess(
    (value) => {
        if (typeof value === "string") {
            const trimmed = value.trim();

            return trimmed === ""
                ? null
                : trimmed;
        }

        return value;
    },
    z
        .string()
        .nullable()
        .optional()
);

/**
 * Email nullable.
 *
 * Kosong      -> null
 * Email valid -> string
 */
const nullableEmail = z.preprocess(
    (value) => {
        if (typeof value === "string") {
            const trimmed = value.trim();

            return trimmed === ""
                ? null
                : trimmed;
        }

        return value;
    },
    z
        .string()
        .email("Format email tidak valid.")
        .nullable()
        .optional()
);

/**
 * =========================================================
 * FORM SCHEMA
 * =========================================================
 */

const formSchema = z.object({
    whatsapp: nullableString,

    email: nullableEmail,

    instagram: nullableString,

    facebook: nullableString,

    linkedin: nullableString,

    youtube: nullableString,

    address: nullableString,

    google_maps: nullableString,
});

type FormValues = z.infer<
    typeof formSchema
>;

/**
 * =========================================================
 * DEFAULT VALUES
 * =========================================================
 */

const defaultValues: FormValues = {
    whatsapp: "",
    email: "",
    instagram: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    address: "",
    google_maps: "",
};

/**
 * =========================================================
 * COMPONENT
 * =========================================================
 */

export default function SettingForm() {
    const [
        setting,
        setSetting,
    ] = useState<Setting | null>(null);

    const [
        loading,
        setLoading,
    ] = useState(true);

    const [
        saving,
        setSaving,
    ] = useState(false);

    /**
     * =====================================================
     * FORM
     * =====================================================
     */

    const form = useForm<FormValues>({
        resolver:
            zodResolver(
                formSchema
            ),

        defaultValues,
    });

    /**
     * =====================================================
     * RESET FORM FROM SETTING
     * =====================================================
     */

    function resetForm(
        data: Setting
    ) {
        form.reset({
            whatsapp:
                data.whatsapp ?? "",

            email:
                data.email ?? "",

            instagram:
                data.instagram ?? "",

            facebook:
                data.facebook ?? "",

            linkedin:
                data.linkedin ?? "",

            youtube:
                data.youtube ?? "",

            address:
                data.address ?? "",

            google_maps:
                data.google_maps ?? "",
        });
    }

    /**
     * =====================================================
     * LOAD SETTING
     * =====================================================
     */

    useEffect(() => {
        void loadSetting();
    }, []);

    async function loadSetting() {
        try {
            setLoading(true);

            /**
             * Ambil settings.
             *
             * get() sekarang dapat mengembalikan:
             *
             * Setting
             * atau
             * null
             */
            let data =
                await settingService.get();

            /**
             * =================================================
             * JIKA SETTINGS BELUM ADA
             * =================================================
             *
             * Karena ini adalah halaman ADMIN,
             * kita boleh membuat row settings pertama.
             *
             * Halaman publik tidak melakukan hal ini.
             */
            if (!data) {
                console.warn(
                    "Settings belum tersedia. Membuat data settings awal..."
                );

                data =
                    await settingService.create(
                        {}
                    );

                toast.success(
                    "Pengaturan awal berhasil dibuat."
                );
            }

            /**
             * Simpan ke state.
             */
            setSetting(data);

            /**
             * Isi form.
             */
            resetForm(data);
        } catch (error) {
            console.error(
                "Load contact settings error:",
                error
            );

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Gagal memuat contact information."
            );
        } finally {
            setLoading(false);
        }
    }

    /**
     * =====================================================
     * SAVE CONTACT INFORMATION
     * =====================================================
     *
     * Hanya field yang berubah yang
     * akan dikirim ke Supabase.
     */

    async function handleSubmit(
        values: FormValues
    ) {
        if (saving) {
            return;
        }

        if (!setting) {
            toast.error(
                "Data pengaturan belum tersedia."
            );

            return;
        }

        /**
         * Ambil field yang benar-benar
         * diubah oleh user.
         */
        const dirtyFields =
            form.formState.dirtyFields;

        const hasChanges =
            Object.keys(
                dirtyFields
            ).length > 0;

        if (!hasChanges) {
            toast.info(
                "Tidak ada perubahan yang perlu disimpan."
            );

            return;
        }

        try {
            setSaving(true);

            /**
             * =================================================
             * PARTIAL PAYLOAD
             * =================================================
             */

            const payload =
                {} as SettingPayload;

            /**
             * WhatsApp
             */
            if (
                dirtyFields.whatsapp
            ) {
                payload.whatsapp =
                    values.whatsapp?.trim() ||
                    null;
            }

            /**
             * Email
             */
            if (
                dirtyFields.email
            ) {
                payload.email =
                    values.email?.trim() ||
                    null;
            }

            /**
             * Instagram
             */
            if (
                dirtyFields.instagram
            ) {
                payload.instagram =
                    values.instagram?.trim() ||
                    null;
            }

            /**
             * Facebook
             */
            if (
                dirtyFields.facebook
            ) {
                payload.facebook =
                    values.facebook?.trim() ||
                    null;
            }

            /**
             * LinkedIn
             */
            if (
                dirtyFields.linkedin
            ) {
                payload.linkedin =
                    values.linkedin?.trim() ||
                    null;
            }

            /**
             * YouTube
             */
            if (
                dirtyFields.youtube
            ) {
                payload.youtube =
                    values.youtube?.trim() ||
                    null;
            }

            /**
             * Address
             */
            if (
                dirtyFields.address
            ) {
                payload.address =
                    values.address?.trim() ||
                    null;
            }

            /**
             * Google Maps
             */
            if (
                dirtyFields.google_maps
            ) {
                payload.google_maps =
                    values.google_maps?.trim() ||
                    null;
            }

            /**
             * Safety check.
             */
            if (
                Object.keys(
                    payload
                ).length === 0
            ) {
                toast.info(
                    "Tidak ada perubahan yang perlu disimpan."
                );

                return;
            }

            /**
             * Debug.
             */
            console.log(
                "Update Contact Payload:",
                payload
            );

            /**
             * =================================================
             * UPDATE SUPABASE
             * =================================================
             */

            const updated =
                await settingService.update(
                    setting.id,
                    payload
                );

            /**
             * Update state.
             */
            setSetting(updated);

            /**
             * =================================================
             * SYNC FORM
             * =================================================
             */

            resetForm(updated);

            toast.success(
                "Contact Information berhasil diperbarui."
            );
        } catch (error) {
            console.error(
                "Update contact information error:",
                error
            );

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Gagal menyimpan contact information."
            );
        } finally {
            setSaving(false);
        }
    }

    /**
     * =====================================================
     * LOADING
     * =====================================================
     */

    if (loading) {
        return (
            <div
                className="
                    flex
                    min-h-64
                    items-center
                    justify-center
                "
            >
                <div
                    className="
                        flex
                        items-center
                        gap-3
                        text-sm
                        text-stone-500
                    "
                >
                    <Loader2
                        className="
                            h-5
                            w-5
                            animate-spin
                        "
                    />

                    <span>
                        Memuat contact information...
                    </span>
                </div>
            </div>
        );
    }

    /**
     * =====================================================
     * UI
     * =====================================================
     */

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(
                    handleSubmit
                )}
                className="space-y-8"
            >
                {/* =================================================
                    CONTACT INFORMATION
                ================================================= */}

                <Card>
                    <CardHeader>
                        <CardTitle
                            className="
                                flex
                                items-center
                                gap-2
                            "
                        >
                            <MessageCircle
                                className="
                                    h-5
                                    w-5
                                "
                            />

                            Contact Information
                        </CardTitle>

                        <p
                            className="
                                text-sm
                                text-muted-foreground
                            "
                        >
                            Informasi kontak yang
                            ditampilkan pada halaman
                            website.
                        </p>
                    </CardHeader>

                    <CardContent
                        className="
                            space-y-8
                        "
                    >
                        {/* =================================================
                            WHATSAPP
                        ================================================= */}

                        <FormField
                            control={
                                form.control
                            }
                            name="whatsapp"
                            render={({
                                field,
                            }) => (
                                <FormItem>
                                    <FormLabel>
                                        WhatsApp
                                    </FormLabel>

                                    <FormControl>
                                        <div
                                            className="
                                                relative
                                            "
                                        >
                                            <MessageCircle
                                                className="
                                                    absolute
                                                    left-3
                                                    top-1/2
                                                    h-4
                                                    w-4
                                                    -translate-y-1/2
                                                    text-muted-foreground
                                                "
                                            />

                                            <Input
                                                {...field}
                                                value={
                                                    field.value ??
                                                    ""
                                                }
                                                placeholder="+62 877-7610-5547"
                                                className="pl-10"
                                                disabled={
                                                    saving
                                                }
                                            />
                                        </div>
                                    </FormControl>

                                    <FormDescription>
                                        Nomor WhatsApp yang
                                        digunakan pengunjung
                                        untuk menghubungi
                                        Anda.
                                    </FormDescription>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* =================================================
                            EMAIL
                        ================================================= */}

                        <FormField
                            control={
                                form.control
                            }
                            name="email"
                            render={({
                                field,
                            }) => (
                                <FormItem>
                                    <FormLabel>
                                        Email
                                    </FormLabel>

                                    <FormControl>
                                        <div
                                            className="
                                                relative
                                            "
                                        >
                                            <Mail
                                                className="
                                                    absolute
                                                    left-3
                                                    top-1/2
                                                    h-4
                                                    w-4
                                                    -translate-y-1/2
                                                    text-muted-foreground
                                                "
                                            />

                                            <Input
                                                {...field}
                                                value={
                                                    field.value ??
                                                    ""
                                                }
                                                type="email"
                                                placeholder="gunawanridwan1234@gmail.com"
                                                className="pl-10"
                                                disabled={
                                                    saving
                                                }
                                            />
                                        </div>
                                    </FormControl>

                                    <FormDescription>
                                        Email yang
                                        ditampilkan pada
                                        website.
                                    </FormDescription>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* =================================================
                            SOCIAL MEDIA
                        ================================================= */}

                        <div>
                            <h3
                                className="
                                    mb-4
                                    text-sm
                                    font-semibold
                                    text-stone-800
                                "
                            >
                                Social Media
                            </h3>

                            <div
                                className="
                                    grid
                                    gap-6
                                    md:grid-cols-2
                                "
                            >
                                {/* Instagram */}

                                <FormField
                                    control={
                                        form.control
                                    }
                                    name="instagram"
                                    render={({
                                        field,
                                    }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Instagram
                                            </FormLabel>

                                            <FormControl>
                                                <div
                                                    className="
                                                        relative
                                                    "
                                                >
                                                    <Instagram
                                                        className="
                                                            absolute
                                                            left-3
                                                            top-1/2
                                                            h-4
                                                            w-4
                                                            -translate-y-1/2
                                                            text-muted-foreground
                                                        "
                                                    />

                                                    <Input
                                                        {...field}
                                                        value={
                                                            field.value ??
                                                            ""
                                                        }
                                                        placeholder="@mistergunawan"
                                                        className="pl-10"
                                                        disabled={
                                                            saving
                                                        }
                                                    />
                                                </div>
                                            </FormControl>

                                            <FormDescription>
                                                Username atau
                                                URL Instagram.
                                            </FormDescription>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Facebook */}

                                <FormField
                                    control={
                                        form.control
                                    }
                                    name="facebook"
                                    render={({
                                        field,
                                    }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Facebook
                                            </FormLabel>

                                            <FormControl>
                                                <div
                                                    className="
                                                        relative
                                                    "
                                                >
                                                    <Facebook
                                                        className="
                                                            absolute
                                                            left-3
                                                            top-1/2
                                                            h-4
                                                            w-4
                                                            -translate-y-1/2
                                                            text-muted-foreground
                                                        "
                                                    />

                                                    <Input
                                                        {...field}
                                                        value={
                                                            field.value ??
                                                            ""
                                                        }
                                                        placeholder="facebook.com/mistergunawantrainer"
                                                        className="pl-10"
                                                        disabled={
                                                            saving
                                                        }
                                                    />
                                                </div>
                                            </FormControl>

                                            <FormDescription>
                                                URL halaman
                                                Facebook.
                                            </FormDescription>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* LinkedIn */}

                                <FormField
                                    control={
                                        form.control
                                    }
                                    name="linkedin"
                                    render={({
                                        field,
                                    }) => (
                                        <FormItem>
                                            <FormLabel>
                                                LinkedIn
                                            </FormLabel>

                                            <FormControl>
                                                <div
                                                    className="
                                                        relative
                                                    "
                                                >
                                                    <Linkedin
                                                        className="
                                                            absolute
                                                            left-3
                                                            top-1/2
                                                            h-4
                                                            w-4
                                                            -translate-y-1/2
                                                            text-muted-foreground
                                                        "
                                                    />

                                                    <Input
                                                        {...field}
                                                        value={
                                                            field.value ??
                                                            ""
                                                        }
                                                        placeholder="linkedin.com/in/mistergunawan"
                                                        className="pl-10"
                                                        disabled={
                                                            saving
                                                        }
                                                    />
                                                </div>
                                            </FormControl>

                                            <FormDescription>
                                                URL profil
                                                LinkedIn.
                                            </FormDescription>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* YouTube */}

                                <FormField
                                    control={
                                        form.control
                                    }
                                    name="youtube"
                                    render={({
                                        field,
                                    }) => (
                                        <FormItem>
                                            <FormLabel>
                                                YouTube
                                            </FormLabel>

                                            <FormControl>
                                                <div
                                                    className="
                                                        relative
                                                    "
                                                >
                                                    <Youtube
                                                        className="
                                                            absolute
                                                            left-3
                                                            top-1/2
                                                            h-4
                                                            w-4
                                                            -translate-y-1/2
                                                            text-muted-foreground
                                                        "
                                                    />

                                                    <Input
                                                        {...field}
                                                        value={
                                                            field.value ??
                                                            ""
                                                        }
                                                        placeholder="https://youtube.com/@mistergunawan"
                                                        className="pl-10"
                                                        disabled={
                                                            saving
                                                        }
                                                    />
                                                </div>
                                            </FormControl>

                                            <FormDescription>
                                                URL channel
                                                YouTube.
                                            </FormDescription>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        {/* =================================================
                            LOCATION
                        ================================================= */}

                        <div>
                            <h3
                                className="
                                    mb-4
                                    text-sm
                                    font-semibold
                                    text-stone-800
                                "
                            >
                                Lokasi
                            </h3>

                            <div
                                className="
                                    space-y-6
                                "
                            >
                                {/* Address */}

                                <FormField
                                    control={
                                        form.control
                                    }
                                    name="address"
                                    render={({
                                        field,
                                    }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Alamat
                                            </FormLabel>

                                            <FormControl>
                                                <div
                                                    className="
                                                        relative
                                                    "
                                                >
                                                    <MapPin
                                                        className="
                                                            absolute
                                                            left-3
                                                            top-4
                                                            h-4
                                                            w-4
                                                            text-muted-foreground
                                                        "
                                                    />

                                                    <Textarea
                                                        {...field}
                                                        value={
                                                            field.value ??
                                                            ""
                                                        }
                                                        rows={4}
                                                        placeholder="Jl. Damai No.8, Ragunan, Jakarta Selatan"
                                                        className="pl-10"
                                                        disabled={
                                                            saving
                                                        }
                                                    />
                                                </div>
                                            </FormControl>

                                            <FormDescription>
                                                Alamat yang
                                                ditampilkan
                                                pada halaman
                                                kontak.
                                            </FormDescription>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Google Maps */}

                                <FormField
                                    control={
                                        form.control
                                    }
                                    name="google_maps"
                                    render={({
                                        field,
                                    }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Link Google
                                                Maps
                                            </FormLabel>

                                            <FormControl>
                                                <div
                                                    className="
                                                        relative
                                                    "
                                                >
                                                    <MapPin
                                                        className="
                                                            absolute
                                                            left-3
                                                            top-1/2
                                                            h-4
                                                            w-4
                                                            -translate-y-1/2
                                                            text-muted-foreground
                                                        "
                                                    />

                                                    <Input
                                                        {...field}
                                                        value={
                                                            field.value ??
                                                            ""
                                                        }
                                                        type="url"
                                                        placeholder="https://maps.google.com/..."
                                                        className="pl-10"
                                                        disabled={
                                                            saving
                                                        }
                                                    />
                                                </div>
                                            </FormControl>

                                            <FormDescription>
                                                Link yang
                                                digunakan
                                                ketika
                                                pengunjung
                                                mengklik
                                                lokasi.
                                            </FormDescription>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        {/* =================================================
                            SAVE
                        ================================================= */}

                        <div
                            className="
                                flex
                                flex-col
                                gap-4
                                border-t
                                pt-6
                                sm:flex-row
                                sm:items-center
                                sm:justify-between
                            "
                        >
                            <div
                                className="
                                    text-sm
                                    text-muted-foreground
                                "
                            >
                                {form.formState.isDirty ? (
                                    <span>
                                        Ada perubahan
                                        yang belum
                                        disimpan.
                                    </span>
                                ) : (
                                    <span>
                                        Semua perubahan
                                        sudah tersimpan.
                                    </span>
                                )}
                            </div>

                            <Button
                                type="submit"
                                disabled={
                                    saving ||
                                    !form.formState.isDirty
                                }
                                className="
                                    min-w-44
                                    rounded-xl
                                "
                            >
                                {saving ? (
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

                                        Simpan Perubahan
                                    </>
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* =================================================
                    PREVIEW / INFORMATION
                ================================================= */}

                <Card>
                    <CardHeader>
                        <CardTitle>
                            Informasi yang Ditampilkan
                        </CardTitle>

                        <p
                            className="
                                text-sm
                                text-muted-foreground
                            "
                        >
                            Data berikut akan digunakan
                            pada bagian Contact Information
                            di website.
                        </p>
                    </CardHeader>

                    <CardContent>
                        <div
                            className="
                                grid
                                gap-4
                                sm:grid-cols-2
                            "
                        >
                            {/* WhatsApp */}

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-3
                                    rounded-xl
                                    border
                                    p-4
                                "
                            >
                                <MessageCircle
                                    className="
                                        h-5
                                        w-5
                                    "
                                />

                                <div>
                                    <p
                                        className="
                                            text-sm
                                            font-medium
                                        "
                                    >
                                        WhatsApp
                                    </p>

                                    <p
                                        className="
                                            text-xs
                                            text-muted-foreground
                                        "
                                    >
                                        {setting?.whatsapp ||
                                            "Belum diatur"}
                                    </p>
                                </div>
                            </div>

                            {/* Email */}

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-3
                                    rounded-xl
                                    border
                                    p-4
                                "
                            >
                                <Mail
                                    className="
                                        h-5
                                        w-5
                                    "
                                />

                                <div>
                                    <p
                                        className="
                                            text-sm
                                            font-medium
                                        "
                                    >
                                        Email
                                    </p>

                                    <p
                                        className="
                                            break-all
                                            text-xs
                                            text-muted-foreground
                                        "
                                    >
                                        {setting?.email ||
                                            "Belum diatur"}
                                    </p>
                                </div>
                            </div>

                            {/* Instagram */}

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-3
                                    rounded-xl
                                    border
                                    p-4
                                "
                            >
                                <Instagram
                                    className="
                                        h-5
                                        w-5
                                    "
                                />

                                <div>
                                    <p
                                        className="
                                            text-sm
                                            font-medium
                                        "
                                    >
                                        Instagram
                                    </p>

                                    <p
                                        className="
                                            break-all
                                            text-xs
                                            text-muted-foreground
                                        "
                                    >
                                        {setting?.instagram ||
                                            "Belum diatur"}
                                    </p>
                                </div>
                            </div>

                            {/* Facebook */}

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-3
                                    rounded-xl
                                    border
                                    p-4
                                "
                            >
                                <Facebook
                                    className="
                                        h-5
                                        w-5
                                    "
                                />

                                <div>
                                    <p
                                        className="
                                            text-sm
                                            font-medium
                                        "
                                    >
                                        Facebook
                                    </p>

                                    <p
                                        className="
                                            break-all
                                            text-xs
                                            text-muted-foreground
                                        "
                                    >
                                        {setting?.facebook ||
                                            "Belum diatur"}
                                    </p>
                                </div>
                            </div>

                            {/* LinkedIn */}

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-3
                                    rounded-xl
                                    border
                                    p-4
                                "
                            >
                                <Linkedin
                                    className="
                                        h-5
                                        w-5
                                    "
                                />

                                <div>
                                    <p
                                        className="
                                            text-sm
                                            font-medium
                                        "
                                    >
                                        LinkedIn
                                    </p>

                                    <p
                                        className="
                                            break-all
                                            text-xs
                                            text-muted-foreground
                                        "
                                    >
                                        {setting?.linkedin ||
                                            "Belum diatur"}
                                    </p>
                                </div>
                            </div>

                            {/* YouTube */}

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-3
                                    rounded-xl
                                    border
                                    p-4
                                "
                            >
                                <Youtube
                                    className="
                                        h-5
                                        w-5
                                    "
                                />

                                <div>
                                    <p
                                        className="
                                            text-sm
                                            font-medium
                                        "
                                    >
                                        YouTube
                                    </p>

                                    <p
                                        className="
                                            break-all
                                            text-xs
                                            text-muted-foreground
                                        "
                                    >
                                        {setting?.youtube ||
                                            "Belum diatur"}
                                    </p>
                                </div>
                            </div>

                            {/* Address */}

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-3
                                    rounded-xl
                                    border
                                    p-4
                                "
                            >
                                <MapPin
                                    className="
                                        h-5
                                        w-5
                                    "
                                />

                                <div>
                                    <p
                                        className="
                                            text-sm
                                            font-medium
                                        "
                                    >
                                        Lokasi
                                    </p>

                                    <p
                                        className="
                                            text-xs
                                            text-muted-foreground
                                        "
                                    >
                                        {setting?.address ||
                                            "Belum diatur"}
                                    </p>
                                </div>
                            </div>

                            {/* Google Maps */}

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-3
                                    rounded-xl
                                    border
                                    p-4
                                "
                            >
                                <ExternalLink
                                    className="
                                        h-5
                                        w-5
                                    "
                                />

                                <div>
                                    <p
                                        className="
                                            text-sm
                                            font-medium
                                        "
                                    >
                                        Google Maps
                                    </p>

                                    <p
                                        className="
                                            break-all
                                            text-xs
                                            text-muted-foreground
                                        "
                                    >
                                        {setting?.google_maps ||
                                            "Belum diatur"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </Form>
    );
}