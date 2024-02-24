import { NewBoard } from "@/lib/schema";

type BoardNavbarProps = {
  data: NewBoard;
};

const BoardNavbar = async ({ data }: BoardNavbarProps) => {
  return (
    <div className="w-full h-14 z-40 bg-black/50 fixed flex items-center px-6 gap-x-4 top-14 text-white"></div>
  );
};

export default BoardNavbar;
