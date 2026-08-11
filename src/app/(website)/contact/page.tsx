import type { Metadata } from "next";

import HeroContact from "@/components/contact/HeroContact";
import ContactSection from "@/components/contact/ContactSection";

import { getPageMetadata } from "@/lib/seo";

export const metadata: Metadata =
    getPageMetadata("kontak");

export default function ContactPage() {
    return (
        <main>
            <HeroContact />

            <ContactSection />
        </main>
    );
}