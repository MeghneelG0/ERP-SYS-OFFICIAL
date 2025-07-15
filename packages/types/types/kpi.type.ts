import { KpiStatus } from "../enums/enums";
import {
  KpiTemplateBaseSchema,
  KpiFormDataSchema,
  CreateKpiTemplateSchema,
  UpdateKpiTemplateSchema,
} from "../schema/kpi.schema";
import { z } from "zod";

export interface KpiTemplate extends z.infer<typeof KpiTemplateBaseSchema> {
  id: string;
  current_value?: number;
  kpi_status: KpiStatus;
  due_date?: Date;
  completed_date?: Date;
  comments?: string;
  form_responses?: Record<string, any>;
  created_by_qoc: string;
  created_at: Date;
  updated_at: Date;
}

export type FormData = z.infer<typeof KpiFormDataSchema>;

export interface FormField {
  id: string;
  type:
    | "text"
    | "number"
    | "email"
    | "textarea"
    | "select"
    | "checkbox"
    | "radio"
    | "date";
  label: string;
  required: boolean;
  placeholder?: string;
  options?: string[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
}

// Input types for frontend forms and API calls
export type CreateKpiTemplateInput = z.infer<typeof CreateKpiTemplateSchema>;
export type UpdateKpiTemplateInput = z.infer<typeof UpdateKpiTemplateSchema>;
