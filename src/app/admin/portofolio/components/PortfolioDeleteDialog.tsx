"use client";

import { useState } from "react";

import { Trash2 } from "lucide-react";

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

import { Button } from "@/components/ui/button";

interface PortfolioDeleteDialogProps {
  title: string;
  onConfirm: () => Promise<void> | void;
}

export default function PortfolioDeleteDialog({
  title,
  onConfirm,
}: PortfolioDeleteDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    try {
      setLoading(true);

      await onConfirm();

      setOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Button
        type="button"
        size="icon"
        variant="destructive"
        onClick={() => setOpen(true)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>

      <AlertDialog
        open={open}
        onOpenChange={setOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Hapus Portfolio?
            </AlertDialogTitle>

            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus portfolio{" "}
              <span className="font-semibold">
                "{title}"
              </span>
              ?
              <br />
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
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
              disabled={loading}
            >
              {loading
                ? "Menghapus..."
                : "Ya, Hapus"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}