import { ListWithCards } from "@/lib/schema";
import { ListHeader } from "./list-header";

interface ListItemProps {
  index: number;
  val: ListWithCards;
}

export const ListItem = ({ index, val }: ListItemProps) => {
  return (
    <li className="shrink-0 w-[272px] select-none h-full">
      <div className="w-full rounded-md shadow-md pb-2  bg-[#f1f2f4]">
        <ListHeader val={val} />
      </div>
    </li>
  );
};
