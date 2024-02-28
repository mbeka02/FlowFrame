import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { list } from "@/lib/schema";
import { asc, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { ListContainer } from "./_components/list-container";

export default async function Page({
  params,
}: {
  params: {
    boardId: string;
  };
}) {
  const { orgId } = auth();
  if (!orgId) redirect("/org-select");

  const lists = await db.query.list.findMany({
    where: eq(list.boardId, params.boardId),
    with: {
      card: true,
    },
    orderBy: [asc(list.position)],
  });

  return (
    <div>
      <ListContainer boardId={params.boardId} data={lists} />
    </div>
  );
}
