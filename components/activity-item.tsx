import { format } from "date-fns";

import { NewAuditLog } from "@/lib/schema";
import { generateLogMessage } from "@/utilities/generate-log-message";
import { Avatar, AvatarImage } from "./ui/avatar";

export const ActivityItem = ({ item }: { item: NewAuditLog }) => {
  

  return (
    <li className="flex items-center gap-x-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={item.userImage} />
      </Avatar>
      <div className="flex flex-col space-y-0.5">
        <p className="text-sm text-muted-foreground ">
          <span className="font-semibold lowercase text-neutral-700">
            {item.userName}
          </span>{" "}
          {generateLogMessage(item)}
        </p>
        {item.createdAt && (
          <p className="text-xs text-muted-foreground">
            {format(new Date(item.createdAt), "MMM d , yyyy 'at' h:mm a")}
          </p>
        )}
      </div>
    </li>
  );
};
