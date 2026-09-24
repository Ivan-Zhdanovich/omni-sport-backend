import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Entity, Repository } from 'typeorm';
import { Workout, IWorkoutItem } from './entities/workout.entity.js';
import { User } from '../users/entities/user.entity.js';
import { UpdateWorkoutDto } from './dto/update-workout.dto.js';

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
    let user = null;
    if (userId && userId !== 'undefined') {
      user = await this.userRepository.findOne({ where: { id: userId } });
    }
    if (!user) {
      throw new NotFoundException('`Пользователь с ID ${userId} не найден в системе');
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

  async findOne(id: string): Promise<Workout> {
    const workout = await this.workoutRepository.findOne({
      where: { id },
      relations: {
        user: true,
      },
    });
    if (!workout) {
      throw new NotFoundException(`Тренировка с ID ${id} не найдена`);
    }
    return workout;
  }

  async update(id: string, dto: UpdateWorkoutDto): Promise<Workout> {
    const workout = await this.findOne(id);
    Object.assign(workout, dto);

    return await this.workoutRepository.save(workout);
  }

  async remove(id: string): Promise<{ message: string }> {
    const workout = await this.findOne(id);
    await this.workoutRepository.remove(workout);
    return { message: `Тренировка от ${workout.startedAt.toLocaleDateString()} успешно удалена` };
  }

  async getHistoryByUserId(userId: string): Promise<Workout[]> {
    return await this.workoutRepository.find({
      where: { user: { id: userId } },
      order: { startedAt: 'DESC' }, 
    });
  }
}