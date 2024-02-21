"use client";
import { Input } from "@/components/ui/input";
import { useFormStatus } from "react-dom";

const FormInput = ({
  errors,
}: {
  errors:
    | {
        title?: string[] | undefined;
      }
    | undefined;
}) => {
  const { pending } = useFormStatus();

  return (
    <div>
      <Input
        id="title"
        name="title"
        required
        placeholder="Enter the board title"
        disabled={pending}
      />
      {errors?.title?.map((error) => {
        return (
          <p key={error} className=" text-rose-600">
            {error}
          </p>
        );
      })}
    </div>
  );
};

export default FormInput;
