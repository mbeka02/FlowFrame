"use client";
import { ListWithCards } from "@/lib/schema";
import { ListHeader } from "./list-header";
import { ElementRef, useRef, useState } from "react";
import { CardForm } from "./card-form";
import { cn } from "@/lib/utils";
import { CardItem } from "./card-item";

interface ListItemProps {
  index: number;
  val: ListWithCards;
}

export const ListItem = ({ index, val }: ListItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const textAreaRef = useRef<ElementRef<"textarea">>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textAreaRef.current?.focus;
    });
  };
  const disableEditing = () => {
    setIsEditing(false);
  };

  return (
    <li className="shrink-0 w-[272px] select-none h-full">
      <div className="w-full rounded-md shadow-md pb-2  bg-[#f1f2f4]">
        <ListHeader onAddCard={enableEditing} val={val} />
        <ol
          className={cn(
            "mx-1 flex flex-col gap-y-2 px-1 py-0.5",
            val.card.length > 0 ? "mt-2" : "mt-0"
          )}
        >
          {val.card.map((v, i) => (
            <CardItem key={v.id} index={index} data={v} />
          ))}
        </ol>
        <CardForm
          isEditing={isEditing}
          disableEditing={disableEditing}
          enableEditing={enableEditing}
          listId={val.id}
          ref={textAreaRef}
        />
      </div>
    </li>
  );
};
