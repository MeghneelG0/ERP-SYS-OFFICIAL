import { z } from "zod";
import { KpiTemplateSchema } from "../schema";

export type CreateKpiTemplateInput = z.infer<typeof KpiTemplateSchema>;

export interface KpiTemplateInstance {
  id: string;
  kpi_number: number;
  kpi_metric_name: string;
  kpi_description?: string;
  kpi_value?: number;
  percentage_target_achieved?: number;
  performance?: number;
  data_provided_by?: string;
  kpi_data: unknown;
  academic_year: number;
  kpi_calculated_metrics: unknown;
  created_by_user: string;
  created_at: string;
  updated_at: string;
}
