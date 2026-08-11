"use client";

import {
    useMemo,
    useState,
} from "react";

import {
    useRouter,
} from "next/navigation";

import Image from "next/image";
import Link from "next/link";

import {
    getPartnerLogoUrl,
} from "@/lib/storage";


import type {
    Partner,
} from "@/types/partner";


import {
    Button,
} from "@/components/ui/button";


import {
    Badge,
} from "@/components/ui/badge";


import {
    Input,
} from "@/components/ui/input";


import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";


import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";


import {
    Building2,
    Eye,
    EyeOff,
    Globe,
    MoreHorizontal,
    Pencil,
    Plus,
    Search,
    Trash2,
} from "lucide-react";




interface PartnerTableProps {

    partners: Partner[];

    onDelete?: (
        partner: Partner
    ) => void;


    onToggleStatus?: (
        partner: Partner
    ) => void;

}





export default function PartnerTable({

    partners,

    onDelete,

    onToggleStatus,

}: PartnerTableProps) {



    const router =
        useRouter();



    const [
        search,
        setSearch
    ] = useState("");



    const [
        category,
        setCategory
    ] =
    useState<
        "all" | "partner" | "client"
    >(
        "all"
    );






    const filteredPartners =
        useMemo(()=>{


            return [

                ...partners

            ]

            .sort(
                (a,b)=>
                    (
                        a.order_number ?? 0
                    )
                    -
                    (
                        b.order_number ?? 0
                    )
            )


            .filter(
                item=>{


                    const keyword =
                        search
                        .toLowerCase()
                        .trim();



                    const matchName =
                        item.name
                        .toLowerCase()
                        .includes(
                            keyword
                        );



                    const matchCategory =
                        category === "all"
                        ||
                        item.category === category;



                    return (
                        matchName
                        &&
                        matchCategory
                    );


                }
            );


        },[
            partners,
            search,
            category
        ]);






    function getLogo(
        partner:Partner
    ){

        return getPartnerLogoUrl(
            partner.logo,
            partner.category
        );

    }







    function categoryBadge(
        value:Partner["category"]
    ){

        return value === "partner"

        ?

        (
            <Badge
                className="
                    bg-blue-600
                    hover:bg-blue-600
                "
            >
                Partner
            </Badge>
        )

        :

        (
            <Badge
                className="
                    bg-emerald-600
                    hover:bg-emerald-600
                "
            >
                Klien
            </Badge>
        );


    }







    function statusBadge(
        active:boolean
    ){

        return active

        ?

        (
            <Badge
                className="
                    bg-emerald-600
                    hover:bg-emerald-600
                "
            >
                Aktif
            </Badge>
        )

        :

        (
            <Badge
                variant="destructive"
            >
                Nonaktif
            </Badge>
        );

    }








    return (

    <div className="space-y-6">





        {/* HEADER */}

        <div className="
            flex
            flex-col
            gap-4
            md:flex-row
            md:items-center
            md:justify-between
        ">


            <div>

                <h2 className="
                    text-2xl
                    font-bold
                ">
                    Partner & Klien
                </h2>


                <p className="
                    text-sm
                    text-muted-foreground
                ">
                    Kelola data partner dan klien HSS.
                </p>

            </div>




            <Button asChild>

                <Link href="/admin/partner/create">

                    <Plus className="
                        mr-2
                        h-4
                        w-4
                    "/>

                    Tambah Data

                </Link>

            </Button>



        </div>







        {/* FILTER */}


        <div className="
            grid
            gap-4
            md:grid-cols-3
        ">



            <div className="
                relative
                md:col-span-2
            ">


                <Search className="
                    absolute
                    left-3
                    top-3
                    h-4
                    w-4
                    text-muted-foreground
                "/>



                <Input

                    placeholder="
                        Cari perusahaan...
                    "

                    value={search}

                    onChange={
                        e=>
                        setSearch(
                            e.target.value
                        )
                    }

                    className="
                        pl-10
                    "

                />


            </div>





            <Select

                value={category}

                onValueChange={
                    value=>
                    setCategory(
                        value as any
                    )
                }

            >

                <SelectTrigger>

                    <SelectValue/>

                </SelectTrigger>


                <SelectContent>

                    <SelectItem value="all">
                        Semua
                    </SelectItem>


                    <SelectItem value="partner">
                        Partner
                    </SelectItem>


                    <SelectItem value="client">
                        Klien
                    </SelectItem>


                </SelectContent>


            </Select>



        </div>









        {/* TABLE */}


        <div className="
            overflow-hidden
            rounded-xl
            border
            bg-background
        ">


        <Table>


        <TableHeader>


        <TableRow>


            <TableHead>
                Logo
            </TableHead>


            <TableHead>
                Perusahaan
            </TableHead>


            <TableHead>
                Kategori
            </TableHead>


            <TableHead>
                Status
            </TableHead>


            <TableHead className="
                text-right
            ">
                Aksi
            </TableHead>


        </TableRow>


        </TableHeader>





        <TableBody>


        {
        filteredPartners.length === 0

        ?

        (

        <TableRow>

            <TableCell
                colSpan={5}
                className="
                    h-60
                    text-center
                "
            >

                Belum ada data partner.

            </TableCell>

        </TableRow>

        )

        :

        filteredPartners.map(
            partner=>{


                const logo =
                    getLogo(
                        partner
                    );



                return (

                <TableRow
                    key={partner.id}
                >



                    <TableCell>


                    <div className="
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        overflow-hidden
                        rounded-lg
                        border
                        bg-white
                    ">


                    {
                    logo

                    ?

                    <Image
    src={logo}
    alt={partner.name || "Partner Logo"}
    width={56}
    height={56}
    className="
        object-contain
    "
    loading="lazy"
    unoptimized
/>

                    :

                    <Building2
                        className="
                            h-6
                            w-6
                            text-muted-foreground
                        "
                    />

                    }


                    </div>


                    </TableCell>





                    <TableCell>


                        <p className="
                            font-medium
                        ">
                            {partner.name}
                        </p>



                        {
                        partner.website &&

                        <Link

                            href={
                                partner.website.startsWith("http")
                                ?
                                partner.website
                                :
                                `https://${partner.website}`
                            }

                            target="_blank"

                            className="
                                mt-1
                                flex
                                items-center
                                gap-1
                                text-xs
                                text-blue-600
                                hover:underline
                            "

                        >

                            <Globe
                                className="
                                    h-3
                                    w-3
                                "
                            />

                            Website

                        </Link>

                        }


                    </TableCell>





                    <TableCell>

                        {categoryBadge(
                            partner.category
                        )}

                    </TableCell>





                    <TableCell>

                        {statusBadge(
                            partner.is_active
                        )}

                    </TableCell>







                    <TableCell className="
                        text-right
                    ">



                    <DropdownMenu>


                    <DropdownMenuTrigger
                        className="
                            inline-flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-md
                            hover:bg-accent
                        "
                    >

                        <MoreHorizontal
                            className="
                                h-4
                                w-4
                            "
                        />

                    </DropdownMenuTrigger>





                    <DropdownMenuContent
                        align="end"
                    >



                    <DropdownMenuItem

                        onClick={()=>
                            router.push(
                                `/admin/partner/edit/${partner.id}`
                            )
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

                    </DropdownMenuItem>





                    <DropdownMenuItem

                        onClick={()=>
                            onToggleStatus?.(
                                partner
                            )
                        }

                    >

                    {
                    partner.is_active

                    ?

                    <>

                    <EyeOff
                        className="
                            mr-2
                            h-4
                            w-4
                        "
                    />

                    Nonaktifkan

                    </>

                    :

                    <>

                    <Eye
                        className="
                            mr-2
                            h-4
                            w-4
                        "
                    />

                    Aktifkan

                    </>

                    }


                    </DropdownMenuItem>





                    <DropdownMenuSeparator/>





                    <DropdownMenuItem

                        className="
                            text-destructive
                        "

                        onClick={()=>
                            onDelete?.(
                                partner
                            )
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


                    </DropdownMenuItem>



                    </DropdownMenuContent>


                    </DropdownMenu>



                    </TableCell>



                </TableRow>

                );


            }
        )
        }



        </TableBody>


        </Table>


        </div>


    </div>

    );

}