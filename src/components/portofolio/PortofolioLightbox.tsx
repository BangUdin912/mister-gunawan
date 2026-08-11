"use client";

import { useEffect } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface PortofolioLightboxProps {
  images: string[];
  currentIndex: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onIndexChange: (index: number) => void;
}

export default function PortofolioLightbox({
  images,
  currentIndex,
  open,
  onOpenChange,
  onIndexChange,
}: PortofolioLightboxProps) {
  const previousImage = () => {
    onIndexChange(
      currentIndex === 0
        ? images.length - 1
        : currentIndex - 1
    );
  };

  const nextImage = () => {
    onIndexChange(
      currentIndex === images.length - 1
        ? 0
        : currentIndex + 1
    );
  };

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      switch (event.key) {
        case "ArrowLeft":
          previousImage();
          break;

        case "ArrowRight":
          nextImage();
          break;

        case "Escape":
          onOpenChange(false);
          break;
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, [open, currentIndex]);

  if (!images.length) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent
        className="
          h-screen
          w-screen
          max-w-none
          border-0
          bg-black/95
          p-0
          shadow-none
        "
      >
        {/* Close */}
        <Button
          size="icon"
          variant="ghost"
          onClick={() => onOpenChange(false)}
          className="
            absolute
            right-6
            top-6
            z-50
            rounded-full
            text-white
            hover:bg-white/10
            hover:text-white
          "
        >
          <X className="h-6 w-6" />
        </Button>

        {/* Counter */}
        <div
          className="
            absolute
            left-1/2
            top-6
            z-50
            -translate-x-1/2
            rounded-full
            bg-black/50
            px-4
            py-2
            text-sm
            font-medium
            text-white
            backdrop-blur
          "
        >
          {currentIndex + 1} / {images.length}
        </div>

        {/* Previous */}
        <Button
          size="icon"
          variant="ghost"
          onClick={previousImage}
          className="
            absolute
            left-6
            top-1/2
            z-50
            -translate-y-1/2
            rounded-full
            bg-black/40
            text-white
            hover:bg-black/60
            hover:text-white
          "
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>

        {/* Next */}
        <Button
          size="icon"
          variant="ghost"
          onClick={nextImage}
          className="
            absolute
            right-6
            top-1/2
            z-50
            -translate-y-1/2
            rounded-full
            bg-black/40
            text-white
            hover:bg-black/60
            hover:text-white
          "
        >
          <ChevronRight className="h-8 w-8" />
        </Button>

        {/* Image */}
        <div
          className="
            relative
            flex
            h-full
            w-full
            items-center
            justify-center
            p-8
          "
        >
          <div
            className="
              relative
              h-full
              w-full
            "
          >
            <Image
              src={images[currentIndex]}
              alt={`Gallery ${currentIndex + 1}`}
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}