"use client";

import type {
    ReactNode,
} from "react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    cn,
} from "@/lib/utils";

interface SettingSectionProps {

    title: string;

    description?: string;

    children: ReactNode;

    className?: string;

    contentClassName?: string;

}

export default function SettingSection({
    title,
    description,
    children,
    className,
    contentClassName,
}: SettingSectionProps) {

    return (

        <Card
            className={className}
        >

            <CardHeader>

                <CardTitle>
                    {title}
                </CardTitle>

                {
                    description && (

                        <p
                            className="
                                text-sm
                                text-muted-foreground
                            "
                        >
                            {description}
                        </p>

                    )
                }

            </CardHeader>


            <CardContent
                className={cn(
                    "space-y-6",
                    contentClassName
                )}
            >

                {children}

            </CardContent>

        </Card>

    );

}