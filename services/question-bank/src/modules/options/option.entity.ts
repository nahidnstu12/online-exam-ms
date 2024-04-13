import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Questions } from '../questions/question.entity';

@Entity('options')
export class Option extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  text: string;

  @Column({
    type: 'boolean',
  })
  isCorrect: number;

  @ManyToOne(() => Questions, (question) => question.options)
  question: Questions;
}
