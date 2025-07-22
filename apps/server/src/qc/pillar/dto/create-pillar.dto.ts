import { CreatePillarTemplateInput } from '@workspace/types/types';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreatePillarDto implements CreatePillarTemplateInput {
  @IsString()
  pillar_name: string;

  @IsOptional()
  @IsNumber()
  pillar_value?: number;

  @IsOptional()
  @IsString()
  description?: string;
}
