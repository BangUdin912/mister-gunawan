import { supabase } from "@/lib/supabase/client";

import type {
    Message,
    MessagePayload,
    MessageStatus,
    MessageUpdatePayload,
} from "@/types/message";



export const messageService = {



    async getAll(): Promise<Message[]> {


        const {
            data,
            error,
        } =
            await supabase
                .from("messages")
                .select("*")
                .order(
                    "created_at",
                    {
                        ascending: false,
                    }
                );


        if (error)
            throw error;


        return (data ?? []) as Message[];

    },






    async getById(
        id: string
    ): Promise<Message> {


        const {
            data,
            error
        } =
            await supabase
                .from("messages")
                .select("*")
                .eq(
                    "id",
                    id
                )
                .single();



        if (error)
            throw error;



        return data as Message;

    },







    async getByStatus(
        status: MessageStatus
    ): Promise<Message[]> {


        const {
            data,
            error
        } =
            await supabase
                .from("messages")
                .select("*")
                .eq(
                    "status",
                    status
                )
                .order(
                    "created_at",
                    {
                        ascending: false,
                    }
                );



        if (error)
            throw error;



        return (data ?? []) as Message[];

    },








    async create(
        payload: MessagePayload
    ): Promise<Message> {



        const {
            data,
            error
        }
        =
        await supabase
            .from("messages")
            .insert({

                name:
                    payload.name,


                email:
                    payload.email ?? null,


                phone:
                    payload.phone ?? null,


                company:
                    payload.company ?? null,


                participant_count:
                    payload.participant_count ?? null,


                event_date:
                    payload.event_date ?? null,


                event_time:
                    payload.event_time ?? null,


                subject:
                    payload.subject ?? null,


                message:
                    payload.message ?? null,


                status:
                    "New",


                is_read:
                    false,


            })
            .select()
            .single();



        if (error)
            throw error;



        return data as Message;


    },









    async update(
        id: string,
        payload: MessageUpdatePayload
    ): Promise<Message> {


        const {
            data,
            error
        }
        =
        await supabase
            .from("messages")
            .update({

                ...payload,


                updated_at:
                    new Date()
                        .toISOString(),

            })
            .eq(
                "id",
                id
            )
            .select()
            .single();



        if (error)
            throw error;



        return data as Message;


    },









    async updateStatus(
        id: string,
        status: MessageStatus
    ): Promise<void> {



        const {
            error
        }
        =
        await supabase
            .from("messages")
            .update({

                status,


                is_read:
                    true,


                updated_at:
                    new Date()
                        .toISOString(),

            })
            .eq(
                "id",
                id
            );



        if (error)
            throw error;


    },









    async markAsRead(
        id: string
    ): Promise<void> {


        const {
            error
        }
        =
        await supabase
            .from("messages")
            .update({

                is_read:
                    true,


                status:
                    "Read",


                updated_at:
                    new Date()
                        .toISOString(),

            })
            .eq(
                "id",
                id
            );



        if (error)
            throw error;


    },









    async delete(
        id: string
    ): Promise<void> {



        const {
            error
        }
        =
        await supabase
            .from("messages")
            .delete()
            .eq(
                "id",
                id
            );



        if (error)
            throw error;


    },









    async count(): Promise<number> {


        const {
            count,
            error
        }
        =
        await supabase
            .from("messages")
            .select(
                "*",
                {
                    count: "exact",
                    head: true,
                }
            );



        if (error)
            throw error;



        return count ?? 0;


    },









    async countByStatus(
        status: MessageStatus
    ): Promise<number> {



        const {
            count,
            error
        }
        =
        await supabase
            .from("messages")
            .select(
                "*",
                {
                    count: "exact",
                    head: true,
                }
            )
            .eq(
                "status",
                status
            );



        if (error)
            throw error;



        return count ?? 0;


    },









    async getUnreadCount(): Promise<number> {



        const {
            count,
            error
        }
        =
        await supabase
            .from("messages")
            .select(
                "*",
                {
                    count: "exact",
                    head: true,
                }
            )
            .eq(
                "is_read",
                false
            );



        if (error)
            throw error;



        return count ?? 0;


    },









    async getLatest(
        limit = 5
    ): Promise<Message[]> {



        const {
            data,
            error
        }
        =
        await supabase
            .from("messages")
            .select("*")
            .order(
                "created_at",
                {
                    ascending:false,
                }
            )
            .limit(
                limit
            );



        if(error)
            throw error;



        return (data ?? []) as Message[];


    },


};