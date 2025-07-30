import { IsString, IsOptional, IsNumber, IsObject } from 'class-validator';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import type { CreateKpiRequestData, KpiFormData, KpiCalculatedMetrics } from '@workspace/types/types';

export class CreateKpiDto implements CreateKpiRequestData {
  @IsNumber()
  @ApiProperty({ description: 'KPI number/identifier', example: 1 })
  kpi_number: number;

  @IsString()
  @ApiProperty({ description: 'Name of the KPI metric', example: 'Student Satisfaction Rate' })
  kpi_metric_name: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Description of the KPI' })
  kpi_description?: string;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ description: 'Value of the KPI', example: 85 })
  kpi_value?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ description: 'Percentage of target achieved', example: 75 })
  percentage_target_achieved?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ description: 'Performance rating', example: 90 })
  performance?: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Data source for this KPI' })
  data_provided_by?: string;

  @IsObject()
  @ApiProperty({
    description: 'Dynamic form elements configuration for KPI data collection (JSON object)',
    example: {
      elements: [
        {
          id: 'element-1744113099828',
          type: 'text',
          attributes: {
            label: 'Text Input',
            placeholder: 'Enter text...',
            required: false,
          },
        },
      ],
      metadata: {
        version: '1.0',
        form_title: 'KPI Data Collection Form',
      },
      layout: {
        columns: 2,
        sections: [
          {
            title: 'Basic Information',
            elementIds: ['element-1744113099828'],
          },
        ],
      },
    },
  })
  kpi_data: KpiFormData;

  @IsNumber()
  @ApiProperty({ description: 'Academic year', example: 2024 })
  academic_year: number;

  @IsObject()
  @ApiProperty({
    description: 'Calculated metrics and formulas for KPI evaluation (JSON object)',
    example: {
      formulas: {
        target_calculation: 'sum(submitted_forms) / total_expected * 100',
        performance_rating: "if(percentage_achieved >= 90, 'Excellent', 'Good')",
      },
      thresholds: {
        excellent: 90,
        good: 75,
        satisfactory: 60,
      },
      weights: {
        'element-1744113099828': 0.3,
      },
      aggregation: {
        method: 'weighted_average',
      },
    },
  })
  kpi_calculated_metrics: KpiCalculatedMetrics;
}
