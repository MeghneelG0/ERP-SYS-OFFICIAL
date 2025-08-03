import { PartialType } from '@nestjs/swagger';
import { CreateDepartmentInfoDto } from './create-department-info.dto';

export class UpdateDepartmentInfoDto extends PartialType(CreateDepartmentInfoDto) {}
