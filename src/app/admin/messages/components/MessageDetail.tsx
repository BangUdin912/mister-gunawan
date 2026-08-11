"use client";

import { 
    useRouter 
} from "next/navigation";

import {
    Building2,
    Calendar,
    Clock,
    Mail,
    MessageSquare,
    Phone,
    Trash2,
    Users,
} from "lucide-react";


import type {
    Message,
    MessageStatus,
} from "@/types/message";


import MessageReply from "@/app/admin/messages/components/MessageReply";


import {
    Badge,
} from "@/components/ui/badge";


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
    Label,
} from "@/components/ui/label";


import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";



interface MessageDetailProps {

    message: Message;

    loading?: boolean;

    onStatusChange?: (
        status: MessageStatus
    ) => void;

    onDelete?: () => void;

}




function getStatusVariant(
    status?: MessageStatus
) {

    switch(
        status?.toLowerCase()
    ) {

        case "new":
            return "default";


        case "read":
            return "secondary";


        case "replied":
            return "outline";


        case "archived":
            return "destructive";


        default:
            return "secondary";

    }

}





function formatDate(
    value?: string | null
) {

    if(!value)
        return "-";


    return new Date(
        value
    ).toLocaleDateString(
        "id-ID",
        {
            day:
                "2-digit",
            month:
                "long",
            year:
                "numeric",
        }
    );

}




function formatDateTime(
    value?: string | null
) {

    if(!value)
        return "-";


    return new Date(
        value
    ).toLocaleString(
        "id-ID",
        {
            dateStyle:
                "full",
            timeStyle:
                "short",
        }
    );

}







export default function MessageDetail({

    message,

    loading = false,

    onStatusChange,

    onDelete,

}: MessageDetailProps) {


    const router =
        useRouter();




    return (

        <Card>


            <CardHeader>


                <div className="flex items-center justify-between">


                    <CardTitle>
                        Detail Pesan
                    </CardTitle>



                    <Badge

                        variant={
                            getStatusVariant(
                                message.status
                            )
                        }

                    >

                        {message.status}


                    </Badge>


                </div>


            </CardHeader>





            <CardContent className="space-y-6">





                <InfoSection

                    label="Nama"

                    value={
                        message.name
                    }

                />







                <div className="grid gap-5 md:grid-cols-2">


                    <InfoItem

                        icon={
                            <Mail />
                        }

                        label="Email"

                        value={
                            message.email
                        }

                    />



                    <InfoItem

                        icon={
                            <Phone />
                        }

                        label="WhatsApp"

                        value={
                            message.phone
                        }

                    />


                </div>







                <div className="grid gap-5 md:grid-cols-2">


                    <InfoItem

                        icon={
                            <Building2 />
                        }

                        label="Perusahaan"

                        value={
                            message.company
                        }

                    />



                    <InfoItem

                        icon={
                            <Users />
                        }

                        label="Jumlah Peserta"

                        value={
                            message.participant_count
                                ?
                                `${message.participant_count} Orang`
                                :
                                "-"
                        }

                    />


                </div>







                <div className="grid gap-5 md:grid-cols-2">


                    <InfoItem

                        icon={
                            <Calendar />
                        }

                        label="Tanggal Kegiatan"

                        value={
                            formatDate(
                                message.event_date
                            )
                        }

                    />




                    <InfoItem

                        icon={
                            <Clock />
                        }

                        label="Waktu Kegiatan"

                        value={
                            message.event_time
                        }

                    />


                </div>









                <InfoSection

                    label="Subjek"

                    value={
                        message.subject
                    }

                />








                <div>


                    <Label>
                        Isi Pesan
                    </Label>



                    <div className="
                        mt-2
                        min-h-[180px]
                        rounded-md
                        border
                        p-4
                        whitespace-pre-wrap
                    ">


                        <div className="
                            flex
                            items-center
                            gap-2
                            mb-3
                        ">


                            <MessageSquare

                                className="
                                    h-4
                                    w-4
                                    text-muted-foreground
                                "

                            />


                            <span className="text-sm font-medium">

                                Pesan

                            </span>


                        </div>



                        {
                            message.message ||
                            "-"
                        }


                    </div>


                </div>









                <div>


                    <Label>
                        Status
                    </Label>



                    <Select

                        disabled={
                            loading
                        }

                        value={
                            message.status
                        }


                        onValueChange={(
                            value
                        ) =>

                            onStatusChange?.(
                                value as MessageStatus
                            )

                        }

                    >


                        <SelectTrigger className="mt-2">

                            <SelectValue />

                        </SelectTrigger>



                        <SelectContent>


                            <SelectItem value="New">
                                New
                            </SelectItem>


                            <SelectItem value="Read">
                                Read
                            </SelectItem>


                            <SelectItem value="Replied">
                                Replied
                            </SelectItem>


                            <SelectItem value="Archived">
                                Archived
                            </SelectItem>


                        </SelectContent>


                    </Select>


                </div>









                <div>


                    <Label>
                        Tanggal Masuk
                    </Label>



                    <div className="
                        mt-2
                        flex
                        items-center
                        gap-2
                        rounded-md
                        border
                        p-3
                    ">


                        <Calendar

                            className="
                                h-4
                                w-4
                                text-muted-foreground
                            "

                        />


                        {
                            formatDateTime(
                                message.created_at
                            )
                        }


                    </div>


                </div>









                <div className="
                    flex
                    flex-wrap
                    justify-end
                    gap-3
                    border-t
                    pt-6
                ">




                    <MessageReply


                        name={
                            message.name
                        }


                        email={
                            message.email
                        }


                        phone={
                            message.phone
                        }


                        subject={
                            message.subject
                        }


                        message={
                            message.message
                        }


                        company={
                            message.company
                        }


                        participant_count={
                            message.participant_count
                        }


                        event_date={
                            message.event_date
                        }


                        event_time={
                            message.event_time
                        }


                    />






                    {
                        onDelete && (


                            <Button

                                variant="destructive"

                                disabled={
                                    loading
                                }

                                onClick={
                                    onDelete
                                }

                            >


                                <Trash2
                                    className="mr-2 h-4 w-4"
                                />


                                Hapus


                            </Button>


                        )
                    }







                    <Button

                        variant="secondary"

                        onClick={() =>
                            router.push(
                                "/admin/messages"
                            )
                        }

                    >

                        Kembali


                    </Button>



                </div>





            </CardContent>


        </Card>

    );

}









function InfoSection({

    label,

    value,

}: {

    label:string;

    value?:string | null;

}) {


    return (

        <div>


            <Label>
                {label}
            </Label>



            <div className="
                mt-2
                rounded-md
                border
                p-3
            ">

                {
                    value ||
                    "-"
                }


            </div>


        </div>

    );

}








function InfoItem({

    icon,

    label,

    value,

}: {

    icon:React.ReactNode;

    label:string;

    value?:string | number | null;

}) {


    return (

        <div>


            <Label>
                {label}
            </Label>



            <div className="
                mt-2
                flex
                items-center
                gap-2
                rounded-md
                border
                p-3
            ">


                <span className="
                    text-muted-foreground
                ">

                    {icon}

                </span>



                {
                    value ||
                    "-"
                }


            </div>


        </div>

    );

}