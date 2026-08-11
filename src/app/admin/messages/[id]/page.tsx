"use client";

import {
    use,
    useEffect,
    useState,
} from "react";


import {
    useRouter,
} from "next/navigation";


import {
    Loader2,
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
    MessageStatus,
} from "@/types/message";


import MessageDetail from "../components/MessageDetail";





interface MessagePageProps {

    params: Promise<{
        id:string;
    }>;

}






export default function MessagePage({

    params,

}:MessagePageProps){



    const {
        id
    } =
    use(params);




    const router =
        useRouter();




    const [
        message,
        setMessage
    ] =
    useState<Message | null>(null);




    const [
        loading,
        setLoading
    ] =
    useState(true);




    const [
        saving,
        setSaving
    ] =
    useState(false);









    async function loadMessage(){


        try{


            setLoading(true);



            const data =
                await messageService.getById(
                    id
                );



            if(!data){


                toast.error(
                    "Pesan tidak ditemukan."
                );


                router.replace(
                    "/admin/messages"
                );


                return;


            }




            setMessage(
                data
            );




            // otomatis tandai sudah dibaca

            if(
                !data.is_read
            ){


                await messageService.update(
                    data.id,
                    {
                        is_read:true,

                        status:
                            data.status === "New"
                            ?
                            "Read"
                            :
                            data.status,
                    }
                );



                setMessage(
                    prev =>

                    prev
                    ?

                    {
                        ...prev,

                        is_read:true,

                        status:
                        prev.status === "New"
                        ?
                        "Read"
                        :
                        prev.status,

                    }

                    :

                    prev

                );


            }




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


        loadMessage();





        const channel =

            supabase

            .channel(
                `message-${id}`
            )

            .on(

                "postgres_changes",

                {
                    event:"UPDATE",

                    schema:"public",

                    table:"messages",

                    filter:
                    `id=eq.${id}`,
                },


                (payload)=>{


                    setMessage(
                        payload.new as Message
                    );


                }

            )


            .subscribe();






        return ()=>{


            supabase.removeChannel(
                channel
            );


        };



    },[id]);









    async function handleStatusChange(

        status:MessageStatus

    ){



        if(!message)
            return;





        try{


            setSaving(true);




            const updated =

                await messageService.update(

                    message.id,

                    {
                        status,

                    }

                );





            setMessage(
                updated
            );




            toast.success(
                "Status berhasil diperbarui."
            );



        }
        catch(error){


            console.error(
                error
            );


            toast.error(
                "Gagal mengubah status."
            );


        }
        finally{


            setSaving(false);


        }


    }









    async function handleDelete(){



        if(!message)
            return;





        try{


            setSaving(true);



            await messageService.delete(

                message.id

            );



            toast.success(
                "Pesan berhasil dihapus."
            );



            router.replace(
                "/admin/messages"
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


            setSaving(false);


        }


    }









    if(loading){


        return (

            <div
                className="
                    flex
                    h-96
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

        );


    }







    if(!message)
        return null;







    return (

        <MessageDetail

            message={
                message
            }


            loading={
                saving
            }


            onStatusChange={
                handleStatusChange
            }


            onDelete={
                handleDelete
            }

        />

    );


}