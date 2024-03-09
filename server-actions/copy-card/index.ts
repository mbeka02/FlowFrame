"use server";
import { createSafeAction } from "@/utilities/create-safe-action";
import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { eq, and, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { CopyCardSchema } from "./zod-schema";
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
    const cardToCopy = await db.query.card.findFirst({
      where: and(eq(card.id, id), eq(card.listId, listId)),
    });
    if (!cardToCopy) {
      return {
        error: "Unable to duplicate the activity card",
      };
    }

    const lastCard = await db.query.card.findFirst({
      where: eq(card.listId, listId),
      orderBy: [desc(card.position)],
      columns: {
        position: true,
      },
    });
    const newPosition = lastCard ? lastCard.position + 1 : 1;

    Card = await db
      .insert(card)
      .values({
        title: `${cardToCopy.title}-Copy`,
        position: newPosition,
        listId: cardToCopy.listId,
        description: cardToCopy.description,
      })
      .returning();

    await createAuditLog({
      action: "CREATE",
      entityType: "CARD",
      entityTitle: Card[0].title,
      entityId: Card[0].id,
    });
  } catch (error) {
    return {
      error: "Something went wrong unable to duplicate this card",
    };
  }
  revalidatePath(`/board/${boardId}`);
  return { data: Card[0] };
};

export const copyCard = createSafeAction(CopyCardSchema, handler);
