import z from "zod";

export const UpdateListPositionSchema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      position: z.number(),
      createdAt: z.date().nullable(),
      updatedAt: z.date().nullable(),
      /* card: z.array(
        z.object({
          id: z.string(),
          title: z.string(),
          position: z.number(),
          createdAt: z.date().nullable(),
          updatedAt: z.date().nullable(),
          description: z.string().nullable(),
          listId: z.string(),
        })
      ),*/
    })
  ),

  boardId: z.string(),
});
