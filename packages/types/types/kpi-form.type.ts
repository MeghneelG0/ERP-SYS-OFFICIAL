/**
 * Shared types for KPI form elements
 * Used by both frontend form builder and backend KPI templates
 */

/**
 * Supported form element types
 */
export type FormElementType =
  | "text"
  | "textarea"
  | "number"
  | "select"
  | "checkbox"
  | "radio"
  | "date"
  | "email"
  | "file";

/**
 * Form element instance structure
 * Matches the frontend FormElementInstance interface
 */
export interface FormElementInstance {
  id: string;
  type: FormElementType;
  attributes: Record<string, any>;
}

/**
 * Base attributes that all form elements share
 */
export interface BaseElementAttributes {
  label: string;
  required: boolean;
  placeholder?: string;
  description?: string;
}

/**
 * Text input element attributes
 */
export interface TextElementAttributes extends BaseElementAttributes {
  minLength?: number;
  maxLength?: number;
  pattern?: string;
}

/**
 * Textarea element attributes
 */
export interface TextareaElementAttributes extends BaseElementAttributes {
  rows?: number;
  maxLength?: number;
}

/**
 * Number input element attributes
 */
export interface NumberElementAttributes extends BaseElementAttributes {
  min?: number;
  max?: number;
  step?: number;
  decimals?: number;
}

/**
 * Select/dropdown element attributes
 */
export interface SelectElementAttributes extends BaseElementAttributes {
  options: Array<{
    label: string;
    value: string | number;
  }>;
  multiple?: boolean;
}

/**
 * Checkbox element attributes
 */
export interface CheckboxElementAttributes extends BaseElementAttributes {
  defaultChecked?: boolean;
}

/**
 * Radio group element attributes
 */
export interface RadioElementAttributes extends BaseElementAttributes {
  options: Array<{
    label: string;
    value: string | number;
  }>;
}

/**
 * Date input element attributes
 */
export interface DateElementAttributes extends BaseElementAttributes {
  minDate?: string;
  maxDate?: string;
  format?: string;
}

/**
 * Email input element attributes
 */
export interface EmailElementAttributes extends BaseElementAttributes {
  validation?: "strict" | "loose";
}

/**
 * File upload element attributes
 */
export interface FileElementAttributes extends BaseElementAttributes {
  multiple: boolean;
  acceptedFileTypes: string;
  maxFileSize?: number; // in MB
  maxFiles?: number;
}

/**
 * KPI form data structure (matches frontend FormConfig)
 */
export interface KpiFormData {
  elements: FormElementInstance[];
  metadata?: {
    version?: string;
    created_at?: string;
    updated_at?: string;
    form_title?: string;
    form_description?: string;
  };
  layout?: {
    columns?: number;
    sections?: Array<{
      title: string;
      elementIds: string[];
    }>;
  };
}

/**
 * KPI calculated metrics structure
 */
export interface KpiCalculatedMetrics {
  formulas?: {
    target_calculation?: string;
    performance_rating?: string;
    score_calculation?: string;
    [key: string]: string | undefined;
  };
  thresholds?: {
    excellent?: number;
    good?: number;
    satisfactory?: number;
    minimum?: number;
    [key: string]: number | undefined;
  };
  weights?: {
    [elementId: string]: number;
  };
  aggregation?: {
    method: "sum" | "average" | "weighted_average" | "custom";
    customFormula?: string;
  };
}

/**
 * Form submission data structure (for when forms are filled out)
 */
export interface KpiFormSubmission {
  submission_id: string;
  kpi_id: string;
  submitted_by: string;
  submitted_at: string;
  data: {
    [elementId: string]: unknown;
  };
  calculated_values?: {
    score: number;
    percentage_achieved: number;
    performance_rating: string;
    [key: string]: unknown;
  };
  status: "draft" | "submitted" | "approved" | "rejected";
  comments?: string;
}
