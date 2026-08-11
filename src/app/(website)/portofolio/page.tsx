import type { Metadata } from "next";

import HeroPortfolio from "@/components/portofolio/HeroPortofolio";
import PortfolioGrid from "@/components/portofolio/PortofolioGrid";

import { portfolioService } from "@/lib/portofolioService";
import { getPageMetadata } from "@/lib/seo";

import type { Portfolio } from "@/types/portfolio";

export const metadata: Metadata =
    getPageMetadata("portofolio");

export default async function PortfolioPage() {
    let portfolios: Portfolio[] = [];

    try {
        portfolios =
            await portfolioService.getAll();
    } catch (error) {
        console.error(
            "Failed to load portfolio:",
            error
        );
    }

    return (
        <main className="overflow-hidden">
            <HeroPortfolio />

            <PortfolioGrid
                portfolios={portfolios}
            />
        </main>
    );
}