import { z } from "zod";

// Pillar Template Schemas
export const PillarTemplateBaseSchema = z.object({
  pillar_name: z.string().min(1, "Name is required").max(255, "Name too long"),
  description: z.string().optional(),
});

export const CreatePillarTemplateSchema = PillarTemplateBaseSchema;
export const UpdatePillarTemplateSchema = PillarTemplateBaseSchema.partial();

