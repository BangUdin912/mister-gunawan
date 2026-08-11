import {
    supabase,
} from "@/lib/supabase/client";



interface DashboardStats {

    training: number;

    portfolio: number;

    partners: number;

    testimonials: number;

    messages: number;

    unreadMessages: number;

}





export const dashboardService = {



    async getStats(): Promise<DashboardStats> {



        const [

            services,

            portfolio,

            partners,

            testimonials,

            messages,

            unreadMessages,

        ] = await Promise.all([



            supabase

                .from("services")

                .select("*", {

                    count: "exact",

                    head: true,

                })

                .eq(

                    "is_active",

                    true

                ),





            supabase

                .from("portfolio")

                .select("*", {

                    count: "exact",

                    head: true,

                }),





            supabase

                .from("partners")

                .select("*", {

                    count: "exact",

                    head: true,

                }),





            supabase

                .from("testimonials")

                .select("*", {

                    count: "exact",

                    head: true,

                }),





            supabase

                .from("messages")

                .select("*", {

                    count: "exact",

                    head: true,

                }),





            supabase

                .from("messages")

                .select("*", {

                    count: "exact",

                    head: true,

                })

                .eq(

                    "is_read",

                    false

                ),



        ]);






        const errors = [

            services.error,

            portfolio.error,

            partners.error,

            testimonials.error,

            messages.error,

            unreadMessages.error,

        ];



        const error =
            errors.find(
                Boolean
            );



        if(error){

            throw error;

        }







        return {



            training:

                services.count ?? 0,



            portfolio:

                portfolio.count ?? 0,



            partners:

                partners.count ?? 0,



            testimonials:

                testimonials.count ?? 0,



            messages:

                messages.count ?? 0,



            unreadMessages:

                unreadMessages.count ?? 0,



        };


    },


};