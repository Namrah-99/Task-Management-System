import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity('auth')
export class AuthEntity {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  email: string;

  @Column()
  password: string;

  // @Column({ nullable: true })
  // accessToken?: string;
}
