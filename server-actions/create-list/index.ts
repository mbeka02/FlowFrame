"use server";
import type { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { board, list } from "@/lib/schema";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/utilities/create-safe-action";
import { CreateListSchema } from "./zod-schema";
import { and, desc, eq } from "drizzle-orm";
const handler = async (inputData: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  //auth
  if (!userId || !orgId) {
    return {
      error: "unauthorized",
    };
  }
  const { title, boardId } = inputData;

  let newList;
  try {
    const fetchedBoard = await db
      .select({ field1: board.id })
      .from(board)
      .where(and(eq(board.id, boardId), eq(board.orgId, orgId)));

    if (!fetchedBoard[0]) {
      return {
        error: "Unable to find the board",
      };
    }
    const { field1 } = fetchedBoard[0];
    const lastList = await db.query.list.findFirst({
      columns: {
        position: true,
      },

      where: eq(list.boardId, field1),
      orderBy: [desc(list.position)],
    });
    const newPostion = lastList ? lastList.position + 1 : 1;
    newList = await db
      .insert(list)
      .values({
        title: title,
        position: newPostion,
        boardId: boardId,
      })
      .returning();
  } catch (error) {
    return {
      error: "something went wrong , unable to create the list",
    };
  }
  revalidatePath(`/board/${boardId}`);
  return { data: newList[0] };
};

export const createList = createSafeAction(CreateListSchema, handler);
