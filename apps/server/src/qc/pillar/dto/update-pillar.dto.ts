import { CreatePillarDto } from './create-pillar.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdatePillarDto extends PartialType(CreatePillarDto) {}
