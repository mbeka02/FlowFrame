"use client";

import { NewCard } from "@/lib/schema";

interface CardItemProps {
  index: number;
  data: NewCard;
}

export const CardItem = ({ index, data }: CardItemProps) => {
  return (
    <div
      role="button"
      className=" trunctate  hover:border-black text-neutral-700 list-none border-2 border-transparent rounded-md shadow hover:text-black text-sm py-2 px-3 bg-white"
    >
      {data.title}
    </div>
  );
};
