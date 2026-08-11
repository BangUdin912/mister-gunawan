"use client";

import {
    Mail,
    MessageCircle,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";


interface MessageReplyProps {

    name: string;

    email?: string | null;

    phone?: string | null;

    subject?: string | null;

    message?: string | null;

    company?: string | null;

    participant_count?: number | null;

    event_date?: string | null;

    event_time?: string | null;

}





function formatWhatsappNumber(
    value?: string | null
) {

    if (!value)
        return null;


    let number =
        value.replace(
            /\D/g,
            ""
        );


    if (
        number.startsWith("0")
    ) {

        number =
            "62" +
            number.substring(1);

    }


    if (
        number.startsWith("62")
    ) {

        return number;

    }


    return number;

}





function formatDate(
    value?: string | null
) {

    if (!value)
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





export default function MessageReply({

    name,

    email,

    phone,

    subject,

    message,

    company,

    participant_count,

    event_date,

    event_time,

}: MessageReplyProps) {



    const date =
        formatDate(
            event_date
        );





    const replyMessage = `Halo ${name},

Terima kasih telah menghubungi Hartawan Sukses Sejahtera (HSS Training).

Kami sudah menerima permintaan informasi Anda.

Detail konsultasi:

Nama:
${name}

Perusahaan:
${company || "-"}

Jumlah Peserta:
${
    participant_count
        ? `${participant_count} Orang`
        : "-"
}

Tanggal Kegiatan:
${date}

Waktu Kegiatan:
${event_time || "-"}

Subjek:
${subject || "-"}

Pesan:
${message || "-"}


Tim HSS Training akan segera membantu memberikan informasi terbaik terkait kebutuhan training Anda.

Terima kasih.

Hartawan Sukses Sejahtera`;





    const emailUrl =
        email
            ?
            `mailto:${email}?subject=${encodeURIComponent(
                `Re: ${subject || "Pesan HSS Training"}`
            )}&body=${encodeURIComponent(
                replyMessage
            )}`
            :
            null;





    const whatsappNumber =
        formatWhatsappNumber(
            phone
        );





    const whatsappUrl =
        whatsappNumber
            ?
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                replyMessage
            )}`
            :
            null;





    return (

        <div className="flex flex-wrap gap-3">


            <Button

                variant="outline"

                disabled={
                    !email
                }

                onClick={() => {

                    if(!emailUrl)
                        return;


                    window.open(
                        emailUrl,
                        "_blank"
                    );

                }}

            >

                <Mail
                    className="mr-2 h-4 w-4"
                />

                Balas Email

            </Button>







            <Button

                disabled={
                    !whatsappUrl
                }

                onClick={() => {

                    if(!whatsappUrl)
                        return;


                    window.open(

                        whatsappUrl,

                        "_blank",

                        "noopener,noreferrer"

                    );

                }}

            >

                <MessageCircle
                    className="mr-2 h-4 w-4"
                />

                WhatsApp Customer

            </Button>



        </div>

    );

}