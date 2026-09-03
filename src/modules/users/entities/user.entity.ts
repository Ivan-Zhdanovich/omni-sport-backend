import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Workout } from '../../workouts/entities/workout.entity.js';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column()
  firstName: string;

  @Column({ default: 'client' })
  role: string;

  @OneToMany(() => Workout, (workout) => workout.user)
  workouts: Workout[];
}