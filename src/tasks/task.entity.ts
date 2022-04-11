// By naming this.task.entity.ts, typeORM know to automatically load it (see app.module.ts)

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task.model';

@Entity()
export class Task {
  // * Define columns in table

  // Make id the primary string and make it autogenerated
  // Also tell typeorm to create the ids with uuid to make them random and unique, instead of 1, 2, 3, etc.
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;
}