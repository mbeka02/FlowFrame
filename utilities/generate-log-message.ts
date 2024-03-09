import { NewAuditLog } from "@/lib/schema";

export const generateLogMessage = (log: NewAuditLog) => {
  const { action, entityTitle, entityType } = log;

  switch (action) {
    case "CREATE":
      return `created ${entityType.toLowerCase()} "${entityTitle}" `;
    case "DELETE":
      return `deleted ${entityType.toLowerCase()} "${entityTitle}" `;
    case "UPDATE":
      return `updated ${entityType.toLowerCase()} "${entityTitle}" `;
    default:
      return `unknown action ${entityType.toLowerCase()} "${entityTitle}" `;
  }
};
