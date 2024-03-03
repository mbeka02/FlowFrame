import { NewList } from "@/lib/schema";
import { CopyListSchema } from "./zod-schema";
import z from "zod";
import { ActionState } from "@/utilities/create-safe-action";

export type InputType = z.infer<typeof CopyListSchema>;
export type ReturnType = ActionState<InputType, NewList>;
