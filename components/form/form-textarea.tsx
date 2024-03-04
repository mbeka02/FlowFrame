"use client";

import { KeyboardEventHandler, forwardRef } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { FormErrors } from "./form-errors";
import { useFormStatus } from "react-dom";

interface FormTextAreaProps {
  id: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  onBlur?: () => void;
  onClick?: () => void;
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement>;
  defaultValue?: string;
}

const FormTextArea = forwardRef<HTMLTextAreaElement, FormTextAreaProps>(
  (
    {
      id,
      label,
      placeholder,
      required,
      disabled,
      errors,
      className,
      defaultValue,
      onBlur,
      onClick,
      onKeyDown,
    },
    ref
  ) => {
    const { pending } = useFormStatus();
    return (
      <div className="space-y-2  w-full">
        <div className="space-y-1 w-full">
          {label ? (
            <Label
              htmlFor={id}
              className="text-neutral-700 text-xs font-semibold"
            >
              {label}
            </Label>
          ) : null}
          <Textarea
            ref={ref}
            onBlur={onBlur}
            onClick={onClick}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            name={id}
            id={id}
            disabled={pending || disabled}
            required={required}
            className={cn(
              "resize-none border-none focus-visible:ring-0 focus:ring-0 ring-0 focus-visible:ring-offset-0 outline-none shadow-sm",
              className
            )}
            aria-describedby={`${id}-error`}
            defaultValue={defaultValue}
          />
        </div>
        <FormErrors id={id} errors={errors} />
      </div>
    );
  }
);

FormTextArea.displayName = "FormTextArea";
export { FormTextArea };
