export function getTestimonialPhotoUrl(
    photo?: string | null
): string {

    if (!photo)
        return "/images/avatar-placeholder.png";

    if (
        photo.startsWith("http")
    ) {
        return photo;
    }

    const supabaseUrl =
        process.env
            .NEXT_PUBLIC_SUPABASE_URL;

    return `${supabaseUrl}/storage/v1/object/public/testimonials/${photo}`;

}