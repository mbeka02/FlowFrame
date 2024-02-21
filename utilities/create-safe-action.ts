import z from "zod";

//generic errors from zod validation
//T is any generic obj
//each string in the arr is an error.
export type FieldErrors<T> = {
  [K in keyof T]?: string[];
};

export type ActionState<TInput, TOutput> = {
  fieldErrors?: FieldErrors<TInput>;
  //server error eg. a db issue
  error?: string | null;
  data?: TOutput;
};
//wrapper fn for any form action
export const createSafeAction = <TInput, TOutput>(
  schema: z.Schema,
  handler: (validatedData: TInput) => Promise<ActionState<TInput, TOutput>>
) => {
  return async (data: TInput): Promise<ActionState<TInput, TOutput>> => {
    const validationRes = schema.safeParse(data);
    if (!validationRes.success) {
      return {
        fieldErrors: validationRes.error.flatten()
          .fieldErrors as FieldErrors<TInput>,
      };
    }
    //return handler with the validated data
    return handler(validationRes.data);
  };
};
