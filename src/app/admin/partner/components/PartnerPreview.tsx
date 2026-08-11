"use client";

import Image from "next/image";
import { ImageIcon } from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import {
    getPartnerLogoUrl,
} from "@/lib/storage";



interface PartnerPreviewProps {

    name?: string;

    imageUrl?: string | null;

    category?: "partner" | "client";

    isActive?: boolean;

    sortOrder?: number;

}



export default function PartnerPreview({

    name = "",

    imageUrl,

    category = "partner",

    isActive = true,

    sortOrder = 1,

}: PartnerPreviewProps) {



    /**
     * Support:
     * - Supabase path
     * - Supabase public URL
     * - Preview blob URL
     */

    const previewImage =

        imageUrl?.startsWith("blob:")

        ?

        imageUrl

        :

        getPartnerLogoUrl(
            imageUrl,
            category
        );




    return (

        <Card className="
            overflow-hidden
        ">


            <CardHeader className="pb-3">

                <CardTitle className="text-base">

                    Preview

                </CardTitle>


            </CardHeader>





            <CardContent className="
                space-y-4
            ">



                {/* Logo Preview */}

                <div className="
                    flex
                    aspect-[4/3]
                    items-center
                    justify-center
                    rounded-lg
                    border
                    bg-muted/30
                    p-6
                ">


                {
                previewImage

                ?

                (

                    <div className="
                        relative
                        h-full
                        w-full
                    ">


                        <Image

                            src={previewImage}

                            alt={
                                name
                                ||
                                "Partner"
                            }

                            fill

                            sizes="300px"

                            className="
                                object-contain
                            "

                            unoptimized={
                                previewImage.startsWith(
                                    "blob:"
                                )
                            }

                        />


                    </div>

                )

                :

                (

                    <div className="
                        flex
                        flex-col
                        items-center
                        gap-2
                        text-muted-foreground
                    ">


                        <ImageIcon
                            className="
                                h-10
                                w-10
                            "
                        />


                        <span className="text-sm">

                            Logo partner akan tampil di sini

                        </span>


                    </div>

                )

                }


                </div>







                {/* Information */}

                <div className="
                    space-y-3
                    rounded-lg
                    border
                    p-4
                ">



                    <div>

                        <p className="
                            text-xs
                            text-muted-foreground
                        ">

                            Nama

                        </p>


                        <h3 className="font-semibold">

                            {
                            name
                            ||
                            "Belum diisi"
                            }

                        </h3>


                    </div>





                    <div className="
                        flex
                        items-center
                        justify-between
                    ">


                        <div>


                            <p className="
                                text-xs
                                text-muted-foreground
                            ">

                                Kategori

                            </p>


                            <Badge
                                variant="outline"
                                className="mt-1"
                            >

                                {
                                category === "partner"

                                ?

                                "Partner Bisnis"

                                :

                                "Klien HSS"

                                }

                            </Badge>


                        </div>







                        <div>


                            <p className="
                                text-xs
                                text-muted-foreground
                            ">

                                Status

                            </p>



                            <Badge

                                variant={
                                    isActive
                                    ?
                                    "default"
                                    :
                                    "secondary"
                                }

                                className="mt-1"

                            >

                                {
                                isActive
                                ?
                                "Aktif"
                                :
                                "Nonaktif"
                                }

                            </Badge>



                        </div>






                        <div className="text-right">


                            <p className="
                                text-xs
                                text-muted-foreground
                            ">

                                Urutan

                            </p>


                            <p className="font-semibold">

                                #{sortOrder}

                            </p>


                        </div>



                    </div>



                </div>





                <p className="
                    text-xs
                    text-muted-foreground
                ">

                    Preview tampilan partner sebelum data disimpan.

                </p>



            </CardContent>


        </Card>

    );

}