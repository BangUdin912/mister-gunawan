"use client";

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


import Image from "next/image";


import {
    supabase,
} from "@/lib/supabase/client";


import type {
    Partner,
} from "@/types/partner";


import {
    Button,
} from "@/components/ui/button";


import {
    Input,
} from "@/components/ui/input";


import {
    Label,
} from "@/components/ui/label";


import {
    Switch,
} from "@/components/ui/switch";


import {
    toast,
} from "sonner";


import {
    Loader2,
} from "lucide-react";





const schema = z.object({

    name:
        z.string()
        .min(
            2,
            "Nama wajib diisi"
        ),


    website:
        z.string()
        .optional(),


    category:
        z.enum([
            "partner",
            "client",
        ]),


    order_number:
        z.coerce
        .number()
        .min(
            0
        ),


    is_active:
        z.boolean(),

});



type FormValues =
    z.infer<typeof schema>;






interface PartnerEditProps {

    partner: Partner;

}







export default function PartnerEdit({

    partner,

}:PartnerEditProps){



    const router =
        useRouter();




    const [
        loading,
        setLoading
    ] = useState(false);




    const [
        file,
        setFile
    ] = useState<File | null>(null);




    const [
        preview,
        setPreview
    ] = useState<string | null>(
        partner.logo
    );








    const form =
        useForm<FormValues>({

            resolver:
                zodResolver(schema),


            defaultValues:{


                name:
                    partner.name,


                website:
                    partner.website
                    ??
                    "",


                category:
                    partner.category,


                order_number:
                    partner.order_number
                    ??
                    0,


                is_active:
                    partner.is_active,


            }

        });









    useEffect(()=>{


        if(!file)
            return;



        const url =
            URL.createObjectURL(
                file
            );



        setPreview(
            url
        );



        return ()=>{

            URL.revokeObjectURL(
                url
            );

        };


    },[
        file
    ]);











    function getBucket(
        category:
        "partner"
        |
        "client"
    ){


        return category === "partner"
            ? "partners"
            : "clients";


    }









    function getPathFromUrl(
        url:string
    ){


        const match =
            url.match(
                /\/public\/([^/]+)\/(.+)$/
            );



        if(!match)
            return null;



        return {

            bucket:
                match[1],


            path:
                match[2],

        };


    }









    async function deleteOldLogo(
        url:string
    ){


        const storage =
            getPathFromUrl(
                url
            );



        if(!storage)
            return;



        const {
            error
        } =
        await supabase.storage
            .from(
                storage.bucket
            )
            .remove([
                storage.path
            ]);



        if(error){

            console.warn(
                "Delete logo error",
                error
            );

        }


    }











    async function uploadLogo(){


        if(!file)
            return partner.logo;



        const category =
            form.getValues(
                "category"
            );



        const bucket =
            getBucket(
                category
            );



        const extension =
            file.name
            .split(".")
            .pop()
            ?.toLowerCase()
            ||
            "png";



        const filename =
            `${crypto.randomUUID()}.${extension}`;







        const {
            error
        } =
        await supabase.storage
            .from(
                bucket
            )
            .upload(

                filename,

                file,

                {

                    cacheControl:
                        "3600",

                    upsert:
                        false,

                }

            );



        if(error)
            throw error;







        const {
            data
        } =
        supabase.storage
            .from(
                bucket
            )
            .getPublicUrl(
                filename
            );



        return data.publicUrl;


    }









    async function onSubmit(
        values:FormValues
    ){



        try {


            setLoading(
                true
            );



            let logo =
                partner.logo;





            if(file){


                logo =
                    await uploadLogo();



                if (partner.logo) {

    await deleteOldLogo(
        partner.logo
    );

}


            }







            const {
                error
            } =
            await supabase
                .from(
                    "partners"
                )
                .update({

                    name:
                        values.name.trim(),


                    website:
                        values.website?.trim()
                        ||
                        null,


                    category:
                        values.category,


                    order_number:
                        values.order_number,


                    is_active:
                        values.is_active,


                    logo,


                    updated_at:
                        new Date()
                        .toISOString(),

                })
                .eq(
                    "id",
                    partner.id
                );





            if(error)
                throw error;





            toast.success(
                "Partner berhasil diperbarui"
            );



            router.push(
                "/admin/partners"
            );



            router.refresh();




        }
        catch(error){


            console.error(
                error
            );


            toast.error(
                "Gagal memperbarui partner"
            );


        }
        finally{


            setLoading(
                false
            );


        }


    }









    return (

        <form

            onSubmit={
                form.handleSubmit(
                    onSubmit
                )
            }

            className="
                space-y-6
            "

        >




            <div>

                <Label>
                    Nama Perusahaan *
                </Label>


                <Input

                    {...form.register(
                        "name"
                    )}

                />

            </div>







            <div>

                <Label>
                    Website
                </Label>


                <Input

                    {...form.register(
                        "website"
                    )}

                    placeholder="https://example.com"

                />

            </div>








            <div>

                <Label>
                    Ganti Logo
                </Label>


                <Input

                    type="file"

                    accept="
                    image/png,
                    image/jpeg,
                    image/webp
                    "

                    onChange={
                        e =>
                        setFile(
                            e.target.files?.[0]
                            ??
                            null
                        )
                    }

                />

            </div>









            {
            preview &&

            (

            <div
                className="
                relative
                h-40
                w-40
                overflow-hidden
                rounded-lg
                border
                bg-white
                "
            >


                <Image

                    src={
                        preview
                    }

                    alt="Preview Logo"

                    fill

                    className="
                    object-contain
                    p-4
                    "

                    unoptimized={
                        preview.startsWith(
                            "blob:"
                        )
                    }

                />


            </div>

            )

            }









            <div>

                <Label>
                    Kategori
                </Label>



                <select

                    className="
                    w-full
                    rounded-md
                    border
                    p-2
                    "

                    {...form.register(
                        "category"
                    )}

                >


                    <option value="partner">

                        Partner

                    </option>


                    <option value="client">

                        Client

                    </option>


                </select>


            </div>









            <div>

                <Label>
                    Urutan
                </Label>


                <Input

                    type="number"

                    {...form.register(
                        "order_number"
                    )}

                />


            </div>









            <div
                className="
                flex
                items-center
                justify-between
                rounded-lg
                border
                p-4
                "
            >


                <Label>
                    Status Aktif
                </Label>



                <Switch

                    checked={
                        form.watch(
                            "is_active"
                        )
                    }


                    onCheckedChange={
                        value =>
                        form.setValue(
                            "is_active",
                            value
                        )
                    }

                />


            </div>








            <Button

                type="submit"

                disabled={
                    loading
                }

            >

                {
                loading &&

                <Loader2
                    className="
                    mr-2
                    h-4
                    w-4
                    animate-spin
                    "
                />

                }


                Simpan Perubahan


            </Button>



        </form>

    );


}