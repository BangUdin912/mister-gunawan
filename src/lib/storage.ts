const SUPABASE_URL =
    process.env.NEXT_PUBLIC_SUPABASE_URL;



export function getPartnerLogoUrl(
    path: string | null | undefined,
    category: "partner" | "client"
) {

    if (!path)
        return null;



    // Jika environment belum tersedia
    if (!SUPABASE_URL) {

        console.error(
            "NEXT_PUBLIC_SUPABASE_URL belum tersedia"
        );

        return null;

    }



    // Jika sudah berupa URL lengkap
    if (
        path.startsWith("http://")
        ||
        path.startsWith("https://")
    ) {

        return path;

    }



    const bucket =
        category === "partner"
        ? "partners"
        : "clients";



    // Hilangkan slash awal
    const cleanPath =
        path.replace(
            /^\/+/,
            ""
        );



    return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${encodeURI(cleanPath)}`;

}