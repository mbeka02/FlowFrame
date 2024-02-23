"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopOverClose,
} from "../ui/popover";
import { useAction } from "@/hooks/use-action";
import { createBoard } from "@/server-actions/create-board";
import { FormButton } from "./form-button";
import { FormInput } from "./form-input";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { toast } from "sonner";
import { FormPicker } from "./form-picker";

interface FormPopoverProps {
  align?: "start" | "center" | "end";
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  sideOffset?: number;
}

const FormPopover = ({
  children,
  align,
  side = "bottom",
  sideOffset,
}: FormPopoverProps) => {
  const { exec, fieldErrors } = useAction(createBoard, {
    onError: (err) => {
      console.log(err);
      //The error returned to the client is a string so this is safe to use.
      toast.error(err);
    },
    onSuccess: (data) => {
      toast.success("Board created");
    },
  });
  const handleSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    exec({ title });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        side={side}
        sideOffset={sideOffset}
        className="w-80 pt-3"
      >
        <div className="text-center text-sm text-neutral-600  ">
          Create board
        </div>
        <PopOverClose asChild>
          <Button
            size="sm"
            variant="ghost"
            className=" h-auto w-auto  focus-visible:ring-0 focus-visible:ring-offset-0 p-2 absolute  top-2 right-2  text-neutral-500 hover:text-white hover:bg-rose-500  rounded-full "
          >
            <X className="h-4 w-4" />
          </Button>
        </PopOverClose>
        <form className="space-y-4" action={handleSubmit}>
          <FormPicker errors={fieldErrors} id="image" />
          <FormInput
            id="title"
            label=" Board title"
            className=""
            type="text"
            errors={fieldErrors}
          />
          <FormButton className="w-full">Create</FormButton>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default FormPopover;
