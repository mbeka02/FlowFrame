import { CreateCardSchema } from "./zod-schema";
import z from "zod";

import type { NewCard } from "@/lib/schema";

import { ActionState } from "@/utilities/create-safe-action";

export type InputType = z.infer<typeof CreateCardSchema>;
export type ReturnType = ActionState<InputType, NewCard>;
