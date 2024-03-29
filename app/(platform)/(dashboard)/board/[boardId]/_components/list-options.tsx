"use client";
import { useRef, ElementRef } from "react";
import { NewList } from "@/lib/schema";
import {
  PopOverClose,
  PopoverContent,
  PopoverTrigger,
  Popover,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, X } from "lucide-react";
import { useAction } from "@/hooks/use-action";
import { deleteList } from "@/server-actions/delete-list";
import { copyList } from "@/server-actions/copy-list";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { FormButton } from "@/components/form/form-button";

interface ListOptionsProps {
  onAddCard: () => void;
  val: NewList;
}
export const ListOptions = ({ val, onAddCard }: ListOptionsProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);
  const { exec: execDelete, isLoading } = useAction(deleteList, {
    onSuccess(data) {
      toast.success(`${data.title} has been deleted`);
    },
    onError(error) {
      toast.error(error);
    },
  });

  const { exec: execCopy } = useAction(copyList, {
    onSuccess(data) {
      toast.success(` ${data.title} has been copied`);
      closeRef.current?.click();
    },
    onError(error) {
      toast.error(error);
    },
  });

  const handleDelete = () => {
    execDelete({ id: val.id, boardId: val.boardId });
  };

  const handleCopy = () => {
    execCopy({ id: val.id, boardId: val.boardId });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant="ghost">
          <MoreHorizontal className="h-4 w-4 " />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        sideOffset={15}
        align="center"
        className="px-0 py-3"
      >
        <div className="text-sm font-medium text-center text-neutral-600 pb-4"></div>
        <PopOverClose asChild ref={closeRef}>
          <Button
            size="sm"
            variant="ghost"
            className=" h-auto w-auto  focus-visible:ring-0 focus-visible:ring-offset-0 p-2 absolute  top-1 right-2  text-neutral-800  hover:text-rose-500  rounded-full "
          >
            <X className="h-4 w-4" />
          </Button>
        </PopOverClose>
        <Button
          onClick={onAddCard}
          variant="ghost"
          className="w-full h-auto rounded-none p-2 px-5 justify-start font-normal text-sm "
        >
          Add card...
        </Button>
        <Separator />
        <form action={handleCopy}>
          <input className="hidden" defaultValue={val.boardId} name="boardId" />
          <input className="hidden" defaultValue={val.id} name="id" />
          <FormButton
            variant="ghost"
            className="w-full h-auto rounded-none p-2 px-5 justify-start font-normal text-sm "
          >
            Copy this list...
          </FormButton>
        </form>
        <Separator />
        <Button
          variant="ghost"
          onClick={handleDelete}
          disabled={isLoading}
          className="text-sm rounded-none w-full h-auto p-2 px-5 hover:text-rose-600 justify-start font-normal "
        >
          Delete this list ...
        </Button>
      </PopoverContent>
    </Popover>
  );
};
