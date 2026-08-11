"use client";

import {
    useEffect,
    useRef,
    useState,
} from "react";

import Image from "next/image";

import {
    supabase,
} from "@/lib/supabase/client";

import {
    toast,
} from "sonner";

import {
    Button,
} from "@/components/ui/button";

import {
    Upload,
    ImageIcon,
    Loader2,
    Trash2,
} from "lucide-react";



interface PartnerImageUploadProps {

    value?: string | null;

    category:
        | "partner"
        | "client";

    onChange:
        (value: string) => void;

}



const MAX_FILE_SIZE =
    5 * 1024 * 1024;



const ACCEPTED_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
];



export default function PartnerImageUpload({

    value,

    category,

    onChange,

}: PartnerImageUploadProps) {



    const inputRef =
        useRef<HTMLInputElement>(null);



    const [
        preview,
        setPreview
    ] = useState<string | null>(
        value ?? null
    );



    const [
        uploading,
        setUploading
    ] = useState(false);





    useEffect(() => {

        setPreview(
            value ?? null
        );

    }, [
        value
    ]);





    function getBucket(){

        return category === "partner"
            ? "partners"
            : "clients";

    }





    function validateFile(
        file: File
    ){


        if(
            !ACCEPTED_TYPES.includes(
                file.type
            )
        ){

            toast.error(
                "Format gambar harus PNG, JPG, JPEG atau WEBP"
            );

            return false;

        }



        if(
            file.size >
            MAX_FILE_SIZE
        ){

            toast.error(
                "Ukuran gambar maksimal 5 MB"
            );

            return false;

        }



        return true;

    }







    function getStoragePathFromUrl(
        url:string
    ){

        try {


            const bucket =
                getBucket();



            const marker =
                `/public/${bucket}/`;



            const index =
                url.indexOf(
                    marker
                );



            if(index === -1)
                return null;



            return url.substring(
                index + marker.length
            );



        }
        catch {

            return null;

        }

    }









    async function deleteOldFile(
        url:string
    ){


        const path =
            getStoragePathFromUrl(
                url
            );



        if(!path)
            return;



        const {
            error
        } =
        await supabase.storage
            .from(
                getBucket()
            )
            .remove([
                path
            ]);



        if(error){

            console.warn(
                "Delete storage error",
                error
            );

        }


    }









    async function handleUpload(
        file:File
    ){


        let localPreview:string | null =
            null;



        try {


            setUploading(true);



            const oldValue =
                value;



            localPreview =
                URL.createObjectURL(
                    file
                );



            setPreview(
                localPreview
            );





            const extension =
                file.name
                    .split(".")
                    .pop()
                    ?.toLowerCase()
                    ||
                    "png";



            const fileName =
                `${crypto.randomUUID()}.${extension}`;





            const {
                error
            } =
            await supabase.storage
                .from(
                    getBucket()
                )
                .upload(
                    fileName,
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
                    getBucket()
                )
                .getPublicUrl(
                    fileName
                );



            const publicUrl =
                data.publicUrl;





            if(oldValue){

                await deleteOldFile(
                    oldValue
                );

            }





            if(localPreview){

                URL.revokeObjectURL(
                    localPreview
                );

            }



            setPreview(
                publicUrl
            );



            onChange(
                publicUrl
            );



            toast.success(
                "Logo berhasil diupload"
            );



        }
        catch(error){


            console.error(
                error
            );



            if(localPreview){

                URL.revokeObjectURL(
                    localPreview
                );

            }



            setPreview(
                value ?? null
            );



            toast.error(
                "Gagal mengupload logo"
            );


        }
        finally {


            setUploading(
                false
            );


        }


    }









    async function handleFileChange(
        e:React.ChangeEvent<HTMLInputElement>
    ){


        const file =
            e.target.files?.[0];



        if(!file)
            return;



        if(
            !validateFile(
                file
            )
        ){

            e.target.value =
                "";

            return;

        }



        await handleUpload(
            file
        );



        e.target.value =
            "";

    }











    async function handleRemove(){


        if(value){

            await deleteOldFile(
                value
            );

        }



        setPreview(
            null
        );



        onChange(
            ""
        );



        if(inputRef.current){

            inputRef.current.value =
                "";

        }



        toast.success(
            "Logo berhasil dihapus"
        );


    }









    return (

        <div className="space-y-4">


            <label className="text-sm font-medium">

                Logo Perusahaan

            </label>




            <div className="
                rounded-xl
                border
                border-dashed
                bg-muted/30
                p-6
            ">


                {
                preview ?


                (

                    <div className="
                        flex
                        flex-col
                        items-center
                        gap-4
                    ">


                        <div className="
                            relative
                            h-40
                            w-40
                            overflow-hidden
                            rounded-xl
                            border
                            bg-white
                        ">


                            <Image

                                src={
                                    preview
                                }

                                alt="Logo"

                                fill

                                sizes="160px"

                                className="
                                    object-contain
                                    p-4
                                "

                            />


                        </div>





                        <div className="
                            flex
                            gap-2
                        ">


                            <Button

                                type="button"

                                variant="outline"

                                disabled={
                                    uploading
                                }

                                onClick={() =>
                                    inputRef.current?.click()
                                }

                            >

                                {
                                uploading ?

                                <>

                                    <Loader2
                                        className="
                                            mr-2
                                            h-4
                                            w-4
                                            animate-spin
                                        "
                                    />

                                    Upload...

                                </>

                                :

                                <>

                                    <Upload
                                        className="
                                            mr-2
                                            h-4
                                            w-4
                                        "
                                    />

                                    Ganti Logo

                                </>

                                }


                            </Button>





                            <Button

                                type="button"

                                variant="destructive"

                                disabled={
                                    uploading
                                }

                                onClick={
                                    handleRemove
                                }

                            >

                                <Trash2
                                    className="
                                        mr-2
                                        h-4
                                        w-4
                                    "
                                />

                                Hapus

                            </Button>



                        </div>


                    </div>


                )


                :


                (

                    <button

                        type="button"

                        disabled={
                            uploading
                        }

                        onClick={() =>
                            inputRef.current?.click()
                        }

                        className="
                            flex
                            w-full
                            flex-col
                            items-center
                            gap-4
                            rounded-lg
                            p-10
                            hover:bg-muted
                        "

                    >


                        {
                        uploading ?

                        <Loader2
                            className="
                                h-12
                                w-12
                                animate-spin
                            "
                        />

                        :

                        <ImageIcon
                            className="
                                h-12
                                w-12
                                text-muted-foreground
                            "
                        />

                        }


                        <p className="font-medium">

                            Klik untuk memilih logo

                        </p>


                        <p className="
                            text-sm
                            text-muted-foreground
                        ">

                            JPG, PNG, WEBP maksimal 5 MB

                        </p>


                    </button>

                )

                }



                <input

                    ref={
                        inputRef
                    }

                    hidden

                    type="file"

                    accept={
                        ACCEPTED_TYPES.join(",")
                    }

                    onChange={
                        handleFileChange
                    }

                />


            </div>


        </div>

    );


}