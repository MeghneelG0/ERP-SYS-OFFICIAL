import { z } from "zod";
import { KpiTemplateSchema } from "../schema";
import type { KpiFormData, KpiCalculatedMetrics } from "./kpi-form.type";

export type CreateKpiTemplateInput = z.infer<typeof KpiTemplateSchema>;

export interface CreateKpiTemplateData {
  pillar_template_id: string;
  kpi_number: number;
  kpi_metric_name: string;
  kpi_description?: string;
  kpi_value?: number;
  percentage_target_achieved?: number;
  performance?: number;
  data_provided_by?: string;
  kpi_data: KpiFormData;
  academic_year: number;
  kpi_calculated_metrics: KpiCalculatedMetrics;
}

export interface CreateKpiRequestData {
  kpi_number: number;
  kpi_metric_name: string;
  kpi_description?: string;
  kpi_value?: number;
  percentage_target_achieved?: number;
  performance?: number;
  data_provided_by?: string;
  kpi_data: Record<string, any>;
  academic_year: number;
  kpi_calculated_metrics: Record<string, any>;
}

export interface KpiTemplateInstance extends CreateKpiTemplateData {
  id: string;
  created_by_user: string;
  created_at: string;
  updated_at: string;
}
