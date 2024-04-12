import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('questionBank')
export class QuestionBank extends BaseEntity {
  @PrimaryGeneratedColumn({
    comment: 'The bank unique identifier',
  })
  id: number;

  @Column({
    type: 'varchar',
  })
  title: string;

  @Column({
    type: 'varchar',
  })
  teacherId: number;

  @Column({
    type: 'boolean',
    default: 1,
  })
  isActive: boolean;
}
