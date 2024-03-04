import z from "zod";

export const CreateCardSchema = z.object({
  title: z
    .string({
      invalid_type_error: "Title is required",
      required_error: "Title is required",
    })
    .min(2, {
      message: "Minimum length of 2 characters is required",
    }),
  boardId: z.string(),
  listId: z.string(),
});
