import { Task } from '../tasks/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  /**
   * This is a relation one to many.
   * arg 1 -> type of the tasks property. Unused => prefix with _
   * arg 2 -> how we acces this property from the 'Many' (task) side => task will have a user proeprty
   * arg 3 -> if true: whenever we retrieve the user from the db, we also fetch the tasks with it
   *
   * @memberof User
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany((_type) => Task, (task) => task.user, { eager: true })
  tasks: Task[];
}
