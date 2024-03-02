"use client";
import { useState, useEffect, useRef, ElementRef } from "react";
import { FormInput } from "@/components/form/form-input";
import { useAction } from "@/hooks/use-action";
import { updateList } from "@/server-actions/update-list";

import { NewList } from "@/lib/schema";

import { toast } from "sonner";
import { useEventListener } from "usehooks-ts";
import { ListOptions } from "./list-options";

interface ListHeaderProps {
  val: NewList;
}
export const ListHeader = ({ val }: ListHeaderProps) => {
  const [title, setTitle] = useState(val.title);
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const { exec, fieldErrors } = useAction(updateList, {
    onSuccess(data) {
      console.log(data);
      setTitle(data.title);
      toast.success(`title has been updated to ${data.title}`);
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
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    //no need to update
    if (title === val.title) {
      return disableEditing();
    }
    exec({ title, id, boardId });
  };

  const handleBlur = () => {
    formRef.current?.requestSubmit();
  };
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      formRef.current?.requestSubmit();
      disableEditing();
    }
  };
  useEventListener("keydown", onKeyDown);
  return (
    <div className="pt-2 px-2 text-sm font-semibold flex justify-between items-start- gap-x-2">
      {isEditing ? (
        <form className="flex-1 px-2 pt-2" ref={formRef} action={handleSubmit}>
          <input id="id" name="id" defaultValue={val.id} hidden />
          <input
            id="boardId"
            name="boardId"
            defaultValue={val.boardId}
            hidden
          />
          <FormInput
            id="title"
            defaultValue={title}
            onBlur={handleBlur}
            className="h-7 py-1 px-[7px]  text-sm hover:border-input  bg-transparent font-medium focus:border-input transition truncate focus:bg-white border-transparent"
            ref={inputRef}
            errors={fieldErrors}
          />
          <button type="submit" hidden></button>
        </form>
      ) : (
        <div
          className="pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2"
          onClick={enableEditing}
        >
          <div className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent">
            {val.title}
          </div>
        </div>
      )}
      <ListOptions val={val} onAddCard={() => {}} />
    </div>
  );
};
