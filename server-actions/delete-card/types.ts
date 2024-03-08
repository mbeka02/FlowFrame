import { NewCard } from "@/lib/schema";
import { DeleteCardSchema } from "./zod-schema";
import z from "zod";
import { ActionState } from "@/utilities/create-safe-action";

export type InputType = z.infer<typeof DeleteCardSchema>;
export type ReturnType = ActionState<InputType, NewCard>;
