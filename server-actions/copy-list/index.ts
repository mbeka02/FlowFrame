"use server";
import { createSafeAction } from "@/utilities/create-safe-action";
import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { eq, and, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { CopyListSchema } from "./zod-schema";
import { card, list } from "@/lib/schema";
import { drizzle } from "drizzle-orm/neon-serverless";
import { Client } from "@neondatabase/serverless";
import * as schema from "@/lib/schema";
const handler = async (inputData: InputType): Promise<ReturnType> => {
  const client = new Client(process.env.DATABASE_URL);
  await client.connect();
  const dbInstance = drizzle(client, { schema });
  const { userId, orgId } = auth();
  //auth
  if (!userId || !orgId) {
    return {
      error: "unauthorized",
    };
  }
  const { id, boardId } = inputData;
  let List;
  try {
    const listToCopy = await db.query.list.findFirst({
      where: and(eq(list.id, id), eq(list.boardId, boardId)),
      with: {
        card: true,
      },
    });
    if (!listToCopy) {
      return {
        error: "No list was found",
      };
    }

    const lastList = await db.query.list.findFirst({
      where: eq(list.boardId, boardId),
      orderBy: [desc(list.position)],
      columns: {
        position: true,
        title: true,
      },
    });
    const newPosition = lastList ? lastList.position + 1 : 1;

    //COPY LIST AND CARDS AS ONE SINGLE OPERATION
    await dbInstance.transaction(
      async (tx) => {
        const newList = await tx
          .insert(list)
          .values({
            title: `${listToCopy.title}-Copy`,
            position: newPosition,
            boardId: listToCopy.boardId,
          })
          .returning();
        const cards = listToCopy.card.map((card) => ({
          title: card.title,
          description: card.description,
          listId: newList[0].id,
          position: card.position,
        }));
        if (cards.length > 0) {
          await tx.insert(card).values([...cards]);
        }
        List = newList[0];
      },
      {
        isolationLevel: "read committed",
        accessMode: "read write",
        deferrable: true,
      }
    );
  } catch (error) {
    return {
      error: "Something went wrong unable to copy the list",
    };
  }
  revalidatePath(`/board/${boardId}`);
  return { data: List };
  //redirect(`/board/${boardId}`);
};

export const copyList = createSafeAction(CopyListSchema, handler);
