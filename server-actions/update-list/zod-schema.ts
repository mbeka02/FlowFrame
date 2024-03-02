import z from "zod";

export const UpdateListSchema = z.object({
  title: z
    .string({
      invalid_type_error: "Title is required",
      required_error: "Title is required",
    })
    .min(2, {
      message: "Minimum length of 2 characters is required",
    }),
  //id of the list that the user wants to update
  id: z.string(),
  boardId: z.string(),
});
