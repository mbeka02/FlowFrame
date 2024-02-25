import z from "zod";

export const DeleteBoardSchema = z.object({
  //id of the board that the user wants to update
  id: z.string(),
});
