"use client";
import Image from "next/image";
import {
    useEffect,
    useState,
} from "react";

import {
    useRouter,
} from "next/navigation";

import {
    useForm,
} from "react-hook-form";

import {
    zodResolver,
} from "@hookform/resolvers/zod";

import {
    z,
} from "zod";


import type {
    Service,
} from "@/types/service";


import {
    serviceService,
} from "@/lib/serviceService";


import {
    storageService,
} from "@/lib/storageService";


import {
    Button,
} from "@/components/ui/button";


import {
    Input,
} from "@/components/ui/input";


import {
    Textarea,
} from "@/components/ui/textarea";


import {
    Switch,
} from "@/components/ui/switch";


import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";


import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

const schema = z.object({
    title: z
        .string()
        .trim()
        .min(3, "Judul training minimal 3 karakter."),

    short_description: z
        .string()
        .trim()
        .min(10, "Deskripsi singkat minimal 10 karakter."),

    description: z
        .string()
        .trim()
        .min(20, "Deskripsi lengkap minimal 20 karakter."),

    activity_type: z.enum(
        ["online", "offline"],
        {
            message: "Pilih jenis kegiatan.",
        }
    ),

    package_type: z.enum(
        ["personal", "event"],
        {
            message: "Pilih jenis paket.",
        }
    ),

    benefits: z
        .array(z.string())
        .min(1, "Minimal tambahkan 1 benefit."),

    flow: z
        .array(z.string())
        .min(1, "Minimal tambahkan 1 alur kegiatan."),

    gallery: z.array(z.string()),

    featured: z.boolean(),

    is_active: z.boolean(),
});
type FormValues =
    z.infer<typeof schema>;
