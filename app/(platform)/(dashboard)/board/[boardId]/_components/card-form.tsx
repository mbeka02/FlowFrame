"use client";

import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { forwardRef } from "react";
import { FormTextArea } from "@/components/form/form-textarea";
import { FormButton } from "@/components/form/form-button";

interface CardFormProps {
  isEditing: boolean;
  enableEditing: () => void;
  disableEditing: () => void;
  listId: string;
}
const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  ({ isEditing, enableEditing, disableEditing, listId }, ref) => {
    if (isEditing) {
      return (
        <form className="m-1 py-0.5 px-1 space-y-4">
          <FormTextArea
            id="title"
            ref={ref}
            onBlur={() => {}}
            onKeyDown={() => {}}
            placeholder="enter a title for this card..."
          />
          <input hidden id="listId" name="listId" defaultValue={listId} />
          <div className="flex items-center gap-x-1">
            <FormButton>Add card</FormButton>
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
