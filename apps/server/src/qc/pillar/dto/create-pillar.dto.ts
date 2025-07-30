import { CreatePillarTemplateInput } from '@workspace/types/types';
import { IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePillarDto implements CreatePillarTemplateInput {
  @IsString()
  pillar_name: string;

  @IsOptional()
  @IsNumber()
  pillar_value?: number;

  @IsOptional()
  @IsString()
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
