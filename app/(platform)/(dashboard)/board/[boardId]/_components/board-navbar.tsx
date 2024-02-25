import { NewBoard } from "@/lib/schema";
import { BoardNavbarTitle } from "./board-navbar-title";
import { BoardOptions } from "./board-options";

type BoardNavbarProps = {
  data: NewBoard;
};

const BoardNavbar = async ({ data }: BoardNavbarProps) => {
  return (
    <div className="w-full h-14 z-40 bg-black/50 fixed flex items-center px-6 gap-x-4 top-14 text-white">
      <BoardNavbarTitle data={data} />
      <div className="ml-auto">
        <BoardOptions id={data.id} />
      </div>
    </div>
  );
};

export default BoardNavbar;
