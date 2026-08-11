"use client";

import Image from "next/image";

import {
    Loader2,
    ImageIcon,
    Trash2,
} from "lucide-react";

import {
    Input,
} from "@/components/ui/input";

import {
    Button,
} from "@/components/ui/button";

import {
    cn,
} from "@/lib/utils";


interface SettingImageUploadProps {

    value?: string | null;

    onChange: (
        value: string
    ) => void;

    onUpload: (
        file: File
    ) => Promise<string | void>;

    label?: string;

    width?: number;

    height?: number;

    disabled?: boolean;

    accept?: string;

    className?: string;

}



export default function SettingImageUpload({
    value,
    onChange,
    onUpload,
    label = "Image",
    width = 120,
    height = 120,
    disabled = false,
    accept = "image/*",
    className,
}: SettingImageUploadProps) {


    const handleChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const file =
            e.target.files?.[0];


        if (!file)
            return;


        try {


            const url =
                await onUpload(
                    file
                );


            if(url)
                onChange(
                    url
                );


        } catch(error) {


            console.error(
                "Upload error:",
                error
            );


        }


    };



    function handleRemove() {

        onChange(
            ""
        );

    }



    return (

        <div
            className={cn(
                "space-y-4",
                className
            )}
        >


            {
                value ? (

                    <div
                        className="
                            relative
                            w-fit
                        "
                    >

                        <Image

                            src={
                                value
                            }

                            alt={
                                label
                            }

                            width={
                                width
                            }

                            height={
                                height
                            }

                            className="
                                rounded-md
                                border
                                object-contain
                            "

                            unoptimized

                        />


                        <Button

                            type="button"

                            size="icon"

                            variant="destructive"

                            className="
                                absolute
                                -right-2
                                -top-2
                                h-7
                                w-7
                            "

                            onClick={
                                handleRemove
                            }

                        >

                            <Trash2
                                className="
                                    h-4
                                    w-4
                                "
                            />

                        </Button>


                    </div>


                ) : (


                    <div

                        className="
                            flex
                            items-center
                            justify-center
                            rounded-md
                            border
                            border-dashed
                        "

                        style={{
                            width,
                            height,
                        }}

                    >

                        <ImageIcon
                            className="
                                h-8
                                w-8
                                text-muted-foreground
                            "
                        />


                    </div>


                )
            }




            <Input

                type="file"

                accept={accept}

                disabled={
                    disabled
                }

                onChange={
                    handleChange
                }

            />


            {
                disabled && (

                    <div
                        className="
                            flex
                            items-center
                            gap-2
                            text-sm
                            text-muted-foreground
                        "
                    >

                        <Loader2

                            className="
                                h-4
                                w-4
                                animate-spin
                            "

                        />

                        Uploading...

                    </div>

                )
            }


        </div>

    );

}