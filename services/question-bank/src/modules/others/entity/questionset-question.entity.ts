import { BaseEntity, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('questionset-question')
export class QuestionSetQuestion extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
