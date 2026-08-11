"use client";

import { useState } from "react";
import type { ReactElement } from "react";

import {
  Loader2,
  Trash2,
} from "lucide-react";

import type { Service } from "@/types/service";
import { serviceService } from "@/lib/serviceService";

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

interface Props {
  trigger: ReactElement;
  service: Service;
  onDeleted: () => void;
}

export default function ServiceDeleteDialog({
  trigger,
  service,
  onDeleted,
}: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    try {
      setLoading(true);

      await serviceService.delete(service.id);

      setOpen(false);
      onDeleted();
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus data training.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={setOpen}
    >
      <AlertDialogTrigger
        render={trigger}
      />

      <AlertDialogContent
        size="sm"
      >
        <AlertDialogHeader>
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
            <Trash2 className="h-7 w-7 text-red-600" />
          </div>

          <AlertDialogTitle className="text-center">
            Hapus Training
          </AlertDialogTitle>

          <AlertDialogDescription className="text-center leading-6">
            Apakah Anda yakin ingin menghapus training
            <span className="mx-1 font-semibold text-slate-900">
              "{service.title}"
            </span>
            ?

            <br />
            <br />

            Tindakan ini bersifat permanen dan data yang telah
            dihapus tidak dapat dikembalikan.
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
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            className="bg-red-600 hover:bg-red-700"
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