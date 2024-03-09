import { auth, currentUser } from "@clerk/nextjs";
import {} from "@/lib/schema";
import { db } from "@/lib/db";
import { auditLog } from "@/lib/schema";

enum ENTITY_TYPE {
  "BOARD",
  "LIST",
  "CARD",
}

interface Props {
  entityId: string;
  entityType: "BOARD" | "LIST" | "CARD";
  entityTitle: string;
  action: "CREATE" | "UPDATE" | "DELETE";
}

export async function createAuditLog(props: Props) {
  try {
    const { orgId } = auth();
    const user = await currentUser();

    if (!user || !orgId) {
      throw new Error("User not found");
    }
    const { entityId, entityTitle, entityType, action } = props;
    await db.insert(auditLog).values({
      organizationId: orgId,
      action,
      entityId,
      entityType,
      entityTitle,
      userId: user.id,
      userImage: user.imageUrl,
      userName: user.firstName + " " + user.lastName,
    });
  } catch (error) {
    console.log("audit log error:", error);
  }
}
