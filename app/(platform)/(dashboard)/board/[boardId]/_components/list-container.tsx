"use client";
import type { ListWithCards } from "@/lib/schema";
import { ListForm } from "./list-form";
import { ListItem } from "./list-item";
import { useEffect, useState } from "react";

interface ListContainerProps {
  boardId: string;
  data: ListWithCards[];
}

export const ListContainer = ({ boardId, data }: ListContainerProps) => {
  const [listData, setListData] = useState(data);

  useEffect(() => {
    setListData(data);
  }, [data]);
  return (
    <div>
      <ol className="flex h-full flex-col md:flex-row  md:items-start items-center  md:justify-between flex-wrap ">
        {listData.map((val, index) => {
          return <ListItem key={val.id} index={index} val={val} />;
        })}
        <ListForm boardId={boardId} />
        <div className=" flex-shrink-0 w-1" />
      </ol>
    </div>
  );
};
