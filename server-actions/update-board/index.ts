"use server";
import { createSafeAction } from "@/utilities/create-safe-action";
import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { UpdateBoardSchema } from "./zod-schema";
import { board } from "@/lib/schema";

const handler = async (inputData: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  //auth
  if (!userId || !orgId) {
    return {
      error: "unauthorized",
    };
  }
  const { title, id } = inputData;
  let updatedBoard;
  try {
    updatedBoard = await db
      .update(board)
      .set({ title: title })
      .where(and(eq(board.id, id), eq(board.orgId, orgId)))
      .returning();
  } catch (error) {
    return {
      error: "Something went wrong unable to update the board title",
    };
  }
  revalidatePath(`/board/${updatedBoard[0].id}`);
  return { data: updatedBoard[0] };
};

export const updateBoard = createSafeAction(UpdateBoardSchema, handler);
