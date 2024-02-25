import { DeleteBoardSchema } from "./zod-schema";
import z from "zod";

import type { NewBoard } from "@/lib/schema";

import { ActionState } from "@/utilities/create-safe-action";

export type InputType = z.infer<typeof DeleteBoardSchema>;
export type ReturnType = ActionState<InputType, NewBoard>;
