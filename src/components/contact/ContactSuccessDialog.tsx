"use client";

import { useRouter } from "next/navigation";

import {
  CheckCircle2,
  ArrowRight,
  MessageCircle,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

interface ContactSuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ContactSuccessDialog({
  open,
  onOpenChange,
}: ContactSuccessDialogProps) {
  const router = useRouter();

  function handleClose() {
    onOpenChange(false);
  }

  function handleServices() {
    onOpenChange(false);
    router.push("/services");
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-w-md rounded-3xl p-8">

        <DialogHeader className="items-center text-center">

          <div
            className="
              mb-6
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-full
              bg-green-100
            "
          >
            <CheckCircle2 className="h-11 w-11 text-green-600" />
          </div>

          <DialogTitle className="text-3xl font-bold">
            Pesan Berhasil Dikirim
          </DialogTitle>

          <DialogDescription
            className="
              mt-4
              text-base
              leading-7
              text-muted-foreground
            "
          >
            Terima kasih telah menghubungi
            <strong> Hartawan Sukses Sejahtera (HSS)</strong>.

            <br />
            <br />

            Pesan Anda telah berhasil tersimpan pada sistem kami dan
            diteruskan ke halaman <strong>Admin Messages</strong>.

            <br />
            <br />

            Tim kami akan segera meninjau pesan Anda dan menghubungi
            melalui WhatsApp, telepon, atau email yang telah Anda isi.
          </DialogDescription>

        </DialogHeader>

        <div
          className="
            my-6
            rounded-xl
            border
            bg-muted/40
            p-4
          "
        >
          <div className="flex items-start gap-3">
            <MessageCircle className="mt-0.5 h-5 w-5 text-primary" />

            <div className="space-y-1 text-sm">
              <p className="font-medium">
                Status Pesan
              </p>

              <p className="text-muted-foreground">
                Pesan Anda otomatis masuk ke daftar
                <strong> Messages </strong>
                dengan status
                <strong> New</strong>.
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col gap-3 sm:flex-col">

          <Button
            onClick={handleClose}
            className="
              w-full
              rounded-xl
            "
          >
            Tutup
          </Button>

          <Button
            variant="outline"
            className="w-full rounded-xl"
            onClick={handleServices}
          >
            Lihat Layanan

            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}