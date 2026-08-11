import type { Metadata } from "next";

import HeroAbout from "@/components/about/HeroAbout";
import ProfileMister from "@/components/about/ProfileMister";
import ProfileHss from "@/components/about/ProfileHss";
import WhyChooseHss from "@/components/about/WhyChooseHSS";
import TimelineSection from "@/components/about/JourneyTimeline";

import { getPageMetadata } from "@/lib/seo";

export const metadata: Metadata =
    getPageMetadata("about");

export default function AboutPage() {
    return (
        <main>
            <HeroAbout />

            <ProfileMister />

            <ProfileHss />

            <WhyChooseHss />

            <TimelineSection />
        </main>
    );
}