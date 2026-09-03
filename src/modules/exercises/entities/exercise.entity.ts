import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('exercises')
export class Exercise {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string; // "Жим лежа", "Плавание: кроль", "Приседания"

  @Column({ default: 'gym' })
  type: string; //тип: 'gym' | 'pool' | 'bike'
}