import { IsOptional, IsString, IsArray } from 'class-validator';
import { IWorkoutItem } from '../entities/workout.entity.js';

export class UpdateWorkoutDto {
  @IsOptional()
  @IsString({ message: 'Название должно быть строкой' })
  name?: string;

  @IsOptional()
  @IsString()
  type?: string; // 'gym' | 'pool'

  @IsOptional()
  @IsArray({ message: 'Items должен быть массивом' })
  items?: IWorkoutItem[];

  @IsOptional()
  @IsString({ message: 'Заметка должна быть строкой' })
  notes?: string;
}
