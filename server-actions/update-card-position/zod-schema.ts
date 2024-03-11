import z from "zod";

export const UpdateCardPositionSchema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      position: z.number(),
      createdAt: z.date().nullable(),
      updatedAt: z.date().nullable(),
    })
  ),

  boardId: z.string(),
  listId: z.string(),
});
