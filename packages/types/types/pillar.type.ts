import { z } from "zod";
import { PillarSchema } from "../schema";
import { KpiTemplateInstance } from "./kpi.type";

export type CreatePillarTemplateInput = z.infer<typeof PillarSchema>;

export interface PillarInstance {
  id: string;
  name: string;
  pillar_value?: number; // Weight of the pillar (0-1)
  description?: string; // Description of the pillar
  percentage_target_achieved?: number;
  performance?: number;
  academic_year: number;
  created_by_user: string;
  created_at: string;
  updated_at: string;
  kpi_templates?: KpiTemplateInstance[];
}
