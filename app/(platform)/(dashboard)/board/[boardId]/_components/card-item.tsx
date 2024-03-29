"use client";

import { useCardModal } from "@/hooks/use-card-modal";
import { NewCard } from "@/lib/schema";
import { Draggable } from "@hello-pangea/dnd";

interface CardItemProps {
  index: number; //index
  data: NewCard;
}

export const CardItem = ({ index, data }: CardItemProps) => {
  const cardModal = useCardModal();
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onClick={() => cardModal.onOpen(data.id)}
          role="button"
          className=" trunctate  hover:border-black text-neutral-700 list-none border-2 border-transparent rounded-md shadow hover:text-black text-sm py-2 px-3 bg-white"
        >
          {data.title}
        </div>
      )}
    </Draggable>
  );
};
