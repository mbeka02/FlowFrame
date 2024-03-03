//  A custom React hook called useAction, designed to handle asynchronous actions typically associated with form submissions or other similar operations.

/* The hook imports useState and useCallback from React.
It also imports types ActionState and FieldErrors from the create-safe-action utility  @/utilities/create-safe-action. */
import { useState, useCallback } from "react";
import type { ActionState, FieldErrors } from "@/utilities/create-safe-action";

type Action<TInput, TOutput> = (
  data: TInput
) => Promise<ActionState<TInput, TOutput>>;

//An interface defining optional callback functions for handling the result of the action. It includes onSuccess, onComplete, and onError.
interface useActionOptions<TOutput> {
  onSuccess?: (data: TOutput) => void;
  onComplete?: () => void;
  onError?: (error: string) => void;
}
/*This custom hook takes two parameters:
     action: An asynchronous function representing the action to be performed.
     options: Optional configuration object containing callback functions for different action states. */

export const useAction = <TInput, TOutput>(
  action: Action<TInput, TOutput>,
  options: useActionOptions<TOutput> = {}
) => {
  /*fieldErrors: Holds any validation errors associated with the action.
      error: Holds any general error messages returned from the action.
      data: Holds the successful data returned from the action.
     isLoading: Indicates whether the action is currently loading. */
  const [fieldErrors, setFieldErrors] = useState<
    FieldErrors<TInput> | undefined
  >(undefined);
  const [error, setError] = useState<string | undefined>();
  const [data, setData] = useState<TOutput | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  //memoized fn
  const exec = useCallback(
    async (input: TInput) => {
      //set loading to true
      setIsLoading(true);
      try {
        const res = await action(input);
        if (!res) return;

        setFieldErrors(res.fieldErrors);

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
