"use client";
import { NewBoard } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import { ElementRef, useRef, useState } from "react";
import { FormInput } from "@/components/form/form-input";
import { FormButton } from "@/components/form/form-button";
import { useAction } from "@/hooks/use-action";
import { updateBoard } from "@/server-actions/update-board";
import { toast } from "sonner";

type BoardNavbarFormProps = {
  data: NewBoard;
};

export const BoardNavbarTitle = ({ data }: BoardNavbarFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);
  const [title, setTitle] = useState(data.title);
  const { exec, fieldErrors } = useAction(updateBoard, {
    onSuccess(data) {
      toast.success(`Board ${data.title} has been updated!`);
      setTitle(data.title);
      disableEditing();
    },
    onError(error) {
      toast.error(error);
    },
  });

  const disableEditing = () => {
    setIsEditing(false);
  };

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const handleSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    exec({ title, id: data.id });
  };
  const handleBlur = () => {
    formRef.current?.requestSubmit();
  };
  if (isEditing) {
    return (
      <form
        className="flex items-center gap-x-2"
        ref={formRef}
        action={handleSubmit}
      >
        <FormInput
          id="title"
          defaultValue={data.title}
          onBlur={handleBlur}
          className="h-7 py-1  text-lg px-[7px] bg-transparent font-semibold focus-visible:outline-none focus-visible:ring-transparent border-none"
          ref={inputRef}
          errors={fieldErrors}
        />
      </form>
    );
  }
  return (
    <div>
      <Button
        className="font-semibold text-lg h-auto w-auto p-1 px-2"
        variant="transparent"
        onClick={enableEditing}
      >
        {title}
      </Button>
    </div>
  );
};
