import { card } from "@/drizzle/schema";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { cardId: string } }
) {
  try {
    const { userId, orgId } = auth();
    if (!userId || !orgId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const singleCard = await db.query.card.findFirst({
      where: eq(card.id, params.cardId),
      with: {
        list: {
          columns: {
            title: true,
          },
        },
      },
    });
    return NextResponse.json(singleCard);
  } catch (error) {
    //  console.log(error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
