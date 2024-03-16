"use server";
import type { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { board } from "@/lib/schema";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/utilities/create-safe-action";
import { CreateBoardSchema } from "./zod-schema";
import { createAuditLog } from "@/utilities/create-audit-log";
import { incrementBoardCount, hasExceededLimit } from "@/utilities/org-limit";
const handler = async (inputData: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  //auth
  if (!userId || !orgId) {
    return {
      error: "unauthorized",
    };
  }

  const underTierLimit = await hasExceededLimit();
  if (!underTierLimit) {
    return {
      error:
        "You have exceeded the limits for this organization , upgrade your plan.",
    };
  }

  const { title, image } = inputData;
  const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] =
    image.split("|");

  if (
    !imageId ||
    !imageThumbUrl ||
    !imageFullUrl ||
    !imageLinkHTML ||
    !imageUserName
  ) {
    return {
      error: "Unable to create the board due to missing image details",
    };
  }

  let newBoard;
  try {
    newBoard = await db
      .insert(board)
      .values({
        title: title,
        orgId: orgId,
        imageId: imageId,
        imageThumbUrl: imageThumbUrl,
        imageFullUrl: imageFullUrl,
        imageLinkHTML: imageLinkHTML,
        imageUserName: imageUserName,
      })
      .returning();

    await createAuditLog({
      action: "CREATE",
      entityType: "BOARD",
      entityTitle: newBoard[0].title,
      entityId: newBoard[0].id,
    });

    await incrementBoardCount();
  } catch (error) {
    return {
      error: "something went wrong , unable to create the Board",
    };
  }
  revalidatePath(`/board/${newBoard[0].id}`);
  return { data: newBoard[0] };
};

export const createBoard = createSafeAction(CreateBoardSchema, handler);
