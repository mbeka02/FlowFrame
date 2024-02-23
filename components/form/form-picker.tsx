"use client";

interface FormPickerProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}
import { cn } from "@/lib/utils";
import { unsplashApi } from "@/utilities/unsplash";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

export const FormPicker = ({ id, errors }: FormPickerProps) => {
  const [images, setImages] = useState<Array<Record<string, any>>>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImageId, setSelectedImageId] = useState(null);
  const { pending } = useFormStatus();
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await unsplashApi.photos.getRandom({
          collectionIds: ["317099"],
          count: 9,
        });
        if (res && res.response) {
          const newImages = res.response as Array<Record<string, any>>;
          setImages(newImages);
        } else {
          console.error("Failed to fetch images from unspash");
        }
      } catch (error) {
        console.log(error);
        setImages([]);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-amber-600 animate-spin" />
      </div>
    );
  }
  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-2 mb-2">
        {images.map((image) => {
          return (
            <div
              key={image.id}
              className={cn(
                "cursor-pointer  relative aspect-video  group hover:opacity-75 transition bg-muted",
                pending && "opacity-50 hover:opacity-50 cursor-auto"
              )}
              onClick={() => {
                if (pending) return;
                setSelectedImageId(image.id);
              }}
            >
              <Image
                fill
                src={image.urls.thumb}
                alt="Unsplash image"
                className="object-cover rounded-sm"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
