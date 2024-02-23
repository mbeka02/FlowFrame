import z from "zod";

/* FieldErrors<T>: This type represents validation errors for each field in an object of type T.
   ActionState<TInput, TOutput>: This type represents the state of an action, typically involving form submission or similar, 
   where TInput is the input data type and TOutput is the output data type. */
export type FieldErrors<T> = {
  [K in keyof T]?: string[];
};

export type ActionState<TInput, TOutput> = {
  fieldErrors?: FieldErrors<TInput>;
  error?: string | null;
  data?: TOutput;
};
/* A wrapper fn for any form action it takes two parameters:
 schema: A Zod schema used for validating input data. 
 handler: A function that takes validated input data and returns a promise of ActionState 
 representing the result of the action.
*/
export const createSafeAction = <TInput, TOutput>(
  schema: z.Schema,
  handler: (validatedData: TInput) => Promise<ActionState<TInput, TOutput>>
) => {
  return async (data: TInput): Promise<ActionState<TInput, TOutput>> => {
    /* Validate the input data using the provided schema */
    const validationRes = schema.safeParse(data);
    /*If validation fails, it returns a FieldErrors object containing the validation errors.
    If validation succeeds, it calls the handler function with the validated data and returns its result. */
    if (!validationRes.success) {
      return {
        fieldErrors: validationRes.error.flatten()
          .fieldErrors as FieldErrors<TInput>,
      };
    }

    return handler(validationRes.data);
  };
};
