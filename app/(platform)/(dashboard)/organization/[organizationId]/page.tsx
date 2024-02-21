//import { OrganizationSwitcher, auth } from "@clerk/nextjs";

import { board } from "@/lib/schema";
import { db } from "@/lib/db";
import Form from "./form";

export default async function Page() {
  const boards = await db.select().from(board);
  return (
    <div className="flex flex-col space-y-4">
      <Form />
      {boards.map((board) => (
        <div key={board.id}>{board.title}</div>
      ))}
    </div>
  );
}
