import z from "zod";

export const CreateListSchema = z.object({
  title: z
    .string({
      invalid_type_error: "Title is required",
      required_error: "Title is required",
    })
    .min(2, {
      message: "Minimum length of 2 characters is required",
    }),
  //id of the board that the list is in
  boardId: z.string(),
});
