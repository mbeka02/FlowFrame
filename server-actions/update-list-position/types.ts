import { UpdateListPositionSchema } from "./zod-schema";
import { NewList } from "@/lib/schema";
import z from "zod";
import type { ActionState } from "@/utilities/create-safe-action";

export type InputType = z.infer<typeof UpdateListPositionSchema>;
export type ReturnType = ActionState<InputType, NewList[]>;
