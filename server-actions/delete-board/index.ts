"use server";
import { createSafeAction } from "@/utilities/create-safe-action";
import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { DeleteBoardSchema } from "./zod-schema";
import { board } from "@/lib/schema";
import { redirect } from "next/navigation";
import { createAuditLog } from "@/utilities/create-audit-log";
import { decrementBoardCount } from "@/utilities/org-limit";
const handler = async (inputData: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  //auth
  if (!userId || !orgId) {
    return {
      error: "unauthorized",
    };
  }
  const { id } = inputData;

  try {
    const deletedBoard = await db
      .delete(board)
      .where(and(eq(board.id, id), eq(board.orgId, orgId)))
      .returning();

    await createAuditLog({
      action: "DELETE",
      entityType: "BOARD",
      entityTitle: deletedBoard[0].title,
      entityId: deletedBoard[0].id,
    });
    await decrementBoardCount();
  } catch (error) {
    return {
      error: "Unable to delete this board ",
    };
  }
  revalidatePath(`/organization/${orgId}`);
  redirect(`/organization/${orgId}`);
};

export const deleteBoard = createSafeAction(DeleteBoardSchema, handler);
