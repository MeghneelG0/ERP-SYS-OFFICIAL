import { CreateKpiTemplateInput } from '@workspace/types/types';
import { IsString, IsOptional, IsNumber, IsUUID } from 'class-validator';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

export class CreateKpiDto implements CreateKpiTemplateInput {
  @IsOptional()
  @IsUUID()
  @ApiPropertyOptional({ description: 'ID of the pillar template this KPI belongs to' })
  pillar_template_id?: string;

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

  @ApiProperty({ description: 'KPI data in JSON format' })
  kpi_data: Record<string, unknown>;

  @IsNumber()
  @ApiProperty({ description: 'Academic year', example: 2024 })
  academic_year: number;

  @ApiProperty({ description: 'Calculated metrics in JSON format' })
  kpi_calculated_metrics: Record<string, unknown>;
}
