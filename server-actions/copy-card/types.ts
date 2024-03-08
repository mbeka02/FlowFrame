import { NewCard } from "@/lib/schema";
import { CopyCardSchema } from "./zod-schema";
import z from "zod";
import { ActionState } from "@/utilities/create-safe-action";

export type InputType = z.infer<typeof CopyCardSchema>;
export type ReturnType = ActionState<InputType, NewCard>;
