import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Entity, Repository } from 'typeorm';
import { Workout, IWorkoutItem } from './entities/workout.entity.js';
import { User } from '../users/entities/user.entity.js';

@Entity('workouts')
export class WorkoutsService {
  constructor(
    @InjectRepository(Workout)
    private readonly workoutRepository: Repository<Workout>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createWorkout(
    userId: string, 
    type: string, 
    name: string, 
    items: IWorkoutItem[], 
    notes?: string
  ): Promise<Workout> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    const workout = this.workoutRepository.create({
      user,
      type,
      name,
      items, 
      notes,
    });

    return await this.workoutRepository.save(workout);
  }

  async getHistoryByUserId(userId: string): Promise<Workout[]> {
    return await this.workoutRepository.find({
      where: { user: { id: userId } },
      order: { startedAt: 'DESC' }, // Сначала новые
    });
  }
}