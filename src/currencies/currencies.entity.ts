import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  PrimaryColumn,
  Unique,
} from 'typeorm';

@Unique(['currency'])
@Entity()
export class Currencies {
  @ObjectIdColumn()
  _id: string;
  @PrimaryColumn()
  currency: string;
  @Column()
  value: number;
  @CreateDateColumn({ type: 'timestamp' })
  createAt: Date;
  @CreateDateColumn({ type: 'timestamp' })
  updateAt: Date;
}
