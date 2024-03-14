import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { BOARDS_LIMIT } from "@/constants/boards";
import { eq } from "drizzle-orm";
import { orgLimit } from "@/lib/schema";

export async function incrementBoardCount() {
  const { orgId } = auth();
  //auth
  if (!orgId) {
    throw new Error("Unauthorized");
  }
  //get the current board count for the organization

  const res = await db.query.orgLimit.findFirst({
    where: eq(orgLimit.organizationId, orgId),
    columns: {
      count: true,
    },
  });
  if (res) {
    //update the count by 1
    const newCount = res.count + 1;
    await db.update(orgLimit).set({ count: newCount });
  } else {
    await db.insert(orgLimit).values({
      organizationId: orgId,
      count: 1,
    });
  }
}

export async function decrementBoardCount() {
  const { orgId } = auth();
  //auth
  if (!orgId) {
    throw new Error("Unauthorized");
  }
  //get the current board count for the organization

  const res = await db.query.orgLimit.findFirst({
    where: eq(orgLimit.organizationId, orgId),
    columns: {
      count: true,
    },
  });
  if (res) {
    //update the count by 1
    const newCount = res.count > 0 ? res.count - 1 : 0;
    await db.update(orgLimit).set({ count: newCount });
  } else {
    await db.insert(orgLimit).values({
      organizationId: orgId,
      count: 1,
    });
  }
}

export async function hasExceededLimit() {
  const { orgId } = auth();

  if (!orgId) {
    throw new Error("Unauthorized");
  }

  const organizationLimit = await db.query.orgLimit.findFirst({
    where: eq(orgLimit.organizationId, orgId),
    columns: {
      count: true,
    },
  });

  if (!organizationLimit || organizationLimit.count < BOARDS_LIMIT) {
    return true;
  } else {
    return false;
  }
}

export async function getAvailableCount() {
  const { orgId } = auth();

  if (!orgId) {
    return 0;
  }
  const organizationLimit = await db.query.orgLimit.findFirst({
    where: eq(orgLimit.organizationId, orgId),
  });

  if (!organizationLimit) {
    return 0;
  }
  return organizationLimit.count;
}
