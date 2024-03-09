"use client";

import { ActivityItem } from "@/components/activity-item";
import { Skeleton } from "@/components/ui/skeleton";
import { NewAuditLog } from "@/lib/schema";
import { ActivityIcon } from "lucide-react";

export const Activities = ({ data }: { data: NewAuditLog[] }) => {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <ActivityIcon className=" h-5 w-5 mt-0.5 text-neutral-700" />
      <div className="w-full ">
        <p className="mb-2 font-semibold text-neutral-700">Activity</p>
        <ol className="mt-2  space-y-4">
          {data.map((item) => {
            return <ActivityItem key={item.id} item={item} />;
          })}
        </ol>
      </div>
    </div>
  );
};

Activities.Skeleton = function ActvitiesSkeleton() {
  return (
    <div className="flex items-start gap-x-3  w-full">
      <Skeleton className="w-6 h-6 bg-neutral bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="w-24 h-6 mb-2 bg-neutral-200" />
        <Skeleton className="w-full h-10 bg-neutral bg-neutral-200" />
      </div>
    </div>
  );
};
