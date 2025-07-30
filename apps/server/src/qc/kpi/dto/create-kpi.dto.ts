import { IsString, IsOptional, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { KpiDataDto } from './kpi-data.dto';
import { KpiCalculatedMetricsDto } from './kpi-calculated-metrics.dto';
import type { CreateKpiRequestData } from '@workspace/types/types';

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

  @ValidateNested()
  @Type(() => KpiDataDto)
  @ApiProperty({
    description: 'Dynamic form elements configuration for KPI data collection',
    type: KpiDataDto,
  })
  kpi_data: KpiDataDto;

  @IsNumber()
  @ApiProperty({ description: 'Academic year', example: 2024 })
  academic_year: number;

  @ValidateNested()
  @Type(() => KpiCalculatedMetricsDto)
  @ApiProperty({
    description: 'Calculated metrics and formulas for KPI evaluation',
    type: KpiCalculatedMetricsDto,
  })
  kpi_calculated_metrics: KpiCalculatedMetricsDto;
}
