
import {
    COMPANY_NAME,
    SITE_NAME,
    SITE_URL,
} from "@/lib/seo";

/**
 * =========================================================
 * LOCAL BUSINESS / PROFESSIONAL SERVICE SCHEMA
 * =========================================================
 *
 * Structured data untuk membantu search engine memahami
 * identitas Mister Gunawan dan Hartawan Sukses Sejahtera.
 */
export default function LocalBusinessSchema() {
    const schema = {
        "@context": "https://schema.org",

        "@type": "ProfessionalService",

        "@id": `${SITE_URL}/#organization`,

        name: SITE_NAME,

        alternateName: COMPANY_NAME,

        url: SITE_URL,

        image: `${SITE_URL}/images/og-image.jpg`,

        logo: `${SITE_URL}/images/logo.png`,

        description:
            "Mister Gunawan merupakan Professional Trainer, Public Speaker, Coach, dan Consultant melalui Hartawan Sukses Sejahtera (HSS) yang menyediakan layanan Leadership Training, Service Excellence, Public Speaking, Motivation, Consultant Training, serta pengembangan SDM perusahaan dan instansi.",

        telephone: "+6281915118782",

        email: "info@mistergunawan.com",

        areaServed: {
            "@type": "Country",
            name: "Indonesia",
        },

        founder: {
            "@type": "Person",
            name: "Mister Gunawan",
        },

        serviceType: [
            "Professional Training",
            "Corporate Training",
            "Leadership Training",
            "Public Speaking Training",
            "Motivation Training",
            "Service Excellence Training",
            "Human Resource Development",
        ],

        knowsAbout: [
            "Leadership Training",
            "Public Speaking",
            "Professional Training",
            "Corporate Training",
            "Motivation",
            "Consultant Training",
            "Service Excellence",
            "Soft Skill Development",
            "Human Resource Development",
            "Teamwork",
            "Communication",
        ],

        contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer service",
            telephone: "+6281915118782",
            email: "info@mistergunawan.com",
            availableLanguage: [
                "Indonesian",
            ],
        },

        /*
         * Jangan isi sameAs dengan URL placeholder.
         * Tambahkan hanya URL sosial media resmi.
         */
        sameAs: [],

        hasOfferCatalog: {
            "@type": "OfferCatalog",

            name: "Training Services",

            itemListElement: [
                {
                    "@type": "Offer",

                    itemOffered: {
                        "@type": "Service",

                        name: "Professional Training",

                        serviceType:
                            "Professional Training",
                    },
                },

                {
                    "@type": "Offer",

                    itemOffered: {
                        "@type": "Service",

                        name:
                            "Public Speaking & Motivation",

                        serviceType:
                            "Public Speaking and Motivation Training",
                    },
                },

                {
                    "@type": "Offer",

                    itemOffered: {
                        "@type": "Service",

                        name:
                            "Leadership Training",

                        serviceType:
                            "Leadership Training",
                    },
                },

                {
                    "@type": "Offer",

                    itemOffered: {
                        "@type": "Service",

                        name:
                            "Service Excellence Training",

                        serviceType:
                            "Service Excellence Training",
                    },
                },

                {
                    "@type": "Offer",

                    itemOffered: {
                        "@type": "Service",

                        name:
                            "Corporate Training",

                        serviceType:
                            "Corporate Training",
                    },
                },

                {
                    "@type": "Offer",

                    itemOffered: {
                        "@type": "Service",

                        name:
                            "Human Resource Development",

                        serviceType:
                            "Human Resource Development",
                    },
                },
            ],
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(schema),
            }}
        />
    );
}
