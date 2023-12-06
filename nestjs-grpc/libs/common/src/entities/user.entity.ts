import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity('user')
export class UserEntity {
  @ObjectIdColumn()
  id: ObjectId;
  
  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  age: number;

  @Column()
  subscribed?: boolean;

  @Column({ nullable: true })
  socialMedia?: {
    twitterUri?: string;
    fbUri?: string;
  };

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  role: string;
}
