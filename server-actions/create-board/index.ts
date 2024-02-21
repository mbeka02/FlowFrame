"use server";
import type { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { board } from "@/lib/schema";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/utilities/create-safe-action";
import { CreateBoardSchema } from "./zod-schema";
const handler = async (inputData: InputType): Promise<ReturnType> => {
  //check if user is authed
  const { userId } = auth();

  if (!userId) {
    return {
      error: "unauthorized",
    };
  }
  const { title } = inputData;

  let newBoard;
  try {
    newBoard = await db.insert(board).values({ title: title }).returning();
  } catch (error) {
    return {
      error: "something went wrong , unable to create the Board",
    };
  }
  revalidatePath(`/board/${newBoard[0].id}`);
  return { data: newBoard[0] };
};

export const createBoard = createSafeAction(CreateBoardSchema, handler);
