import { z } from "zod";
import { KpiTemplateSchema } from "./kpi.schema";

export const PillarSchema = z.object({
  pillar_name: z.string().min(1, "Name is required").max(255, "Name too long"),
  pillar_value: z
    .number()
    .min(0, "Weight must be at least 0")
    .max(1, "Weight cannot exceed 1")
    .optional(),
  description: z.string().optional(),
  percentage_target_achieved: z.number().min(0).max(100).optional(),
  performance: z.number().min(0).max(100).optional(),
});
