import { CreateKpiDto } from './create-kpi.dto';
import { PartialType } from '@nestjs/mapped-types';

/**
 * DTO for updating KPI templates
 * All fields from CreateKpiDto are optional for partial updates
 * Backend-generated fields (id, created_by_user, timestamps) are excluded
 */
export class UpdateKpiDto extends PartialType(CreateKpiDto) {}
