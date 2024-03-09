import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { and, desc, eq } from "drizzle-orm";
import { auditLog } from "@/lib/schema";
export async function GET(
  req: Request,
  { params }: { params: { cardId: string } }
) {
  try {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const auditLogs = await db.query.auditLog.findMany({
      where: and(
        eq(auditLog.entityId, params.cardId),
        eq(auditLog.organizationId, orgId),
        eq(auditLog.entityType, "CARD")
      ),
      orderBy: [desc(auditLog.createdAt)],
      limit: 3,
    });
    return NextResponse.json(auditLogs);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
