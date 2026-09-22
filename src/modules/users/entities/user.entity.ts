import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Workout } from '../../workouts/entities/workout.entity.js';
import { RoleEnum } from '../../../enums/role.enums.js';

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

   @Column({ type: 'varchar', default: RoleEnum.CLIENT })
  role: RoleEnum;

  @OneToMany(() => Workout, (workout) => workout.user)
  workouts: Workout[];
}