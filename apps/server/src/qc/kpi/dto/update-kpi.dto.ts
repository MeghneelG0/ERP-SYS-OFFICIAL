import { CreateKpiDto } from './create-kpi.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateKpiDto extends PartialType(CreateKpiDto) {}
