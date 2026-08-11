import type { Metadata } from "next";

/**
 * =========================================================
 * SITE CONFIGURATION
 * =========================================================
 */

export const SITE_URL =
    "https://www.mistergunawan.com";

export const SITE_NAME =
    "Mister Gunawan";

export const COMPANY_NAME =
    "Hartawan Sukses Sejahtera";

export const SITE_TITLE =
    "Mister Gunawan | Professional Trainer & Public Speaker";

export const SITE_DESCRIPTION =
    "Mister Gunawan adalah Professional Trainer, Public Speaker, Coach, dan Consultant melalui Hartawan Sukses Sejahtera (HSS), menyediakan training leadership, public speaking, service excellence, motivasi, teamwork, dan pengembangan SDM.";

export const SITE_LOCALE =
    "id_ID";

export const SITE_LANGUAGE =
    "id";

export const SITE_THEME_COLOR =
    "#2563EB";

/**
 * =========================================================
 * SEO KEYWORDS
 * =========================================================
 *
 * Catatan:
 * Meta keywords bukan faktor ranking utama Google.
 * Namun konfigurasi tetap disimpan agar SEO website
 * terpusat dan konsisten.
 */

export const SITE_KEYWORDS = [
    "Mister Gunawan",
    "Hartawan Sukses Sejahtera",
    "HSS",
    "professional trainer",
    "professional trainer Indonesia",
    "public speaker Indonesia",
    "trainer Indonesia",
    "public speaking",
    "public speaking training",
    "leadership training",
    "leadership trainer",
    "service excellence training",
    "corporate training",
    "soft skill training",
    "motivation training",
    "teamwork training",
    "human resource development",
    "HR training",
    "coach Indonesia",
    "training perusahaan",
    "training karyawan",
    "training SDM",
] as const;

/**
 * =========================================================
 * SEO IMAGES
 * =========================================================
 */

export const SEO_IMAGES = {
    og: "/images/og-image.jpg",
    logo: "/images/logo.png",
    favicon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    android192: "/android-chrome-192x192.png",
    android512: "/android-chrome-512x512.png",
} as const;

/**
 * =========================================================
 * URL HELPER
 * =========================================================
 */

export function getAbsoluteUrl(
    path = ""
): string {
    if (!path) {
        return SITE_URL;
    }

    if (
        path.startsWith("http://") ||
        path.startsWith("https://")
    ) {
        return path;
    }

    return `${SITE_URL}${
        path.startsWith("/")
            ? path
            : `/${path}`
    }`;
}

/**
 * =========================================================
 * DEFAULT ROBOTS
 * =========================================================
 */

export const SEO_ROBOTS = {
    index: true,
    follow: true,

    googleBot: {
        index: true,
        follow: true,
        noimageindex: false,

        "max-image-preview":
            "large" as const,

        "max-snippet": -1,

        "max-video-preview": -1,
    },
} as const;

/**
 * =========================================================
 * DEFAULT OPEN GRAPH
 * =========================================================
 */

export const SEO_OPEN_GRAPH = {
    type: "website" as const,

    locale: SITE_LOCALE,

    url: SITE_URL,

    siteName: SITE_NAME,

    title: SITE_TITLE,

    description: SITE_DESCRIPTION,

    images: [
        {
            url: getAbsoluteUrl(
                SEO_IMAGES.og
            ),

            width: 1200,

            height: 630,

            alt:
                "Mister Gunawan - Professional Trainer dan Public Speaker",
        },
    ],
} as const;

/**
 * =========================================================
 * DEFAULT TWITTER
 * =========================================================
 */

export const SEO_TWITTER = {
    card:
        "summary_large_image" as const,

    title: SITE_TITLE,

    description:
        SITE_DESCRIPTION,

    images: [
        getAbsoluteUrl(
            SEO_IMAGES.og
        ),
    ],
} as const;

/**
 * =========================================================
 * DEFAULT ICONS
 * =========================================================
 */

export const SEO_ICONS = {
    icon: [
        {
            url:
                SEO_IMAGES.favicon,
        },

        {
            url:
                SEO_IMAGES.android192,

            type:
                "image/png",

            sizes:
                "192x192",
        },

        {
            url:
                SEO_IMAGES.android512,

            type:
                "image/png",

            sizes:
                "512x512",
        },
    ],

    apple: [
        {
            url:
                SEO_IMAGES.apple,

            sizes:
                "180x180",
        },
    ],

    shortcut:
        SEO_IMAGES.favicon,
} as const;

