import { HelpCircle, User2 } from "lucide-react";
import Hint from "@/components/hint";

interface BoardListProps {
  id: number;
  title: string;
}

const BoardList = ({ boards }: { boards: BoardListProps[] }) => {
  return (
    <div className="space-y-4">
      <div className=" flex items-center font-semibold text-neutral-800  text-lg">
        <User2 className="mr-2 h-6 w-6" />
        Your Boards
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          className=" aspect-video rounded-sm  relative h-full w-full bg-muted flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition "
          role="button"
        >
          <p className="text-sm">Create New Board</p>
          <span className="text-sm">8 Remaining</span>
          <Hint
            sideOffset={40}
            description={`Free workspaces can have upto 8 free boards , upgrade your workspace for unlimited boards`}
          >
            <HelpCircle className="absolute bottom-2 right-2 h-[14px] w-[14px]" />
          </Hint>
        </div>
        {/*boards.map((board) => {
          return <div key={board.id}>{board.title}</div>;
        })*/}
      </div>
    </div>
  );
};

export default BoardList;
