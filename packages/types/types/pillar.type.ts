import { PillarStatus } from "../enums/enums";
import {
  PillarTemplateBaseSchema,
  CreatePillarTemplateSchema,
  UpdatePillarTemplateSchema,
} from "../schema/pillar.schema";
import { z } from "zod";

export interface PillarTemplate
  extends z.infer<typeof PillarTemplateBaseSchema> {
  id: string;
  status: PillarStatus;
  created_by_qac: string;
  created_at: Date;
  updated_at: Date;
}

// Input types for frontend forms and API calls
export type CreatePillarTemplateInput = z.infer<
  typeof CreatePillarTemplateSchema
>;
export type UpdatePillarTemplateInput = z.infer<
  typeof UpdatePillarTemplateSchema
>;
