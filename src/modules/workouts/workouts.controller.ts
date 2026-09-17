import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { WorkoutsService } from './workouts.service.js';
import { IWorkoutItem } from './entities/workout.entity.js';

class CreateWorkoutDto {
  userId: string;
  type: string;
  name: string;
  items: IWorkoutItem[];
  notes?: string;
}

@Controller('workouts')
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @Post()
  async create(@Body() dto: CreateWorkoutDto) {
    return await this.workoutsService.createWorkout(
      dto.userId,
      dto.type,
      dto.name,
      dto.items,
      dto.notes,
    );
  }

  @Get('user/:userId')
  async getHistory(@Param('userId') userId: string) {
    return await this.workoutsService.getHistoryByUserId(userId);
  }
}