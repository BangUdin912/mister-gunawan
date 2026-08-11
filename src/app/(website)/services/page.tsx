import type { Metadata } from "next";

import HeroServices from "@/components/services/HeroServices";
import ServiceSection from "@/components/services/ServiceSection";
import ServiceBenefit from "@/components/services/ServiceBenefit";
import TrainingProcess from "@/components/services/TrainingProcess";

import { getPageMetadata } from "@/lib/seo";

export const metadata: Metadata = getPageMetadata("training");

export default function ServicesPage() {
    return (
        <main>
            <HeroServices />

            <ServiceSection />

            <ServiceBenefit />

            <TrainingProcess />
        </main>
    );
}