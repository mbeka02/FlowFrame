import { ActivityItem } from "@/components/activity-item";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/lib/db";
import { auditLog } from "@/lib/schema";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export const ActivityList = async () => {
  const { orgId } = auth();

  if (!orgId) {
    redirect("/select-org");
  }

  const auditLogs = await db.query.auditLog.findMany({
    where: eq(auditLog.organizationId, orgId),
  });

  return (
    <ol className="space-y-4 mt-4">
      <p className="hidden last:block  text-xs text-center  text-muted-foreground ">
        No activity found in this organization
      </p>
      {auditLogs.map((log) => {
        return <ActivityItem key={log.id} item={log} />;
      })}
    </ol>
  );
};

ActivityList.Skeleton = function ActivityListSkeleton() {
  return (
    <div className="space-y-4 mt-4">
      {[
        ...Array(4).map((_, i) => (
          <Skeleton className="w-[80%] h-14" key={i} />
        )),
      ]}
    </div>
  );
};
