import { z } from "zod";

export const KpiTemplateSchema = z.object({
  kpi_number: z.number().int().min(1),
  kpi_metric_name: z
    .string()
    .min(1, "Metric name is required")
    .max(255, "Metric name too long"),
  kpi_description: z.string().optional(),
  kpi_value: z.number().optional(),
  percentage_target_achieved: z.number().min(0).max(100).optional(),
  performance: z.number().min(0).max(100).optional(),
  data_provided_by: z.string().optional(),
  kpi_data: z.any(),
  academic_year: z.number().int(),
  kpi_calculated_metrics: z.any(),
});
