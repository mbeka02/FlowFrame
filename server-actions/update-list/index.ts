"use server";
import { createSafeAction } from "@/utilities/create-safe-action";
import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { UpdateListSchema } from "./zod-schema";
import { list } from "@/lib/schema";

const handler = async (inputData: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  //auth
  if (!userId || !orgId) {
    return {
      error: "unauthorized",
    };
  }
  const { title, id, boardId } = inputData;
  let updatedList;
  try {
    updatedList = await db
      .update(list)
      .set({ title: title })
      .where(and(eq(list.id, id), eq(list.boardId, boardId)))
      .returning();
  } catch (error) {
    return {
      error: "Something went wrong unable to update the board title",
    };
  }
  revalidatePath(`/board/${boardId}`);
  return { data: updatedList[0] };
};

export const updateList = createSafeAction(UpdateListSchema, handler);
