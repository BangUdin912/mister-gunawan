"use client";

import {
    useEffect,
} from "react";

import {
    toast,
} from "sonner";

import {
    supabase,
} from "@/lib/supabase/client";


import type {
    Message,
} from "@/types/message";



export default function MessageRealtime() {


    useEffect(() => {


        const channel =

            supabase

                .channel(
                    "admin-messages-notification"
                )


                .on(


                    "postgres_changes",


                    {
                        event: "INSERT",

                        schema: "public",

                        table: "messages",
                    },


                    (payload) => {


                        const message =
                            payload.new as Message;




                        toast.success(

                            "Pesan baru masuk",

                            {

                                description:

                                    `${message.name} mengirim pesan baru.`,

                                duration:
                                    5000,

                            }

                        );


                    }


                )


                .subscribe(
                    (status) => {


                        if(
                            status === "SUBSCRIBED"
                        ){

                            console.log(
                                "Message realtime aktif"
                            );

                        }


                    }
                );







        return () => {


            supabase

                .removeChannel(
                    channel
                );


        };


    }, []);





    return null;

}