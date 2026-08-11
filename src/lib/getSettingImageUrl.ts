const SUPABASE_URL =
    process.env.NEXT_PUBLIC_SUPABASE_URL;

const BUCKET =
    "settings";

export function getSettingImageUrl(
    path?: string | null
): string | null {

    if (!path)
        return null;

    // Jika sudah berupa URL public
    if (
        path.startsWith("http://") ||
        path.startsWith("https://")
    ) {
        return path;
    }

    if (!SUPABASE_URL)
        return null;

    return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${path}`;
}