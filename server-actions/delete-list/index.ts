"use server";
import { createSafeAction } from "@/utilities/create-safe-action";
import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { DeleteListSchema } from "./zod-schema";
import { list } from "@/lib/schema";
import { createAuditLog } from "@/utilities/create-audit-log";

const handler = async (inputData: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  //auth
  if (!userId || !orgId) {
    return {
      error: "unauthorized",
    };
  }
  const { id, boardId } = inputData;
  let deletedList;
  try {
    deletedList = await db
      .delete(list)
      .where(and(eq(list.id, id), eq(list.boardId, boardId)))
      .returning();
    await createAuditLog({
      action: "DELETE",
      entityType: "LIST",
      entityTitle: deletedList[0].title,
      entityId: deletedList[0].id,
    });
  } catch (error) {
    return {
      error: "Something went wrong unable to delete the list",
    };
  }
  revalidatePath(`/board/${boardId}`);
  return { data: deletedList[0] };
  //redirect(`/board/${boardId}`);
};

export const deleteList = createSafeAction(DeleteListSchema, handler);
