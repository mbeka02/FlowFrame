import z from "zod";

export const CopyCardSchema = z.object({
  id: z.string(),
  listId: z.string(),
  boardId: z.string(),
});
