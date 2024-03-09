"use client";

interface FormPickerProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}
import { cn } from "@/lib/utils";
import { unsplashApi } from "@/utilities/unsplash";
import { fallbackImages } from "@/constants/image-fallback";
import { Check, Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { FormErrors } from "./form-errors";

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
        //use fallback in case rate limit has been exceeded or if any other random error occurs
        setImages(fallbackImages);
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
              <input
                type="radio"
                id={id}
                name={id}
                className="hidden"
                readOnly
                checked={selectedImageId === image.id}
                disabled={pending}
                //server action splits the value to each individual element using |
                value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
              />
              <Image
                fill
                src={image.urls.thumb}
                alt="Unsplash image"
                className="object-cover rounded-sm"
              />
              {selectedImageId === image.id && (
                <div className="absolute inset-y-0 h-full w-full bg-black/30 flex items-center justify-center">
                  <Check className=" h-4 w-4 text-white" />
                </div>
              )}
              <Link
                href={image.links.html}
                target="_blank"
                className="
              opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white bg-black/50 p-1 hover:underline"
              >
                {image.user.name}
              </Link>
            </div>
          );
        })}
      </div>
      <FormErrors id="image" errors={errors} />
    </div>
  );
};
