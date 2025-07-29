import { CreatePillarDto } from './create-pillar.dto';
import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePillarDto extends PartialType(CreatePillarDto) {
  @ApiPropertyOptional({ description: 'Name of the pillar' })
  pillar_name?: string;

  @ApiPropertyOptional({ description: 'Weight of the pillar (0-1)' })
  pillar_value?: number;

  @ApiPropertyOptional({ description: 'Description of the pillar' })
  description?: string;

  @ApiPropertyOptional({ description: 'Percentage of target achieved', example: 75 })
  percentage_target_achieved?: number;

  @ApiPropertyOptional({ description: 'Performance rating', example: 90 })
  performance?: number;

  @ApiPropertyOptional({ description: 'Academic year, e.g., 202425 for 2024-25', example: 202425 })
  academic_year?: number;
}
