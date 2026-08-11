"use client";

import { Loader2, Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export interface Partner {
  id: string;
  name: string;
  image_url?: string | null;
  sort_order?: number;
  is_active?: boolean;
}

interface PartnerDeleteDialogProps {
  open: boolean;
  partner: Partner | null;
  loading?: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void | Promise<void>;
}

export default function PartnerDeleteDialog({
  open,
  partner,
  loading = false,
  onOpenChange,
  onConfirm,
}: PartnerDeleteDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Trash2 className="h-5 w-5 text-destructive" />
            Hapus Partner
          </AlertDialogTitle>

          <AlertDialogDescription className="space-y-2">
            <span className="block">
              Apakah Anda yakin ingin menghapus partner berikut?
            </span>

            <span className="block rounded-md border bg-muted p-3 font-medium text-foreground">
              {partner?.name ?? "-"}
            </span>

            <span className="block text-sm">
              Tindakan ini tidak dapat dibatalkan dan data akan dihapus
              secara permanen.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>
            Batal
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              onConfirm();
            }}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Menghapus...
              </>
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" />
                Hapus
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}