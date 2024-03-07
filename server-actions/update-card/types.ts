import { UpdateCardSchema } from "./zod-schema";
import { NewCard } from "@/lib/schema";
import z from "zod";
import type { ActionState } from "@/utilities/create-safe-action";

export type InputType = z.infer<typeof UpdateCardSchema>;
export type ReturnType = ActionState<InputType, NewCard>;
