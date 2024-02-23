"use client";
import { Input } from "@/components/ui/input";
import FormErrors from "./form-errors";
import { forwardRef } from "react";
import { useFormStatus } from "react-dom";
import { Label } from "../ui/label";

import { cn } from "@/lib/utils";

type InputProps = {
  id: string;
  label?: string;
  name?: string;
  placeholder?: string;
  errors?: Record<string, string[] | undefined>;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  defaultValue?: string;
  onBlur?: () => void;
};

const FormInput = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      type,
      placeholder,
      disabled,
      required,
      errors,
      className,
      defaultValue = "",
      onBlur,
    },
    ref
  ) => {
    const { pending } = useFormStatus();

    return (
      <div className="space-y-2">
        <div className="space-y-1">
          {label ? (
            <Label
              htmlFor={id}
              className="text-xs text-neutral-700 font-semibold"
            >
              {label}
            </Label>
          ) : null}
          <Input
            id={id}
            name={id}
            defaultValue={defaultValue}
            required={required}
            ref={ref}
            placeholder={placeholder}
            disabled={pending || disabled}
            onBlur={onBlur}
            className={cn("text-sm px-2 py-1 h-7", className)}
            aria-describedby={`${id}-error`}
            type={type}
          />
        </div>
        <FormErrors id={id} errors={errors} />
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export { FormInput };
