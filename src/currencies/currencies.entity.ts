import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, Length } from 'class-validator';
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
  @Length(3, 3)
  @IsNotEmpty()
  currency: string;

  @Column()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number) // TypeORM não consegue fazer a conversão de string para number
  value: number;

  @CreateDateColumn({ type: 'timestamp' })
  createAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updateAt: Date;
}