interface Props {
    service?: Service;
}
function createSlug(
    text: string
) {

    return text
        .toLowerCase()
        .trim()
        .replace(
            /[^a-z0-9]+/g,
            "-"
        )
        .replace(
            /^-+|-+$/g,
            "");

}
export default function ServiceForm({
    service,
}: Props) {
    const router =
        useRouter();
    const [
        imageFile,
        setImageFile
    ] = useState<File | null>(null);
    const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
    const [galleryPreview, setGalleryPreview] = useState<string[]>([]);
    const [galleryImages, setGalleryImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [
        preview,
        setPreview
    ] = useState<string>("");
    const [
        benefitInput,
        setBenefitInput
    ] = useState("");
    const [
        flowInput,
        setFlowInput
    ] = useState("");
    const form =
        useForm<FormValues>({

            resolver:
                zodResolver(schema),


            defaultValues: {

                title: "",

                short_description: "",

                description: "",


                activity_type:
                    "offline",


                package_type:
                    "personal",


                benefits: [],
                gallery: [],

                flow: [],


                featured: false,


                is_active: true,

            }

        });

    useEffect(() => {

        if (!service)
            return;

        form.reset({
            title: service.title ?? "",
            short_description: service.short_description ?? "",
            description: service.description ?? "",

            activity_type:
                service.activity_type ?? "offline",

            package_type:
                service.package_type ?? "personal",

            benefits:
                service.benefits ?? [],

            flow:
                service.flow ?? [],

            gallery:
                service.gallery ?? [],

            featured:
                service.featured ?? false,

            is_active:
                service.is_active ?? true,
        });


        if (service.thumbnail) {
            setPreview(service.thumbnail);
        }


        // gallery lama
        setGalleryImages(
            service.gallery ?? []
        );


    }, [
        service,
        form
    ]);
    function addBenefit() {

        const value =
            benefitInput.trim();


        if (!value)
            return;


        form.setValue(
            "benefits",
            [
                ...form.getValues("benefits"),
                value
            ]
        );


        setBenefitInput("");

    }
    function removeBenefit(
        index: number
    ) {

        form.setValue(
            "benefits",
            form
                .getValues("benefits")
                .filter(
                    (_, i) => i !== index
                )
        );

    }
    function addFlow() {

        const value =
            flowInput.trim();


        if (!value)
            return;
        form.setValue(
            "flow",
            [
                ...form.getValues("flow"),
                value
            ]
        );
        setFlowInput("");

    }
    function removeFlow(
        index: number
    ) {

        form.setValue(
            "flow",
            form
                .getValues("flow")
                .filter(
                    (_, i) => i !== index
                )
        );

    }
    async function onSubmit(values: FormValues) {
        try {
            setLoading(true);

            console.log(values);

            let thumbnail = service?.thumbnail ?? null;

            if (imageFile) {
                thumbnail = await storageService.upload(imageFile);
            }

            let gallery = [...galleryImages];

            if (galleryFiles.length > 0) {
                const urls = await Promise.all(
                    galleryFiles.map(file =>
                        storageService.upload(file)
                    )
                );

                gallery.push(...urls);
            }

            const payload = {
                slug: createSlug(values.title),

                title: values.title,

                thumbnail,

                short_description:
                    values.short_description,

                description:
                    values.description,

                activity_type:
                    values.activity_type,

                package_type:
                    values.package_type,

                benefits:
                    values.benefits,

                flow:
                    values.flow,

                gallery,

                featured:
                    values.featured,

                is_active:
                    values.is_active,
            };
            if (!service && !imageFile) {
                form.setError("title", {
                    type: "manual",
                    message:
                        "Thumbnail training wajib diupload terlebih dahulu.",
                });

                alert("Thumbnail belum dipilih.");

                return;
            }
            console.log(payload);

            if (service) {
                await serviceService.update(
                    service.id,
                    payload
                );
            } else {
                await serviceService.create(payload);
            }

            alert("Training berhasil disimpan.");

            router.push("/admin/trainings");

            router.refresh();

        } catch (err) {

            console.error(err);

            if (err instanceof Error) {
                alert(err.message);
            } else {
                alert("Gagal menyimpan data.");
            }

        } finally {
            setLoading(false);
        }
    }

    return (

        <Card>

            <CardHeader>

                <CardTitle>

                    {
                        service
                            ?
                            "Edit Training"
                            :
                            "Tambah Training"
                    }

                </CardTitle>

            </CardHeader>
            <CardContent>
                <Form {...form}>


                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();

                            const valid = await form.trigger();

                            if (!valid) {
                                const firstError =
                                    Object.values(form.formState.errors)[0];

                                console.log(firstError);

                                alert(
                                    "Masih ada data yang wajib diisi."
                                );

                                return;
                            }

                            form.handleSubmit(onSubmit)(e);
                        }}
                    >

                        <FormField

                            control={form.control}

                            name="title"

                            render={({ field }) => (


                                <FormItem>


                                    <FormLabel>
                                        Judul Training
                                        <span className="ml-1 text-red-600">*</span>
                                    </FormLabel>


                                    <FormControl>

                                        <Input

                                            {...field}

                                            placeholder="Public Speaking Masterclass"

                                        />

                                    </FormControl>


                                    <FormMessage />


                                </FormItem>


                            )}

                        />

                        {/* IMAGE UPLOAD */}

                        <div className="space-y-3">
                            <FormLabel>Thumbnail Training (Cover Card & Hero)
                                <span className="ml-1 text-red-600">*</span>
                            </FormLabel>

                            <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];

                                    if (!file) return;

                                    setImageFile(file);
                                    setPreview(URL.createObjectURL(file));
                                }}
                            />

                            {preview && (
                                <Image
                                    src={preview}
                                    alt="Thumbnail"
                                    width={320}
                                    height={200}
                                    className="h-48 w-80 rounded-xl border object-cover"
                                />
                            )}
                        </div>

                        <div className="space-y-4 rounded-xl border p-5">
                            <div>
                                <h3 className="text-lg font-semibold">
                                    Galeri Dokumentasi
                                </h3>

                                <p className="text-sm text-muted-foreground">
                                    Upload beberapa foto kegiatan training.
                                    Foto-foto ini akan tampil pada halaman detail training.
                                </p>
                            </div>

                            <Input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={(e) => {

                                    const files =
                                        Array.from(
                                            e.target.files ?? []
                                        );


                                    setGalleryFiles(files);


                                    setGalleryPreview(
                                        files.map(file =>
                                            URL.createObjectURL(file)
                                        )
                                    );

                                }}
                            />
                            {

                            }

                            {galleryFiles.length > 0 && (
                                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                    {galleryFiles.map((file, index) => (
                                        <div
                                            key={index}
                                            className="relative aspect-[4/3] overflow-hidden rounded-xl border"
                                        >
                                            <Image
                                                src={URL.createObjectURL(file)}
                                                alt=""
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {
                                galleryImages.length > 0 && (

                                    <div>

                                        <p className="mb-3 text-sm font-medium">
                                            Foto Gallery Tersimpan
                                        </p>


                                        <div className="
grid
grid-cols-2
gap-4
md:grid-cols-4
">

                                            {
                                                galleryImages.map(
                                                    (image, index) => (

                                                        <div
                                                            key={image}
                                                            className="
group
relative
aspect-[4/3]
overflow-hidden
rounded-xl
border
"
                                                        >


                                                            <Image
                                                                src={image}
                                                                alt={`Gallery ${index + 1}`}
                                                                fill
                                                                className="object-cover"
                                                            />


                                                            <Button
                                                                type="button"
                                                                size="icon"
                                                                variant="destructive"
                                                                className="
absolute
right-2
top-2
h-8
w-8
opacity-0
transition
group-hover:opacity-100
"
                                                                onClick={() => {


                                                                    const updated =
                                                                        galleryImages.filter(
                                                                            (_, i) => i !== index
                                                                        );


                                                                    setGalleryImages(updated);


                                                                    form.setValue(
                                                                        "gallery",
                                                                        updated
                                                                    );


                                                                }}
                                                            >
                                                                ✕
                                                            </Button>


                                                        </div>

                                                    ))
                                            }

                                        </div>

                                    </div>

                                )
                            }
                        </div>
                        <FormField
                            control={form.control}
                            name="short_description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Deskripsi Singkat
                                        <span className="ml-1 text-red-600">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            rows={3}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Deskripsi Lengkap
                                        <span className="ml-1 text-red-600">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            rows={8}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid gap-6 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="activity_type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Kegiatan
                                            <span className="ml-1 text-red-600">*</span>
                                        </FormLabel>
                                        <select
                                            className="w-full rounded-lg border px-3 py-2"
                                            value={field.value}
                                            onChange={field.onChange}
                                        >
                                            <option value="offline">
                                                Offline
                                            </option>
                                            <option value="online">
                                                Online
                                            </option>
                                        </select>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="package_type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Paket
                                            <span className="ml-1 text-red-600">*</span>
                                        </FormLabel>
                                        <select
                                            className="w-full rounded-lg border px-3 py-2"
                                            value={field.value}
                                            onChange={field.onChange}
                                        >
                                            <option value="personal">
                                                Perorangan
                                            </option>
                                            <option value="event">
                                                Per-acara
                                            </option>
                                        </select>
                                    </FormItem>
                                )}
                            />
                        </div>
                        {/* BENEFITS */}
                        <div className="space-y-4 rounded-xl border p-5">
                            <div>
                                <h3 className="font-semibold text-lg">Benefit Training
                                    <span className="ml-1 text-red-600">*</span>
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Tambahkan manfaat yang akan diperoleh peserta.
                                </p>
                            </div>

                            <div className="flex gap-2">
                                <Input
                                    value={benefitInput}
                                    placeholder="Contoh: Meningkatkan kemampuan public speaking"
                                    onChange={(e) => setBenefitInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            addBenefit();
                                        }
                                    }}
                                />

                                <Button
                                    type="button"
                                    onClick={addBenefit}
                                >
                                    Tambah
                                </Button>
                            </div>

                            {form.watch("benefits").length > 0 && (
                                <div className="space-y-2">
                                    {form.watch("benefits").map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between rounded-lg border bg-muted/30 px-3 py-2"
                                        >
                                            <span className="text-sm">{item}</span>

                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => removeBenefit(index)}
                                            >
                                                Hapus
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <FormMessage>
                            {form.formState.errors.benefits?.message}
                        </FormMessage>

                        {/* FLOW */}
                        <div className="space-y-4 rounded-xl border p-5">
                            <div>
                                <h3 className="font-semibold text-lg">Alur Kegiatan
                                    <span className="ml-1 text-red-600">*</span>
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Tambahkan tahapan kegiatan training secara berurutan.
                                </p>
                            </div>

                            <div className="flex gap-2">
                                <Input
                                    value={flowInput}
                                    placeholder="Contoh: Pembukaan & Ice Breaking"
                                    onChange={(e) => setFlowInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            addFlow();
                                        }
                                    }}
                                />

                                <Button
                                    type="button"
                                    onClick={addFlow}
                                >
                                    Tambah
                                </Button>
                            </div>

                            {form.watch("flow").length > 0 && (
                                <div className="space-y-2">
                                    {form.watch("flow").map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between rounded-lg border bg-muted/30 px-3 py-2"
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                                                    {index + 1}
                                                </span>

                                                <span className="text-sm">{item}</span>
                                            </div>

                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => removeFlow(index)}
                                            >
                                                Hapus
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <FormMessage>
                            {form.formState.errors.flow?.message}
                        </FormMessage>

                        {/* BENEFIT DAN FLOW tetap gunakan kode sebelumnya */}
                        <FormField
                            control={form.control}
                            name="featured"
                            render={({ field }) => (
                                <FormItem className="flex justify-between rounded-lg border p-4">
                                    <div>
                                        <FormLabel>
                                            Featured
                                        </FormLabel>
                                        <p className="text-sm text-slate-500">
                                            Tampilkan di homepage
                                        </p>
                                    </div>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="is_active"
                            render={({ field }) => (
                                <FormItem className="flex justify-between rounded-lg border p-4">
                                    <FormLabel>
                                        Aktif
                                    </FormLabel>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-end gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() =>
                                    router.back()
                                }
                            >
                                Batal
                            </Button>
                            <Button
                                type="submit"
                                disabled={loading}
                            >
                                {loading
                                    ? "Menyimpan..."
                                    : service
                                        ? "Simpan Perubahan"
                                        : "Tambah Training"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
            
        </Card>
    );
}