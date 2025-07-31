import { IsString, IsBoolean, IsOptional, IsArray, ValidateNested, IsIn } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { FormElementType, FormElementInstance, KpiFormData } from '@workspace/types/types';

/**
 * Base attributes that all form elements share
 */
class BaseElementAttributesDto {
  @IsString()
  @ApiProperty({ description: 'Label for the form element', example: 'Student Name' })
  label: string;

  @IsBoolean()
  @ApiProperty({ description: 'Whether the field is required', example: false })
  required: boolean;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Placeholder text', example: 'Enter your name...' })
  placeholder?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Help text or description' })
  description?: string;
}

/**
 * Individual form element DTO - matches FormElementInstance from shared types
 */
export class FormElementDto implements FormElementInstance {
  @IsString()
  @ApiProperty({ description: 'Unique element ID', example: 'element-1744113099828' })
  id: string;

  @IsIn(['text', 'textarea', 'number', 'select', 'checkbox', 'radio', 'date', 'email', 'file'])
  @ApiProperty({
    description: 'Type of form element',
    enum: ['text', 'textarea', 'number', 'select', 'checkbox', 'radio', 'date', 'email', 'file'],
    example: 'text',
  })
  type: FormElementType;

  @ValidateNested()
  @Type(() => BaseElementAttributesDto)
  @ApiProperty({
    description: 'Element attributes based on type',
  })
  attributes: Record<string, unknown>;
}

/**
 * KPI form data structure DTO - matches KpiFormData from shared types
 */
export class KpiDataDto implements KpiFormData {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FormElementDto)
  @ApiProperty({
    description: 'Array of dynamic form elements',
    type: () => [FormElementDto],
    example: [
      {
        id: 'element-1744113099828',
        type: 'text',
        attributes: {
          label: 'Text Input',
          placeholder: 'Enter text...',
          required: false,
        },
      },
      {
        id: 'element-1744113103245',
        type: 'file',
        attributes: {
          label: 'File Upload',
          required: false,
          multiple: false,
          acceptedFileTypes: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
        },
      },
      {
        id: 'element-1744113105193',
        type: 'email',
        attributes: {
          label: 'Email Input',
          placeholder: 'Enter email...',
          required: false,
        },
      },
    ],
  })
  elements: FormElementInstance[];

  @IsOptional()
  @ApiPropertyOptional({
    description: 'Additional metadata for the form',
    example: {
      version: '1.0',
      form_title: 'KPI Data Collection Form',
      form_description: 'Collect data for performance evaluation',
    },
  })
  metadata?: {
    version?: string;
    created_at?: string;
    updated_at?: string;
    form_title?: string;
    form_description?: string;
  };

  @IsOptional()
  layout?: {
    columns?: number;
    sections?: Array<{
      title: string;
      elementIds: string[];
    }>;
  };
}
