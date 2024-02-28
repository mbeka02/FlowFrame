"use client";

import { useState } from "react";
import { ListWrapper } from "./list-wrapper";
import { useFormStatus } from "react-dom";
import { Plus } from "lucide-react";
import { FormInput } from "@/components/form/form-input";
import { FormButton } from "@/components/form/form-button";

export const ListForm = ({ boardId }: { boardId: string }) => {
  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    setIsEditing(true);
  };

  if (isEditing) {
    return (
      <form className="w-full p-3 rounded-md bg-white space-y-4 shadow-md">
        <FormInput id="title" label="title" />
        <FormButton>Add</FormButton>
      </form>
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
