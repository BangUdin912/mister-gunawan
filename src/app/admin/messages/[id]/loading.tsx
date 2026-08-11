import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card";

import {
    Skeleton,
} from "@/components/ui/skeleton";

export default function Loading() {

    return (

        <div className="space-y-6">

            {/* Header */}

            <div className="space-y-2">

                <Skeleton className="h-9 w-64" />

                <Skeleton className="h-4 w-96" />

            </div>

            {/* Informasi Pesan */}

            <Card>

                <CardHeader>

                    <Skeleton className="h-6 w-40" />

                </CardHeader>

                <CardContent className="space-y-6">

                    {Array.from({
                        length: 8,
                    }).map((_, index) => (

                        <div
                            key={index}
                            className="space-y-2"
                        >

                            <Skeleton className="h-4 w-24" />

                            <Skeleton className="h-10 w-full" />

                        </div>

                    ))}

                </CardContent>

            </Card>

            {/* Tombol Aksi */}

            <Card>

                <CardHeader>

                    <Skeleton className="h-6 w-32" />

                </CardHeader>

                <CardContent>

                    <div className="flex flex-wrap gap-3">

                        <Skeleton className="h-10 w-36" />

                        <Skeleton className="h-10 w-36" />

                        <Skeleton className="h-10 w-36" />

                        <Skeleton className="h-10 w-36" />

                    </div>

                </CardContent>

            </Card>

        </div>

    );

}