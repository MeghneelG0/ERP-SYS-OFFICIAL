import { CreatePillarTemplateInput } from '@workspace/types/types';
import { IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

export class CreatePillarDto implements CreatePillarTemplateInput {
  @IsString()
  @ApiProperty({ description: 'Name of the pillar', example: 'Teaching Excellence' })
  pillar_name: string;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ description: 'Weight of the pillar (0-1)', example: 0.4 })
  pillar_value?: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Description of the pillar' })
  description?: string;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ description: 'Percentage of target achieved', example: 75 })
  percentage_target_achieved?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ description: 'Performance rating', example: 90 })
  performance?: number;
}
