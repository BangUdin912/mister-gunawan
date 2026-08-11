"use client";

import Image from "next/image";

import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import {
    Pencil,
    Trash2,
    ImageOff,
    GripVertical,
} from "lucide-react";

import type { Partner } from "@/types/partner";

import {
    getPartnerLogoUrl,
} from "@/lib/storage";


interface PartnerCardProps {

    partner: Partner;

    onEdit: (
        partner: Partner
    ) => void;

    onDelete: (
        partner: Partner
    ) => void;

}



export default function PartnerCard({

    partner,

    onEdit,

    onDelete,

}: PartnerCardProps) {



    const logoUrl =
        getPartnerLogoUrl(
            partner.logo,
            partner.category
        );



    return (

        <Card className="
            overflow-hidden
            transition-all
            duration-200
            hover:-translate-y-1
            hover:shadow-lg
        ">


            <CardContent className="p-0">


                {/* Logo */}

                <div className="
                    relative
                    aspect-[4/3]
                    overflow-hidden
                    rounded-t-lg
                    bg-muted
                ">


                    {
                    logoUrl

                    ?

                    (

                        <Image

                            src={logoUrl}

                            alt={
                                partner.name
                                ||
                                "Partner"
                            }

                            fill

                            sizes="
                            (max-width:768px)
                            100vw,
                            300px
                            "

                            className="
                                object-contain
                                p-6
                                transition-transform
                                duration-300
                                hover:scale-105
                            "

                        />

                    )

                    :

                    (

                        <div className="
                            flex
                            h-full
                            w-full
                            flex-col
                            items-center
                            justify-center
                            gap-2
                            text-muted-foreground
                        ">


                            <ImageOff
                                className="
                                h-10
                                w-10
                                "
                            />


                            <span className="text-xs">

                                Belum ada logo

                            </span>


                        </div>

                    )

                    }


                </div>





                {/* Information */}

                <div className="
                    space-y-4
                    p-4
                ">


                    <div>


                        <h3

                            className="
                                line-clamp-1
                                text-base
                                font-semibold
                            "

                            title={
                                partner.name
                            }

                        >

                            {
                                partner.name
                                ||
                                "Tanpa Nama"
                            }

                        </h3>



                        <p className="
                            mt-1
                            text-xs
                            text-muted-foreground
                        ">


                            {
                            partner.category === "partner"

                            ?

                            "Partner Bisnis"

                            :

                            "Klien HSS"

                            }


                        </p>


                    </div>





                    <div className="
                        flex
                        items-center
                        justify-between
                    ">



                        <Badge

                            variant={
                                partner.is_active
                                ?
                                "default"
                                :
                                "secondary"
                            }

                        >

                            {
                            partner.is_active

                            ?

                            "Aktif"

                            :

                            "Nonaktif"

                            }


                        </Badge>





                        <div className="
                            flex
                            items-center
                            gap-1
                            text-xs
                            text-muted-foreground
                        ">


                            <GripVertical
                                className="
                                h-3.5
                                w-3.5
                                "
                            />


                            #
                            {
                                partner.order_number
                                ??
                                0
                            }


                        </div>


                    </div>


                </div>


            </CardContent>







            {/* Action */}

            <CardFooter className="
                grid
                grid-cols-2
                gap-2
                border-t
                bg-muted/20
                p-3
            ">



                <Button

                    type="button"

                    variant="outline"

                    onClick={() =>
                        onEdit(partner)
                    }

                >

                    <Pencil
                        className="
                        mr-2
                        h-4
                        w-4
                        "
                    />

                    Edit

                </Button>





                <Button

                    type="button"

                    variant="destructive"

                    onClick={() =>
                        onDelete(partner)
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



            </CardFooter>



        </Card>

    );

}