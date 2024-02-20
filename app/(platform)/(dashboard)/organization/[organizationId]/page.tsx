//import { OrganizationSwitcher, auth } from "@clerk/nextjs";
import { countries } from "@/schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
export default async function Page() {
  //const { userId, orgId } = auth();
  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql);
  const data = await db.select().from(countries);
  return (
    <div className=" border-2 border-red-500 border-solid  hidden h-4 w-4">
      Org page
    </div>
  );
}
