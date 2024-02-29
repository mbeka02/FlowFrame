import type { ListWithCards } from "@/lib/schema";
import { ListForm } from "./list-form";

interface ListContainerProps {
  boardId: string;
  data: ListWithCards[];
}

export const ListContainer = ({ boardId, data }: ListContainerProps) => {
  return (
    <div>
      <ol>
        <ListForm boardId={boardId} />
        <div className=" flex-shrink-0 w-1" />
      </ol>
    </div>
  );
};