/**
 * =========================================================
 * GLOBAL METADATA
 * =========================================================
 *
 * Dipakai oleh:
 *
 * src/app/layout.tsx
 *
 * Jangan membuat metadata global kedua di layout.tsx.
 */

export const metadata: Metadata = {
    metadataBase:
        new URL(SITE_URL),

    title: {
        default:
            SITE_TITLE,

        template:
            "%s | Mister Gunawan",
    },

    description:
        SITE_DESCRIPTION,

    keywords:
        [...SITE_KEYWORDS],

    authors: [
        {
            name:
                COMPANY_NAME,

            url:
                SITE_URL,
        },
    ],

    creator:
        COMPANY_NAME,

    publisher:
        COMPANY_NAME,

    applicationName:
        SITE_NAME,

    category:
        "Business",

    classification:
        "Business Training and Professional Development",

    alternates: {
        canonical:
            SITE_URL,
    },

    manifest:
        "/site.webmanifest",

    robots:
        SEO_ROBOTS,

    appleWebApp: {
        capable: true,

        title:
            SITE_NAME,

        statusBarStyle:
            "default",
    },

    formatDetection: {
        telephone: false,

        email: false,

        address: false,
    },

    referrer:
        "origin-when-cross-origin",

    other: {
        google:
            "notranslate",
    },
};

/**
 * =========================================================
 * PAGE SEO TYPE
 * =========================================================
 */

export interface PageSEO {
    title: string;

    description: string;

    path: string;

    keywords?: string[];

    image?: string;

    imageAlt?: string;
}

/**
 * =========================================================
 * CREATE PAGE METADATA
 * =========================================================
 */

export function createPageMetadata({
    title,
    description,
    path,
    keywords = [],
    image = SEO_IMAGES.og,
    imageAlt =
        "Mister Gunawan - Hartawan Sukses Sejahtera",
}: PageSEO): Metadata {
    const url =
        getAbsoluteUrl(path);

    const absoluteImage =
        getAbsoluteUrl(image);

    const pageKeywords =
        Array.from(
            new Set([
                ...SITE_KEYWORDS,
                ...keywords,
            ])
        );

    return {
        title,

        description,

        keywords:
            pageKeywords,

        alternates: {
            canonical:
                url,
        },

        robots: {
            index: true,
            follow: true,
        },

        openGraph: {
            type: "website",

            locale:
                SITE_LOCALE,

            url,

            siteName:
                SITE_NAME,

            title:
                `${title} | ${SITE_NAME}`,

            description,

            images: [
                {
                    url:
                        absoluteImage,

                    width: 1200,

                    height: 630,

                    alt:
                        imageAlt,
                },
            ],
        },

        twitter: {
            card:
                "summary_large_image",

            title:
                `${title} | ${SITE_NAME}`,

            description,

            images: [
                absoluteImage,
            ],
        },
    };
}

/**
 * =========================================================
 * HOME SEO
 * =========================================================
 */

export const HOME_SEO: PageSEO = {
    title:
        "Professional Trainer & Public Speaker",

    description:
        "Mister Gunawan adalah Professional Trainer, Public Speaker, Coach, dan Consultant dari Hartawan Sukses Sejahtera yang membantu perusahaan dan organisasi mengembangkan leadership, komunikasi, teamwork, service excellence, motivasi, dan SDM.",

    path: "/",

    keywords: [
        "Mister Gunawan trainer",
        "Mister Gunawan public speaker",
        "trainer profesional",
        "public speaker profesional",
    ],

    image:
        SEO_IMAGES.og,

    imageAlt:
        "Mister Gunawan Professional Trainer dan Public Speaker",
};

/**
 * =========================================================
 * ABOUT SEO
 * =========================================================
 */

export const ABOUT_SEO: PageSEO = {
    title:
        "Tentang Mister Gunawan & Hartawan Sukses Sejahtera",

    description:
        "Kenali Mister Gunawan sebagai Professional Trainer, Public Speaker, Coach, dan Consultant serta Hartawan Sukses Sejahtera (HSS) yang berfokus pada pengembangan SDM, leadership, komunikasi, teamwork, motivasi, dan service excellence.",

    path: "/about",

    keywords: [
        "tentang Mister Gunawan",
        "profil Mister Gunawan",
        "biografi Mister Gunawan",
        "Mister Gunawan trainer",
        "Mister Gunawan public speaker",
        "Hartawan Sukses Sejahtera",
        "profil HSS",
        "HSS Indonesia",
        "professional trainer Indonesia",
        "public speaker Indonesia",
        "trainer profesional",
        "coach Indonesia",
        "konsultan training",
        "pengembangan SDM",
        "human resource development",
    ],

    image:
        SEO_IMAGES.og,

    imageAlt:
        "Mister Gunawan - Professional Trainer dan Public Speaker",
};

