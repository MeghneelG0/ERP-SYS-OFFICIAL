import { z } from "zod";

export const KpiFormDataSchema = z.object({
  fields: z.array(z.object({
    id: z.string(),
    type: z.enum(['text', 'number', 'email', 'textarea', 'select', 'checkbox', 'radio', 'date']),
    label: z.string(),
    required: z.boolean(),
    placeholder: z.string().optional(),
    options: z.array(z.string()).optional(),
    validation: z.object({
      min: z.number().optional(),
      max: z.number().optional(),
      pattern: z.string().optional(),
    }).optional(),
  })),
  layout: z.object({
    columns: z.number().min(1).max(4),
    spacing: z.number().min(0),
  }),
  settings: z.object({
    allowMultipleSubmissions: z.boolean(),
    requireAuthentication: z.boolean(),
  }),
});

export const KpiTemplateBaseSchema = z.object({
  pillar_template_id: z.string().min(1, "Pillar template ID is required"),
  kpi_name: z.string().min(1, "Name is required").max(255, "Name too long"),
  kpi_description: z.string().optional(),
  form_data: KpiFormDataSchema,
  target_value: z.number().positive().optional(),
});

export const CreateKpiTemplateSchema = KpiTemplateBaseSchema;
export const UpdateKpiTemplateSchema = KpiTemplateBaseSchema.partial();