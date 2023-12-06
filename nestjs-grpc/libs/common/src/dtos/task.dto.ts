import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class TaskDTO {
  @ApiProperty({ example: '60abcf9586b349246cd8dbcc', description: 'ID of the task' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'Task description', description: 'Description of the task' })
  @IsString()
  description: string;

  @ApiProperty({ example: 5, description: 'Estimated time for the task (in hours)' })
  @IsNumber()
  estimatedTime: number;

  @ApiProperty({ example: true, description: 'Completion status of the task' })
  @IsBoolean()
  completed: boolean;

  @ApiProperty({ example: 'Work', description: 'Category of the task' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({ example: 'Subcategory', description: 'Subcategory of the task' })
  @IsOptional()
  @IsString()
  subCategory?: string;
}
