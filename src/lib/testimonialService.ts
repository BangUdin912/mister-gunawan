import { supabase } from "@/lib/supabase/client";

import type {
    Testimonial,
    TestimonialPayload,
} from "@/types/testimonial";

export const testimonialService = {

    /**
     * Ambil semua testimonial
     */
    async getAll(): Promise<Testimonial[]> {

        const {
            data,
            error,
        } = await supabase
            .from("testimonials")
            .select("*")
            .order("featured", {
                ascending: false,
            })
            .order("created_at", {
                ascending: false,
            });

        if (error)
            throw error;

        return (data ?? []) as Testimonial[];

    },



    /**
     * Ambil testimonial aktif
     */
    async getActive(): Promise<Testimonial[]> {

        const {
            data,
            error,
        } = await supabase
            .from("testimonials")
            .select("*")
            .eq("is_active", true)
            .order("featured", {
                ascending: false,
            })
            .order("created_at", {
                ascending: false,
            });

        if (error)
            throw error;

        return (data ?? []) as Testimonial[];

    },



    /**
     * Ambil testimonial unggulan
     */
    async getFeatured(): Promise<Testimonial[]> {

        const {
            data,
            error,
        } = await supabase
            .from("testimonials")
            .select("*")
            .eq("featured", true)
            .eq("is_active", true)
            .order("created_at", {
                ascending: false,
            });

        if (error)
            throw error;

        return (data ?? []) as Testimonial[];

    },



    /**
     * Ambil detail testimonial
     */
    async getById(
        id: string
    ): Promise<Testimonial> {

        const {
            data,
            error,
        } = await supabase
            .from("testimonials")
            .select("*")
            .eq("id", id)
            .single();

        if (error)
            throw error;

        return data as Testimonial;

    },



    /**
     * Tambah testimonial
     */
    async create(
        payload: TestimonialPayload
    ): Promise<Testimonial> {

        const {
            data,
            error,
        } = await supabase
            .from("testimonials")
            .insert({
                name: payload.name,
                company: payload.company ?? null,
                position: payload.position ?? null,
                photo: payload.photo ?? null,
                message: payload.message ?? null,
                youtube_url: payload.youtube_url ?? null,
                rating: payload.rating ?? 5,
                featured: payload.featured ?? false,
                is_active: payload.is_active ?? true,
            })
            .select()
            .single();

        if (error)
            throw error;

        return data as Testimonial;

    },



    /**
     * Update testimonial
     */
    async update(
        id: string,
        payload: Partial<TestimonialPayload>
    ): Promise<Testimonial> {

        const {
            data,
            error,
        } = await supabase
            .from("testimonials")
            .update({
                ...payload,
                updated_at: new Date().toISOString(),
            })
            .eq("id", id)
            .select()
            .single();

        if (error)
            throw error;

        return data as Testimonial;

    },



    /**
     * Toggle testimonial unggulan
     */
    async toggleFeatured(
        id: string,
        featured: boolean
    ): Promise<void> {

        const {
            error,
        } = await supabase
            .from("testimonials")
            .update({
                featured,
                updated_at: new Date().toISOString(),
            })
            .eq("id", id);

        if (error)
            throw error;

    },



    /**
     * Toggle status aktif
     */
    async toggleActive(
        id: string,
        isActive: boolean
    ): Promise<void> {

        const {
            error,
        } = await supabase
            .from("testimonials")
            .update({
                is_active: isActive,
                updated_at: new Date().toISOString(),
            })
            .eq("id", id);

        if (error)
            throw error;

    },



    /**
     * Hapus testimonial
     */
    async delete(
        id: string
    ): Promise<void> {

        const {
            error,
        } = await supabase
            .from("testimonials")
            .delete()
            .eq("id", id);

        if (error)
            throw error;

    },



    /**
     * Total testimonial
     */
    async count(): Promise<number> {

        const {
            count,
            error,
        } = await supabase
            .from("testimonials")
            .select("*", {
                count: "exact",
                head: true,
            });

        if (error)
            throw error;

        return count ?? 0;

    },



    /**
     * Total testimonial aktif
     */
    async countActive(): Promise<number> {

        const {
            count,
            error,
        } = await supabase
            .from("testimonials")
            .select("*", {
                count: "exact",
                head: true,
            })
            .eq("is_active", true);

        if (error)
            throw error;

        return count ?? 0;

    },



    /**
     * Total testimonial unggulan
     */
    async countFeatured(): Promise<number> {

        const {
            count,
            error,
        } = await supabase
            .from("testimonials")
            .select("*", {
                count: "exact",
                head: true,
            })
            .eq("featured", true);

        if (error)
            throw error;

        return count ?? 0;

    },

};