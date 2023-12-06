import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity('task')
export class TaskEntity {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  description: string;

  @Column()
  estimatedTime: number;

  @Column()
  completed: boolean;

  @Column({ nullable: true })
  category?: string;

  @Column({ nullable: true })
  subCategory?: string;
}
