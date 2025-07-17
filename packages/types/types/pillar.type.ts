import { z } from "zod";
import { PillarSchema } from "../schema/pillar.schema";

export type CreatePillarTemplateInput = z.infer<typeof PillarSchema>;
