"use server";
import type { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { list, card } from "@/lib/schema";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/utilities/create-safe-action";
import { CreateCardSchema } from "./zod-schema";
import { and, desc, eq } from "drizzle-orm";
import { createAuditLog } from "@/utilities/create-audit-log";
const handler = async (inputData: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  //auth
  if (!userId || !orgId) {
    return {
      error: "unauthorized",
    };
  }
  const { title, listId, boardId } = inputData;

  let newCard;
  try {
    const fetchedList = await db
      .select({ field1: list.id })
      .from(list)
      .where(and(eq(list.id, listId), eq(list.boardId, boardId)));

    if (!fetchedList[0]) {
      return {
        error: "Unable to find the list",
      };
    }
    const { field1 } = fetchedList[0];
    const lastCard = await db.query.card.findFirst({
      columns: {
        position: true,
      },

      where: eq(card.listId, field1),
      orderBy: [desc(list.position)],
    });
    const newPosition = lastCard ? lastCard.position + 1 : 1;
    newCard = await db
      .insert(card)
      .values({
        title: title,
        position: newPosition,
        listId: listId,
      })
      .returning();

    await createAuditLog({
      action: "CREATE",
      entityType: "CARD",
      entityTitle: newCard[0].title,
      entityId: newCard[0].id,
    });
  } catch (error) {
    return {
      error: "something went wrong , unable to create the list",
    };
  }
  revalidatePath(`/board/${boardId}`);
  return { data: newCard[0] };
};

export const createCard = createSafeAction(CreateCardSchema, handler);
