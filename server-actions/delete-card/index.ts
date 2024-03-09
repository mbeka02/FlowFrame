"use server";
import { createSafeAction } from "@/utilities/create-safe-action";
import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { DeleteCardSchema } from "./zod-schema";
import { card } from "@/lib/schema";
import { createAuditLog } from "@/utilities/create-audit-log";
const handler = async (inputData: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  //auth
  if (!userId || !orgId) {
    return {
      error: "unauthorized",
    };
  }
  const { id, boardId, listId } = inputData;
  let Card;
  try {
    Card = await db
      .delete(card)
      .where(and(eq(card.id, id), eq(card.listId, listId)))
      .returning();
    await createAuditLog({
      action: "DELETE",
      entityType: "CARD",
      entityTitle: Card[0].title,
      entityId: Card[0].id,
    });
  } catch (error) {
    return {
      error: "unable to delete this card",
    };
  }
  revalidatePath(`/board/${boardId}`);
  return { data: Card[0] };
};

export const deleteCard = createSafeAction(DeleteCardSchema, handler);
