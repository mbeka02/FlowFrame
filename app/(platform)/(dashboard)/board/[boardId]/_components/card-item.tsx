"use client";

import { NewCard } from "@/lib/schema";
import { Draggable } from "@hello-pangea/dnd";

interface CardItemProps {
  i: number; //index
  data: NewCard;
}

export const CardItem = ({ i, data }: CardItemProps) => {
  return (
    <Draggable draggableId={data.id} index={i}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          role="button"
          className=" trunctate  hover:border-black text-neutral-700 list-none border-2 border-transparent rounded-md shadow hover:text-black text-sm py-2 px-3 bg-white"
        >
          {data.title}
        </div>
      )}
    </Draggable>
  );
};
