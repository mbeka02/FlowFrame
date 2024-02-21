import { useState, useCallback } from "react";
import type { ActionState, FieldErrors } from "@/utilities/create-safe-action";

type Action<TInput, TOutput> = (
  data: TInput
) => Promise<ActionState<TInput, TOutput>>;

interface useActionOptions<TOutput> {
  onSuccess?: (data: TOutput) => void;
  onComplete?: () => void;
  onError?: (error: string) => void;
}

export const useAction = <TInput, TOutput>(
  action: Action<TInput, TOutput>,
  options: useActionOptions<TOutput> = {}
) => {
  const [fieldErrors, setFieldErrors] = useState<
    FieldErrors<TInput> | undefined
  >(undefined);
  const [error, setError] = useState<string | undefined>();
  const [data, setData] = useState<TOutput | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const exec = useCallback(
    async (input: TInput) => {
      //set loading to true
      setIsLoading(true);
      try {
        const res = await action(input);
        if (!res) return;
        if (res.fieldErrors) {
          setFieldErrors(res.fieldErrors);
        }
        if (res.error) {
          setError(res.error);
          options.onError?.(res.error);
        }
        if (res.data) {
          setData(res.data);
          options.onSuccess?.(res.data);
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
        options.onComplete?.();
      }
    },
    [action, options]
  );

  return {
    exec,
    fieldErrors,
    error,
    isLoading,
    data,
  };
};
