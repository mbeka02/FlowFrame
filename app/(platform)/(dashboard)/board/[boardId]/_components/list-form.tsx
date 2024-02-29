"use client";

import { ElementRef, useRef, useState } from "react";
import { ListWrapper } from "./list-wrapper";
import { useFormStatus } from "react-dom";
import { Plus, X } from "lucide-react";
import { FormInput } from "@/components/form/form-input";
import { FormButton } from "@/components/form/form-button";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { useAction } from "@/hooks/use-action";
import { Button } from "@/components/ui/button";
import { createList } from "@/server-actions/create-list";
import { toast } from "sonner";

export const ListForm = ({ boardId }: { boardId: string }) => {
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);
  const { pending } = useFormStatus();
  const { exec, fieldErrors } = useAction(createList, {
    onSuccess(data) {
      toast.success("list created");
    },
    onError(error) {
      toast.error(error);
    },
  });

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };
  const disableEditing = () => {
    setIsEditing(false);
  };
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  const handleSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = formData.get("boardId") as string;
    exec({ title, boardId });
  };
  //close form when esc key is pressed and also when onClick evt occurs outside
  useEventListener("keydown", onKeyDown);
  useOnClickOutside([formRef], disableEditing);
  if (isEditing) {
    return (
      <ListWrapper>
        <form
          className="w-full p-3 rounded-md bg-white space-y-4 shadow-md"
          ref={formRef}
          action={handleSubmit}
        >
          <FormInput
            id="title"
            label="title"
            ref={inputRef}
            className="text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition"
            placeholder="...enter the list title"
            disabled={pending}
            errors={fieldErrors}
          />
          <input className="hidden" value={boardId} name="boardId" />
          <div className="flex items-center gap-x-1 relative">
            <FormButton variant="amber">add</FormButton>
            <Button
              onClick={disableEditing}
              size="sm"
              variant="ghost"
              className=" h-auto w-auto  focus-visible:ring-0 focus-visible:ring-offset-0 p-2 absolute  top-1 right-2  text-neutral-800  hover:text-rose-500  rounded-full "
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </ListWrapper>
    );
  }
  return (
    <ListWrapper>
      <button
        onClick={enableEditing}
        className="w-full rounded-md bg-white/80 hover:bg-white/50  transition p-3 flex items-center font-medium text-sm"
      >
        <Plus />
        Add a list
      </button>
    </ListWrapper>
  );
};