/**
 * =========================================================
 * TRAINING SEO
 * =========================================================
 */

export const TRAINING_SEO: PageSEO = {
    title:
        "Training & Pelatihan Profesional",

    description:
        "Program training profesional Mister Gunawan dan Hartawan Sukses Sejahtera meliputi leadership, public speaking, service excellence, teamwork, motivasi, K3, dan pengembangan sumber daya manusia.",

    path: "/training",

    keywords: [
        "training profesional",
        "training perusahaan",
        "pelatihan perusahaan",
        "leadership training",
        "public speaking training",
        "service excellence training",
        "teamwork training",
        "motivasi kerja",
        "pelatihan SDM",
        "training karyawan",
        "corporate training Indonesia",
    ],

    image:
        SEO_IMAGES.og,

    imageAlt:
        "Training dan Pelatihan Profesional Mister Gunawan",
};

/**
 * =========================================================
 * PORTFOLIO SEO
 * =========================================================
 */

export const PORTFOLIO_SEO: PageSEO = {
    title:
        "Portofolio Training & Pengalaman",

    description:
        "Lihat portofolio kegiatan training, seminar, workshop, coaching, dan berbagai program pengembangan SDM yang telah dilakukan Mister Gunawan dan Hartawan Sukses Sejahtera.",

    path: "/portofolio",

    keywords: [
        "portofolio trainer",
        "portofolio training",
        "pengalaman trainer",
        "kegiatan training",
        "seminar perusahaan",
        "workshop perusahaan",
        "dokumentasi training",
        "dokumentasi seminar",
    ],

    image:
        SEO_IMAGES.og,

    imageAlt:
        "Portofolio Training Mister Gunawan",
};

/**
 * =========================================================
 * PARTNER SEO
 * =========================================================
 */

export const PARTNER_SEO: PageSEO = {
    title:
        "Partner & Klien Hartawan Sukses Sejahtera",

    description:
        "Daftar partner dan klien Hartawan Sukses Sejahtera dari berbagai perusahaan, instansi pemerintah, universitas, sekolah, dan organisasi.",

    path: "/partner",

    keywords: [
        "partner HSS",
        "klien HSS",
        "Hartawan Sukses Sejahtera",
        "Mister Gunawan partner",
        "Mister Gunawan client",
        "partner perusahaan training",
        "klien training Indonesia",
    ],

    image:
        SEO_IMAGES.og,

    imageAlt:
        "Partner dan Klien Hartawan Sukses Sejahtera",
};

/**
 * =========================================================
 * CONTACT SEO
 * =========================================================
 */

export const CONTACT_SEO: PageSEO = {
    title:
        "Kontak Mister Gunawan & HSS",

    description:
        "Hubungi Mister Gunawan dan Hartawan Sukses Sejahtera untuk konsultasi dan kebutuhan training perusahaan, public speaking, leadership, service excellence, motivasi, dan pengembangan SDM.",

    path: "/kontak",

    keywords: [
        "kontak Mister Gunawan",
        "kontak HSS",
        "hubungi Mister Gunawan",
        "kontak trainer Indonesia",
        "konsultasi training",
        "training perusahaan",
        "konsultan training",
    ],

    image:
        SEO_IMAGES.og,

    imageAlt:
        "Kontak Mister Gunawan dan Hartawan Sukses Sejahtera",
};

/**
 * =========================================================
 * PAGE SEO COLLECTION
 * =========================================================
 */

export const PAGE_SEO = {
    home:
        HOME_SEO,

    about:
        ABOUT_SEO,

    training:
        TRAINING_SEO,

    portofolio:
        PORTFOLIO_SEO,

    partner:
        PARTNER_SEO,

    kontak:
        CONTACT_SEO,
} as const;

/**
 * =========================================================
 * PAGE SEO KEY
 * =========================================================
 */

export type PageSEOKey =
    keyof typeof PAGE_SEO;

/**
 * =========================================================
 * GET PAGE METADATA
 * =========================================================
 */

export function getPageMetadata(
    page: PageSEOKey
): Metadata {
    return createPageMetadata(
        PAGE_SEO[page]
    );
}