import { z } from "zod";


export const PillarSchema = z.object({
  pillar_name: z.string().min(1, "Name is required").max(255, "Name too long"),
  pillar_value: z.number().optional(),
  description: z.string().optional(),
});