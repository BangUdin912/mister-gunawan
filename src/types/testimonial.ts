export interface Testimonial {
    id: string;

    name: string;

    company: string | null;

    position: string | null;

    photo: string | null;

    message: string | null;

    youtube_url: string | null;

    rating: number;

    featured: boolean;

    is_active: boolean;

    created_at: string;

    updated_at: string;
}

export interface TestimonialPayload {
    name: string;

    company?: string | null;

    position?: string | null;

    photo?: string | null;

    message?: string | null;

    youtube_url?: string | null;

    rating?: number;

    featured?: boolean;

    is_active?: boolean;
}