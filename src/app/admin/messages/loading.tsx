import {
    Skeleton,
} from "@/components/ui/skeleton";

import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card";

export default function Loading() {

    return (

        <div className="space-y-6">

            {/* Header */}

            <div className="space-y-2">

                <Skeleton className="h-9 w-56" />

                <Skeleton className="h-4 w-80" />

            </div>

            <Card>

                <CardHeader className="space-y-4">

                    <Skeleton className="h-6 w-40" />

                    <Skeleton className="h-10 w-full" />

                </CardHeader>

                <CardContent>

                    <div className="rounded-lg border">

                        {/* Header Table */}

                        <div className="grid grid-cols-7 gap-4 border-b p-4">

                            {Array.from({
                                length: 7,
                            }).map((_, index) => (

                                <Skeleton
                                    key={index}
                                    className="h-5 w-full"
                                />

                            ))}

                        </div>

                        {/* Rows */}

                        {Array.from({
                            length: 8,
                        }).map((_, row) => (

                            <div
                                key={row}
                                className="
                                    grid
                                    grid-cols-7
                                    gap-4
                                    border-b
                                    p-4
                                    last:border-b-0
                                "
                            >

                                {Array.from({
                                    length: 7,
                                }).map((_, col) => (

                                    <Skeleton
                                        key={col}
                                        className="h-5 w-full"
                                    />

                                ))}

                            </div>

                        ))}

                    </div>

                </CardContent>

            </Card>

        </div>

    );

}