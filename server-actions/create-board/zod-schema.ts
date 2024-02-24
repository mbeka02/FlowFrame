import z from "zod";

export const CreateBoardSchema = z.object({
  title: z
    .string({
      invalid_type_error: "Title is required",
      required_error: "Title is required",
    })
    .min(2, {
      message: "Minimum length of 2 characters is required",
    }),
  image: z.string({
    required_error: "An image is required",
    invalid_type_error: "An image is required",
  }),
});
