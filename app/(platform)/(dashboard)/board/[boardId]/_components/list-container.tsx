"use client";
import type { ListWithCards, NewCard } from "@/lib/schema";
import { ListForm } from "./list-form";
import { ListItem } from "./list-item";
import { useEffect, useState } from "react";

import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useAction } from "@/hooks/use-action";
import { updateListPosition } from "@/server-actions/update-list-position";
import { toast } from "sonner";
import { updateCardPosition } from "@/server-actions/update-card-position";
interface ListContainerProps {
  boardId: string;
  data: ListWithCards[];
}

export const ListContainer = ({ boardId, data }: ListContainerProps) => {
  const [listData, setListData] = useState(data);

  useEffect(() => {
    setListData(data);
  }, [data]);

  const { exec: updateLists } = useAction(updateListPosition, {
    onError(error) {
      toast.error(error);
    },
  });
  const { exec: updateCards } = useAction(updateCardPosition, {
    onSuccess() {
      toast.success("card reordered");
    },
    onError(error) {
      toast.error(error);
    },
  });

  const reorder = <T,>(list: T[], startIndex: number, lastIndex: number) => {
    const arr = Array.from(list);
    const [removed] = arr.splice(startIndex, 1);
    arr.splice(lastIndex, 0, removed);
    return arr;
  };

  const handleDragEnd = (result: any) => {
    const { source, destination, type } = result;

    if (!destination) {
      return;
    }
    //dropped in the same position.
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    //if a list is being moved.
    if (type === "list") {
      const reorderedData = reorder(
        listData,
        source.index,
        destination.index
      ).map(
        //change to  new positions
        (item, index) => ({ ...item, position: index })
      );
      setListData(reorderedData);
      //EXECUTE SERVER ACTION
      updateLists({ items: reorderedData, boardId });
    }
    //if a card is being moved.
    if (type === "card") {
      let listDataCopy = [...listData];

      //find source and destination list
      const sourceList = listDataCopy.find(
        (list) => list.id === source.droppableId
      );
      const destinationList = listDataCopy.find(
        (list) => list.id === destination.droppableId
      );

      if (!sourceList || !destinationList) {
        return;
      }
      //check if cards exist on source list
      if (!sourceList.card) {
        sourceList.card = [];
      }
      //check if cards exist on destination list
      if (!destinationList.card) {
        destinationList.card = [];
      }
      //if the card is moved in the same list
      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.card,
          source.index,
          destination.index
        );
        //assign correct position
        reorderedCards.forEach((card, index) => {
          card.position = index;
        });
        sourceList.card = reorderedCards;
        setListData(listDataCopy);
        updateCards({
          items: reorderedCards,
          boardId: boardId,
          listId: sourceList.id,
        });
      } else {
        //if the card is moved to a new list
        //remove card from the src list
        const [removedCard] = sourceList.card.splice(source.index, 1);

        //assign the the destination list id to the removed card
        removedCard.listId = destination.droppableId;

        //Add the card to the destination list
        destinationList.card.splice(destination.index, 0, removedCard);
        //assign the correct position in the source list
        sourceList.card.forEach((card, index) => {
          card.position = index;
        });
        //update positon in the destination list
        destinationList.card.forEach((card, index) => {
          card.position = index;
        });

        setListData(listDataCopy);

        updateCards({
          items: destinationList.card,
          boardId: boardId,
          listId: destinationList.id,
        });
      }
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            //draggable requires a HTMLElement
            ref={provided.innerRef}
            className="flex h-full flex-col md:flex-row  md:items-start items-center  md:justify-between flex-wrap "
          >
            {listData.map((val, index) => {
              return <ListItem key={val.id} index={index} val={val} />;
            })}
            {provided.placeholder}
            <ListForm boardId={boardId} />
            <div className=" flex-shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};
