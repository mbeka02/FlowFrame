"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopOverClose,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoreHorizontal, X } from "lucide-react";
import { ElementRef, useRef } from "react";
import { useAction } from "@/hooks/use-action";
import { deleteBoard } from "@/server-actions/delete-board";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export const BoardOptions = ({ id }: { id: string }) => {
  const closeRef = useRef<ElementRef<"button">>(null);
  const { exec, isLoading } = useAction(deleteBoard, {
    onError(error) {
      toast.error(error);
    },
  });
  const handleDelete = () => {
    exec({ id });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant="transparent">
          <MoreHorizontal className="h-4 w-4 " />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 py-3" side="bottom" align="start">
        <div className="text-sm font-medium text-neutral-600  text-center">
          Board actions
        </div>
        <PopOverClose>
          <Button
            size="sm"
            ref={closeRef}
            variant="ghost"
            className=" h-auto w-auto  focus-visible:ring-0 focus-visible:ring-offset-0 p-2 absolute  top-1 right-2  text-neutral-800  hover:text-rose-500  rounded-full "
          >
            <X className="h-4 w-4" />
          </Button>
        </PopOverClose>
        <Button
          variant="ghost"
          onClick={handleDelete}
          disabled={isLoading}
          className="text-sm rounded-none w-full h-auto p-2 px-5 hover:text-rose-600 justify-start font-normal "
        >
          Delete this board
        </Button>
      </PopoverContent>
    </Popover>
  );
};
