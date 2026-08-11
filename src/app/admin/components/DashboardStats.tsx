"use client";

import { useCallback, useEffect, useState } from "react";

import {
    Bell,
    Briefcase,
    GraduationCap,
    Handshake,
    Mail,
} from "lucide-react";

import { supabase } from "@/lib/supabase/client";
import { dashboardService } from "@/lib/dashboardService";

interface DashboardStatsData {
    training: number;
    portfolio: number;
    partners: number;
    messages: number;
    unreadMessages: number;
}

export default function DashboardStats() {
    const [stats, setStats] = useState<DashboardStatsData>({
        training: 0,
        portfolio: 0,
        partners: 0,
        messages: 0,
        unreadMessages: 0,
    });

    const [loading, setLoading] = useState(true);

    const loadStats = useCallback(async () => {
        try {
            const data = await dashboardService.getStats();

            setStats({
                training: data.training ?? 0,
                portfolio: data.portfolio ?? 0,
                partners: data.partners ?? 0,
                messages: data.messages ?? 0,
                unreadMessages: data.unreadMessages ?? 0,
            });
        } catch (error) {
            console.error("Failed to load dashboard stats:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadStats();

        const channel = supabase
            .channel("dashboard-stats")
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "messages",
                },
                () => {
                    loadStats();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [loadStats]);

    const cards = [
        {
            title: "Training",
            value: stats.training,
            icon: GraduationCap,
            color: "bg-blue-100 text-blue-600",
        },
        {
            title: "Portofolio",
            value: stats.portfolio,
            icon: Briefcase,
            color: "bg-violet-100 text-violet-600",
        },
        {
            title: "Partner",
            value: stats.partners,
            icon: Handshake,
            color: "bg-emerald-100 text-emerald-600",
        },
        {
            title: "Pesan Masuk",
            value: stats.messages,
            icon: Mail,
            color: "bg-pink-100 text-pink-600",
        },
        {
            title: "Belum Dibaca",
            value: stats.unreadMessages,
            icon: Bell,
            color: "bg-red-100 text-red-600",
        },
    ];

    return (
        <div
            className="
                mb-10
                grid
                gap-6
                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-5
            "
        >
            {cards.map((item) => {
                const Icon = item.icon;

                return (
                    <div
                        key={item.title}
                        className="
                            rounded-3xl
                            border
                            border-slate-200
                            bg-white
                            p-6
                            shadow-sm
                            transition-all
                            hover:-translate-y-1
                            hover:shadow-lg
                        "
                    >
                        <div className="flex items-center justify-between">

                            <div>
                                <p className="text-sm text-slate-500">
                                    {item.title}
                                </p>

                                <h2
                                    className="
                                        mt-2
                                        text-4xl
                                        font-bold
                                        text-slate-900
                                    "
                                >
                                    {loading ? "..." : item.value}
                                </h2>
                            </div>

                            <div
                                className={`
                                    flex
                                    h-14
                                    w-14
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    ${item.color}
                                `}
                            >
                                <Icon className="h-7 w-7" />
                            </div>

                        </div>
                    </div>
                );
            })}
        </div>
    );
}