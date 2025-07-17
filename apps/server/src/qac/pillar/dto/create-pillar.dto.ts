import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  MaxLength,
} from 'class-validator';
import { CreatePillarTemplateInput } from '@workspace/types/types';

export class CreatePillarDto implements CreatePillarTemplateInput {
  @IsString({ message: 'Pillar name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  @MaxLength(255, { message: 'Name too long' })
  pillar_name: string;

  @IsOptional()
  @IsNumber({}, { message: 'Pillar value must be a number' })
  pillar_value?: number;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;
}
