"use client";

import { useRouter } from "next/navigation";

import {
    Eye,
    MoreHorizontal,
    Trash2,
    Mail,
} from "lucide-react";

import type {
    Message,
} from "@/types/message";


import {
    Badge,
} from "@/components/ui/badge";


import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";


import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";



interface MessageTableProps {

    messages: Message[];

    onDelete?: (
        message: Message
    ) => void;

}





function getStatusVariant(
    status: Message["status"]
):
"default"
| "secondary"
| "outline"
| "destructive" {


    switch(status){


        case "New":
            return "default";


        case "Read":
            return "secondary";


        case "Replied":
            return "outline";


        case "Archived":
            return "destructive";


        default:
            return "secondary";

    }

}





function formatDate(
    value?: string | null
){

    if(!value)
        return "-";


    return new Date(
        value
    ).toLocaleDateString(
        "id-ID",
        {
            day:"2-digit",
            month:"short",
            year:"numeric",
        }
    );

}





export default function MessageTable({

    messages,

    onDelete,

}:MessageTableProps){


    const router =
        useRouter();





    return (

        <div
            className="
                rounded-lg
                border
                bg-white
            "
        >


            <Table>


                <TableHeader>


                    <TableRow>


                        <TableHead>
                            Nama
                        </TableHead>


                        <TableHead>
                            Perusahaan
                        </TableHead>


                        <TableHead>
                            Peserta
                        </TableHead>


                        <TableHead>
                            Subjek
                        </TableHead>


                        <TableHead>
                            Jadwal
                        </TableHead>


                        <TableHead>
                            Status
                        </TableHead>


                        <TableHead>
                            Masuk
                        </TableHead>


                        <TableHead
                            className="w-[70px]"
                        >
                            Aksi
                        </TableHead>


                    </TableRow>


                </TableHeader>





                <TableBody>


                    {
                        messages.length === 0 ? (


                            <TableRow>


                                <TableCell

                                    colSpan={8}

                                    className="
                                        h-40
                                        text-center
                                        text-muted-foreground
                                    "

                                >

                                    Belum ada pesan.


                                </TableCell>


                            </TableRow>


                        )

                        :

                        (

                            messages.map(
                                (message)=>(


                                    <TableRow

                                        key={
                                            message.id
                                        }

                                        className={

                                            !message.is_read

                                            ?

                                            "bg-blue-50/50"

                                            :

                                            ""

                                        }

                                    >




                                        <TableCell>


                                            <div
                                                className="
                                                    flex
                                                    items-start
                                                    gap-2
                                                "
                                            >


                                                {
                                                    !message.is_read && (

                                                        <Mail
                                                            className="
                                                                mt-1
                                                                h-4
                                                                w-4
                                                                text-blue-600
                                                            "
                                                        />

                                                    )
                                                }



                                                <div>


                                                    <p
                                                        className="
                                                            font-medium
                                                        "
                                                    >

                                                        {message.name}


                                                    </p>



                                                    {
                                                        message.email && (

                                                            <p
                                                                className="
                                                                    text-xs
                                                                    text-muted-foreground
                                                                "
                                                            >

                                                                {message.email}


                                                            </p>

                                                        )
                                                    }




                                                    {
                                                        message.phone && (

                                                            <p
                                                                className="
                                                                    text-xs
                                                                    text-muted-foreground
                                                                "
                                                            >

                                                                {message.phone}


                                                            </p>

                                                        )
                                                    }


                                                </div>



                                            </div>


                                        </TableCell>







                                        <TableCell>

                                            {
                                                message.company
                                                ||
                                                "-"
                                            }

                                        </TableCell>






                                        <TableCell>

                                            {
                                                message.participant_count

                                                ?

                                                `${message.participant_count} Orang`

                                                :

                                                "-"
                                            }

                                        </TableCell>







                                        <TableCell
                                            className="
                                                max-w-[220px]
                                            "
                                        >

                                            <p
                                                className="
                                                    truncate
                                                "
                                            >

                                                {
                                                    message.subject
                                                    ||
                                                    "-"
                                                }

                                            </p>


                                        </TableCell>








                                        <TableCell>


                                            {
                                                message.event_date

                                                ?

                                                <div
                                                    className="
                                                        text-sm
                                                    "
                                                >


                                                    <p>

                                                        {
                                                            formatDate(
                                                                message.event_date
                                                            )
                                                        }


                                                    </p>



                                                    <p
                                                        className="
                                                            text-xs
                                                            text-muted-foreground
                                                        "
                                                    >

                                                        {
                                                            message.event_time
                                                            ||
                                                            "-"
                                                        }

                                                    </p>


                                                </div>


                                                :

                                                "-"

                                            }


                                        </TableCell>








                                        <TableCell>


                                            <Badge

                                                variant={
                                                    getStatusVariant(
                                                        message.status
                                                    )
                                                }

                                            >

                                                {
                                                    message.status
                                                }


                                            </Badge>


                                        </TableCell>








                                        <TableCell>


                                            {
                                                formatDate(
                                                    message.created_at
                                                )
                                            }


                                        </TableCell>








                                        <TableCell>


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
                                                                `/admin/messages/${message.id}`
                                                            )

                                                        }

                                                    >

                                                        <Eye
                                                            className="
                                                                mr-2
                                                                h-4
                                                                w-4
                                                            "
                                                        />

                                                        Detail


                                                    </DropdownMenuItem>







                                                    {
                                                        onDelete && (


                                                            <DropdownMenuItem


                                                                className="
                                                                    text-destructive
                                                                "


                                                                onClick={()=>


                                                                    onDelete(
                                                                        message
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


                                                        )
                                                    }




                                                </DropdownMenuContent>



                                            </DropdownMenu>



                                        </TableCell>




                                    </TableRow>


                                )
                            )

                        )

                    }


                </TableBody>


            </Table>


        </div>


    );


}