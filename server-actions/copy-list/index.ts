"use server";
import { createSafeAction } from "@/utilities/create-safe-action";
import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { eq, and, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { CopyListSchema } from "./zod-schema";
import { card, list } from "@/lib/schema";
interface cardProps {
  title: string;
  description: string | null;
  listId: string;
  position: number;
}
const handler = async (inputData: InputType): Promise<ReturnType> => {
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

    // TO DO : FIND A WAY TO USE TRANSACTIONS
    //COPY LIST AND CARDS AS ONE SINGLE OPERATION
    /* await db.transaction(
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
        await tx.insert(card).values([...cards]);
        List = newList[0];
      },
      {
        isolationLevel: "read committed",
        accessMode: "read write",
        deferrable: true,
      }
    );*/
    const newList = await db
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
      await db.insert(card).values(cards);
    }

    List = newList[0];
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
