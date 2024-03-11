"use server";
import { createSafeAction } from "@/utilities/create-safe-action";
import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { eq, and, SQL, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { UpdateListPositionSchema } from "./zod-schema";
import { list } from "@/lib/schema";

import { inArray } from "drizzle-orm";

const handler = async (inputData: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  //auth
  if (!userId || !orgId) {
    return {
      error: "unauthorized",
    };
  }
  const { items, boardId } = inputData;
  let updatedLists;
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

    updatedLists = await db
      .update(list)
      .set({ position: finalSql })
      .where(and(inArray(list.id, ids), eq(list.boardId, boardId)))
      .returning();
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong unable to update the list positions",
    };
  }
  revalidatePath(`/board/${boardId}`);
  return { data: updatedLists };
};

export const updateListPosition = createSafeAction(
  UpdateListPositionSchema,
  handler
);
