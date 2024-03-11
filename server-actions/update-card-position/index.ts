"use server";
import { createSafeAction } from "@/utilities/create-safe-action";
import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { SQL, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { UpdateCardPositionSchema } from "./zod-schema";
import { card } from "@/lib/schema";

import { inArray } from "drizzle-orm";

const handler = async (inputData: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  //auth
  if (!userId || !orgId) {
    return {
      error: "unauthorized",
    };
  }
  const { items, boardId, listId } = inputData;
  let updatedCards;

  try {
    if (items.length === 0) {
      return {
        error: "Something went wrong",
      };
    }
    const sqlChunks: SQL[] = [];
    const ids: string[] = [];
    sqlChunks.push(sql`(case`);
    for (const item of items) {
      sqlChunks.push(
        sql`WHEN id = ${item.id} THEN ${item.position} :: integer`
      );
      ids.push(item.id);
    }
    sqlChunks.push(sql`end)`);

    const finalSql: SQL = sql.join(sqlChunks, sql.raw(" "));

    updatedCards = await db
      .update(card)
      .set({ position: finalSql, listId: listId })
      .where(inArray(card.id, ids))
      .returning();

    /* items.map((item) =>
      db
        .update(list)
        .set({ position: item.position })
        .where(and(eq(list.id, id), eq(list.boardId, boardId)))
    );*/
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong unable to update the card positions",
    };
  }
  revalidatePath(`/board/${boardId}`);
  return { data: updatedCards };
};

export const updateCardPosition = createSafeAction(
  UpdateCardPositionSchema,
  handler
);
