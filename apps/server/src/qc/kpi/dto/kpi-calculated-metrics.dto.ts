import { IsOptional, IsObject } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import type { KpiCalculatedMetrics } from '@workspace/types/types';

/**
 * KPI calculated metrics DTO - matches KpiCalculatedMetrics from shared types
 */
export class KpiCalculatedMetricsDto implements KpiCalculatedMetrics {
  @IsOptional()
  @IsObject()
  @ApiPropertyOptional({
    description: 'Formulas for calculating KPI metrics',
    example: {
      target_calculation: 'sum(submitted_forms) / total_expected * 100',
      performance_rating:
        "if(percentage_achieved >= 90, 'Excellent', if(percentage_achieved >= 75, 'Good', 'Needs Improvement'))",
      score_calculation: 'weighted_average(element_scores)',
    },
  })
  formulas?: Record<string, string>;

  @IsOptional()
  @IsObject()
  @ApiPropertyOptional({
    description: 'Performance thresholds for rating',
    example: {
      excellent: 90,
      good: 75,
      satisfactory: 60,
      minimum: 50,
    },
  })
  thresholds?: Record<string, number>;

  @IsOptional()
  @IsObject()
  @ApiPropertyOptional({
    description: 'Weights for different form elements',
    example: {
      'element-1744113099828': 0.3,
      'element-1744113103245': 0.5,
      'element-1744113105193': 0.2,
    },
  })
  weights?: Record<string, number>;

  @IsOptional()
  @IsObject()
  @ApiPropertyOptional({
    description: 'Aggregation method configuration',
    example: {
      method: 'weighted_average',
      customFormula: 'sum(weighted_scores) / total_weight',
    },
  })
  aggregation?: {
    method: 'sum' | 'average' | 'weighted_average' | 'custom';
    customFormula?: string;
  };
}
