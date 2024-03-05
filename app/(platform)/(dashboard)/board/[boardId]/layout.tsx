import { auth } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";

import { board } from "@/lib/schema";
import { db } from "@/lib/db";
import { eq, and } from "drizzle-orm";
import BoardNavbar from "./_components/board-navbar";
export async function generateMetadata({
  params,
}: {
  params: { boardId: string };
}) {
  const { orgId } = auth();
  if (!orgId) {
    return {
      title: "Board",
    };
  }
  const Board = await db.query.board.findFirst({
    where: and(eq(board.id, params.boardId), eq(board.orgId, orgId)),
  });
  return {
    title: Board?.title || "Board",
  };
}
export default async function BoardIdLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { boardId: string };
}) {
  const { orgId } = auth();
  if (!orgId) {
    redirect("/select-org");
  }

  const Board = await db.query.board.findFirst({
    where: and(eq(board.id, params.boardId), eq(board.orgId, orgId)),
  });

  if (!Board) {
    //trigger 404
    notFound();
  }

  return (
    <div
      style={{ backgroundImage: `url(${Board?.imageFullUrl})` }}
      className=" bg-no-repeat bg-cover bg-center  relative h-full"
    >
      <BoardNavbar data={Board} />
      <div className="bg-black/10 absolute inset-0" />
      <main className="relative pt-32 justify-self-center  h-full">
        {children}
      </main>
    </div>
  );
}
