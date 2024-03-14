import { HelpCircle, User2 } from "lucide-react";
import Hint from "@/components/hint";
import FormPopover from "@/components/form/form-popover";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { board } from "@/lib/schema";
import { db } from "@/lib/db";
import { desc, eq } from "drizzle-orm";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { getAvailableCount } from "@/utilities/org-limit";
import { BOARDS_LIMIT } from "@/constants/boards";

const BoardList = async () => {
  const { orgId } = auth();
  if (!orgId) {
    redirect("/select-org");
  }
  const boards = await db
    .select()
    .from(board)
    .where(eq(board.orgId, orgId))
    .orderBy(desc(board.createdAt));

  const availableCount = await getAvailableCount();
  return (
    <div className="space-y-4">
      <div className=" flex items-center font-semibold text-neutral-900  text-lg">
        <User2 className="mr-2 h-6 w-6" />
        Your Boards
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <FormPopover sideOffset={10} side="right">
          <div
            className=" aspect-video rounded-sm  relative h-full w-full bg-muted flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition "
            role="button"
          >
            <p className="text-sm">Create New Board</p>
            <span className="text-sm  text-neutral-500">
              {BOARDS_LIMIT - availableCount} Remaining
            </span>
            <Hint
              sideOffset={40}
              description={`Free workspaces can have upto 8 free boards , upgrade your workspace for unlimited boards`}
            >
              <HelpCircle className="absolute bottom-2 right-2 h-[14px] w-[14px]" />
            </Hint>
          </div>
        </FormPopover>
        {boards.map((board) => {
          return (
            <Link
              href={`/board/${board.id}`}
              key={board.id}
              style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
              className="group relative aspect-video bg-center bg-cover bg-no-repeat bg-amber-600 rounded-sm h-full w-full p-2 overflow-hidden"
            >
              <div className="abolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />
              <p className="relative  font-semibold text-white">
                {board.title}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

BoardList.Skeleton = function SkeletonBoardList() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {[...Array(8)].map((_, i) => (
        <Skeleton key={i} className="aspect-video h-full w-full p-2" />
      ))}
    </div>
  );
};

export default BoardList;
