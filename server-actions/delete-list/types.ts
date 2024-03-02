import { NewList } from "@/lib/schema";
import { DeleteListSchema } from "./zod-schema";
import z from "zod";
import { ActionState } from "@/utilities/create-safe-action";

export type InputType = z.infer<typeof DeleteListSchema>;
export type ReturnType = ActionState<InputType, NewList>;
