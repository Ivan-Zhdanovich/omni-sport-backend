import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity.js';
import type { Relation } from 'typeorm';

export interface IWorkoutItem {
  exerciseId?: string;   
  exerciseName: string; 
  setsCount: number;     
  repeats: string;       
  weight: number; 
}

@Entity('workouts')
export class Workout {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ default: 'gym' })
  type: string; // 'gym' | 'pool' | 'bike' | 'run'

  @ManyToOne(() => User, (user) => user.workouts, { onDelete: 'CASCADE' })
  user: Relation<User>; 

  @ManyToOne(() => User, { nullable: true })
  coach: Relation<User>;

  @CreateDateColumn({ type: 'timestamp' })
  startedAt: Date;

  @Column({ type: 'jsonb', default: [] })
  items: IWorkoutItem[];

  @Column({ nullable: true })
  notes: string;
}