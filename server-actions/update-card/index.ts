"use server";
import { createSafeAction } from "@/utilities/create-safe-action";
import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { UpdateCardSchema } from "./zod-schema";
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
  const { id, boardId, ...values } = inputData;
  let updatedCard;
  try {
    updatedCard = await db
      .update(card)
      .set({ ...values })
      .where(eq(card.id, id))
      .returning();

    await createAuditLog({
      action: "UPDATE",
      entityType: "CARD",
      entityTitle: updatedCard[0].title,
      entityId: updatedCard[0].id,
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong unable to update the card ",
    };
  }
  revalidatePath(`/board/${boardId}`);
  return { data: updatedCard[0] };
};

export const updateCard = createSafeAction(UpdateCardSchema, handler);
