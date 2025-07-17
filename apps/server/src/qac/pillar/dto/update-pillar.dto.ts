import { PartialType } from '@nestjs/mapped-types';
import { CreatePillarDto } from './create-pillar.dto';

export class UpdatePillarDto extends PartialType(CreatePillarDto) {}
