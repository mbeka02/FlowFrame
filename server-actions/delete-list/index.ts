"use server";
import { createSafeAction } from "@/utilities/create-safe-action";
import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { DeleteListSchema } from "./zod-schema";
import { list } from "@/lib/schema";
import { redirect } from "next/navigation";

const handler = async (inputData: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  //auth
  if (!userId || !orgId) {
    return {
      error: "unauthorized",
    };
  }
  const { id, boardId } = inputData;

  try {
    await db
      .delete(list)
      .where(and(eq(list.id, id), eq(list.boardId, boardId)));
  } catch (error) {
    return {
      error: "Something went wrong unable to delete the list",
    };
  }
  revalidatePath(`/board/${boardId}`);
  return {};
  //redirect(`/board/${boardId}`);
};

export const deleteList = createSafeAction(DeleteListSchema, handler);
