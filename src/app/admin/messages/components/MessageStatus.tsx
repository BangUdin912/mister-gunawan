"use client";

import {
    Loader2,
} from "lucide-react";

import type {
    MessageStatus,
} from "@/types/message";

import {
    Label,
} from "@/components/ui/label";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface MessageStatusProps {

    value: MessageStatus;

    loading?: boolean;

    onChange: (
        status: MessageStatus
    ) => void;

}

export default function MessageStatus({

    value,

    loading = false,

    onChange,

}: MessageStatusProps) {

    return (

        <div className="space-y-2">

            <Label>
                Status Pesan
            </Label>

            <Select

                value={value}

                disabled={loading}

                onValueChange={(status) =>

                    onChange(
                        status as MessageStatus
                    )

                }

            >

                <SelectTrigger>

                    {
                        loading && (

                            <Loader2
                                className="
                                    mr-2
                                    h-4
                                    w-4
                                    animate-spin
                                "
                            />

                        )
                    }

                    <SelectValue />

                </SelectTrigger>

                <SelectContent>

                    <SelectItem value="New">
                        🟢 New
                    </SelectItem>

                    <SelectItem value="Read">
                        🔵 Read
                    </SelectItem>

                    <SelectItem value="Replied">
                        🟣 Replied
                    </SelectItem>

                    <SelectItem value="Archived">
                        ⚫ Archived
                    </SelectItem>

                </SelectContent>

            </Select>

            <p className="text-xs text-muted-foreground">

                Ubah status sesuai progres penanganan pesan.

            </p>

        </div>

    );

}