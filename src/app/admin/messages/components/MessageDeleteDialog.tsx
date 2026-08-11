"use client";

import {
    Loader2,
    Trash2,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import type {
    Message,
} from "@/types/message";

interface MessageDeleteDialogProps {

    message: Message;

    loading?: boolean;

    onDelete: (
        message: Message
    ) => Promise<void> | void;

}

export default function MessageDeleteDialog({

    message,

    loading = false,

    onDelete,

}: MessageDeleteDialogProps) {

    return (

        <AlertDialog>

            <AlertDialogTrigger
    className="
        inline-flex
        items-center
        justify-center
        rounded-md
        bg-destructive
        px-4
        py-2
        text-sm
        font-medium
        text-destructive-foreground
        transition-colors
        hover:bg-destructive/90
        focus:outline-none
        focus:ring-2
        focus:ring-ring
        focus:ring-offset-2
        disabled:pointer-events-none
        disabled:opacity-50
    "
>

    <Trash2 className="mr-2 h-4 w-4" />

    Hapus

</AlertDialogTrigger>

            <AlertDialogContent>

                <AlertDialogHeader>

                    <AlertDialogTitle>

                        Hapus Pesan?

                    </AlertDialogTitle>

                    <AlertDialogDescription>

                        Pesan dari{" "}

                        <strong>

                            {message.name}

                        </strong>

                        {" "}akan dihapus secara permanen.

                        <br />

                        Tindakan ini tidak dapat dibatalkan.

                    </AlertDialogDescription>

                </AlertDialogHeader>

                <AlertDialogFooter>

                    <AlertDialogCancel
                        disabled={loading}
                    >

                        Batal

                    </AlertDialogCancel>

                    <AlertDialogAction

                        disabled={loading}

                        onClick={async (e) => {

                            e.preventDefault();

                            await onDelete(
                                message
                            );

                        }}

                    >

                        {

                            loading
                                ?

                                (

                                    <>

                                        <Loader2
                                            className="
                                                mr-2
                                                h-4
                                                w-4
                                                animate-spin
                                            "
                                        />

                                        Menghapus...

                                    </>

                                )

                                :

                                (

                                    <>

                                        <Trash2
                                            className="
                                                mr-2
                                                h-4
                                                w-4
                                            "
                                        />

                                        Hapus

                                    </>

                                )

                        }

                    </AlertDialogAction>

                </AlertDialogFooter>

            </AlertDialogContent>

        </AlertDialog>

    );

}