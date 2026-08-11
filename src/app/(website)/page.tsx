
import type { Metadata } from "next";

import Hero from "@/components/home/Hero";
import AboutSection from "@/components/home/AboutSection";
import ServicesSection from "@/components/home/ServicesSection";
import PortfolioSection from "@/components/home/PortofolioSection";
import PartnerSection from "@/components/home/PartnerSection";
import FAQSection from "@/components/home/FAQSection";
import TestimonialSection from "@/components/home/TestimonialSection";

import { getPageMetadata } from "@/lib/seo";

/**
 * =========================================================
 * HOME PAGE SEO
 * =========================================================
 *
 * SEO homepage diambil dari konfigurasi terpusat:
 * src/lib/seo.ts
 */
export const metadata: Metadata = getPageMetadata("home");

/**
 * =========================================================
 * HOME PAGE
 * =========================================================
 */
export default function HomePage() {
    return (
        <>
            <Hero />

            <AboutSection />

            <ServicesSection />

            <PortfolioSection />

            <PartnerSection />

            <FAQSection />

            <TestimonialSection />
        </>
    );
}