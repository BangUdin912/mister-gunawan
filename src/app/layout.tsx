import type {
    Viewport,
} from "next";

import {
    Inter,
    Poppins,
} from "next/font/google";

import {
    GoogleAnalytics,
} from "@next/third-parties/google";

import "./globals.css";

import LocalBusinessSchema
    from "@/components/seo/LocalBusinessSchema";

import {
    metadata,
    SITE_THEME_COLOR,
} from "@/lib/seo";


const inter = Inter({
    subsets: [
        "latin",
    ],

    variable:
        "--font-inter",

    display:
        "swap",
});


const poppins = Poppins({
    subsets: [
        "latin",
    ],

    variable:
        "--font-poppins",

    weight: [
        "400",
        "500",
        "600",
        "700",
        "800",
    ],

    display:
        "swap",
});


/**
 * Global SEO metadata
 *
 * Semua konfigurasi SEO berada
 * di src/lib/seo.ts
 */
export {
    metadata,
};


export const viewport: Viewport = {

    width:
        "device-width",

    initialScale:
        1,

    themeColor:
        SITE_THEME_COLOR,

    colorScheme:
        "light",
};


export default function RootLayout({
    children,
}: Readonly<{
    children:
        React.ReactNode;
}>) {

    const gaId =
        process.env
            .NEXT_PUBLIC_GA_MEASUREMENT_ID;


    return (

        <html
            lang="id"
            suppressHydrationWarning
            className={`
                ${inter.variable}
                ${poppins.variable}
            `}
        >

            <body
                className="
                    min-h-screen
                    bg-white
                    font-sans
                    text-slate-900
                    antialiased
                "
            >

                <LocalBusinessSchema />

                {children}

                {gaId && (
                    <GoogleAnalytics
                        gaId={gaId}
                    />
                )}

            </body>

        </html>
    );
}