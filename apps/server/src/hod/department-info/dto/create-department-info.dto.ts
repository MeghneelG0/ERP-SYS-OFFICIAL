import { IsInt, Min, IsArray, ValidateNested, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { TotalCalculationType } from '@repo/db/prisma/client';

class StudentStrengthDto {
  @IsInt()
  @Min(1)
  year: number;

  @IsInt()
  @Min(0)
  intake: number;

  @IsInt()
  @Min(0)
  admitted: number;
}

export class CreateDepartmentInfoDto {
  @IsInt()
  @Min(0)
  ugPrograms: number;

  @IsInt()
  @Min(0)
  pgPrograms: number;

  @IsInt()
  @Min(0)
  totalCourses: number;

  @IsInt()
  @Min(0)
  creditsEven: number;

  @IsInt()
  @Min(0)
  creditsOdd: number;

  @IsInt()
  @Min(0)
  studentsInternship: number;

  @IsInt()
  @Min(0)
  studentsProject: number;

  @IsInt()
  @Min(0)
  fullTimeTeachers: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StudentStrengthDto)
  studentStrength: StudentStrengthDto[];

  @IsEnum(TotalCalculationType)
  @ApiProperty({ enum: TotalCalculationType, description: 'The type of total to calculate' })
  totalCalculationType: TotalCalculationType;
}
