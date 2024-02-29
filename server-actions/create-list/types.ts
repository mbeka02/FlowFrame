import { CreateListSchema } from "./zod-schema";
import z from "zod";

import type { NewList } from "@/lib/schema";

import { ActionState } from "@/utilities/create-safe-action";

export type InputType = z.infer<typeof CreateListSchema>;
export type ReturnType = ActionState<InputType, NewList>;
