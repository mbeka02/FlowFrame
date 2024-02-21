"use client";

import { createBoard } from "@/server-actions/create-board";
import FormInput from "@/components/form/form-input";
import FormButton from "@/components/form/form-button";
import { useAction } from "@/hooks/use-action";
const Form = () => {
  const { exec, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (err) => console.error(err),
  });
  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    exec({ title });
  };
  return (
    <form action={onSubmit}>
      <FormInput id="title" label="Board Title" errors={fieldErrors} />
      <FormButton>Save</FormButton>
    </form>
  );
};

export default Form;
