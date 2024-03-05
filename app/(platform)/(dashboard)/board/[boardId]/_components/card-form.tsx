"use client";

import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { FormTextArea } from "@/components/form/form-textarea";
import { FormButton } from "@/components/form/form-button";
import { useAction } from "@/hooks/use-action";
import { createCard } from "@/server-actions/create-card";
import { toast } from "sonner";
import { forwardRef, useRef, ElementRef, KeyboardEventHandler } from "react";
import { useParams } from "next/navigation";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

interface CardFormProps {
  isEditing: boolean;
  enableEditing: () => void;
  disableEditing: () => void;
  listId: string;
}
const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  ({ isEditing, enableEditing, disableEditing, listId }, ref) => {
    const params = useParams();
    const formRef = useRef<ElementRef<"form">>(null);
    const { exec, fieldErrors } = useAction(createCard, {
      onSuccess(data) {
        toast.success(`${data.title} has been created`);
        formRef.current?.reset();
        disableEditing();
      },
      onError(error) {
        toast.error(error);
      },
    });
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        disableEditing();
      }
    };
    useOnClickOutside(formRef, disableEditing);
    useEventListener("keydown", handleKeyDown);

    const handleTextareakeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (
      e
    ) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        formRef.current?.requestSubmit();
      }
    };
    const handleSubmit = (formData: FormData) => {
      const title = formData.get("title") as string;
      const listId = formData.get("listId") as string;
      const boardId = params.boardId as string;

      exec({ title, boardId, listId });
    };
    if (isEditing) {
      return (
        <form
          className="m-1 py-0.5 px-1 space-y-4 relative "
          action={handleSubmit}
        >
          <FormTextArea
            id="title"
            ref={ref}
            onKeyDown={handleTextareakeyDown}
            placeholder="enter a title for this card..."
            errors={fieldErrors}
          />
          <input hidden id="listId" name="listId" defaultValue={listId} />
          <div className="flex items-center gap-x-1">
            <FormButton variant="amber">Add card</FormButton>
            <Button
              size="sm"
              variant="ghost"
              className=" h-auto w-auto  focus-visible:ring-0 focus-visible:ring-offset-0 p-2 absolute  top-1 right-2  text-neutral-800  hover:text-rose-500  rounded-full "
            >
              <X className="h-4 w-4" onClick={disableEditing} />
            </Button>
          </div>
        </form>
      );
    }
    return (
      <div className="pt-2 px-2">
        <Button
          variant="ghost"
          size="sm"
          className="h-auto px-2 py-1.5 w-full justify-start  text-muted-foreground text-sm "
          onClick={enableEditing}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add a Card
        </Button>
      </div>
    );
  }
);

CardForm.displayName = "CardForm";

export { CardForm };
