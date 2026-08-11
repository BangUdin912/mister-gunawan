"use client";

import {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    Loader2,
    Search,
    MessageSquare,
} from "lucide-react";

import {
    toast,
} from "sonner";

import {
    supabase,
} from "@/lib/supabase/client";

import {
    messageService,
} from "@/lib/messageService";

import type {
    Message,
} from "@/types/message";


import MessageTable from "./components/MessageTable";


import {
    Input,
} from "@/components/ui/input";


import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";





export default function MessagesPage(){



    const [
        messages,
        setMessages
    ] =
    useState<Message[]>([]);




    const [
        loading,
        setLoading
    ] =
    useState(true);





    const [
        deleting,
        setDeleting
    ] =
    useState(false);





    const [
        search,
        setSearch
    ] =
    useState("");







    async function loadMessages(){


        try{


            setLoading(true);



            const data =
                await messageService.getAll();



            setMessages(data);



        }
        catch(error){


            console.error(
                error
            );


            toast.error(
                "Gagal memuat pesan."
            );


        }
        finally{


            setLoading(false);


        }


    }







    useEffect(()=>{


        loadMessages();





        const channel =
            supabase

            .channel(
                "messages-realtime"
            )

            .on(

                "postgres_changes",

                {
                    event:"INSERT",

                    schema:"public",

                    table:"messages",
                },


                (payload)=>{


                    const newMessage =
                        payload.new as Message;



                    setMessages(
                        prev => [
                            newMessage,
                            ...prev,
                        ]
                    );



                    toast.success(
                        "Pesan baru masuk",
                        {
                            description:
                            `${newMessage.name} mengirim pesan.`,
                        }
                    );


                }

            )



            .on(

                "postgres_changes",

                {
                    event:"UPDATE",

                    schema:"public",

                    table:"messages",
                },


                (payload)=>{


                    const updated =
                        payload.new as Message;



                    setMessages(
                        prev =>
                        prev.map(
                            item =>
                            item.id === updated.id
                            ?
                            updated
                            :
                            item
                        )
                    );


                }

            )




            .on(

                "postgres_changes",

                {
                    event:"DELETE",

                    schema:"public",

                    table:"messages",
                },


                (payload)=>{


                    const deleted =
                        payload.old as Message;



                    setMessages(
                        prev =>
                        prev.filter(
                            item =>
                            item.id !== deleted.id
                        )
                    );


                }

            )



            .subscribe();







        return ()=>{


            supabase.removeChannel(
                channel
            );


        };



    },[]);









    async function handleDelete(
        message:Message
    ){


        try{


            setDeleting(true);



            await messageService.delete(
                message.id
            );



            toast.success(
                "Pesan berhasil dihapus."
            );



        }
        catch(error){


            console.error(
                error
            );


            toast.error(
                "Gagal menghapus pesan."
            );


        }
        finally{


            setDeleting(false);


        }


    }









    const filteredMessages =
        useMemo(()=>{


            const keyword =
                search
                .toLowerCase()
                .trim();




            if(!keyword)
                return messages;





            return messages.filter(
                item =>


                    item.name
                    ?.toLowerCase()
                    .includes(keyword)


                    ||


                    item.email
                    ?.toLowerCase()
                    .includes(keyword)


                    ||


                    item.phone
                    ?.toLowerCase()
                    .includes(keyword)


                    ||


                    item.company
                    ?.toLowerCase()
                    .includes(keyword)


                    ||


                    item.subject
                    ?.toLowerCase()
                    .includes(keyword)


            );



        },[
            messages,
            search
        ]);









    return (


        <div
            className="
                space-y-6
            "
        >



            <div
                className="
                    flex
                    items-center
                    gap-3
                "
            >


                <div
                    className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-xl
                        bg-blue-100
                    "
                >

                    <MessageSquare
                        className="
                            h-6
                            w-6
                            text-blue-600
                        "
                    />

                </div>




                <div>


                    <h1
                        className="
                            text-3xl
                            font-bold
                        "
                    >

                        Pesan Masuk


                    </h1>



                    <p
                        className="
                            text-muted-foreground
                        "
                    >

                        Kelola pesan customer secara realtime.


                    </p>


                </div>


            </div>









            <Card>


                <CardHeader>


                    <CardTitle>

                        Daftar Pesan

                    </CardTitle>


                </CardHeader>





                <CardContent
                    className="
                        space-y-4
                    "
                >



                    <div
                        className="
                            relative
                        "
                    >


                        <Search

                            className="
                                absolute
                                left-3
                                top-1/2
                                h-4
                                w-4
                                -translate-y-1/2
                                text-muted-foreground
                            "

                        />



                        <Input

                            placeholder="
Cari nama, email, WhatsApp, perusahaan..."

                            className="
                                pl-9
                            "

                            value={
                                search
                            }

                            onChange={
                                e =>
                                setSearch(
                                    e.target.value
                                )
                            }

                        />


                    </div>








                    {
                        loading

                        ?

                        (

                            <div
                                className="
                                    flex
                                    h-64
                                    items-center
                                    justify-center
                                "
                            >

                                <Loader2
                                    className="
                                        h-8
                                        w-8
                                        animate-spin
                                    "
                                />


                            </div>


                        )

                        :


                        (

                            <MessageTable

                                messages={
                                    filteredMessages
                                }


                                onDelete={
                                    deleting
                                    ?
                                    undefined
                                    :
                                    handleDelete
                                }

                            />

                        )

                    }



                </CardContent>



            </Card>



        </div>


    );


}