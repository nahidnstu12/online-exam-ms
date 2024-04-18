import { IsNotEmpty } from 'class-validator';

export class AssignQuestionQuestionSetDto {
  @IsNotEmpty()
  questionSetId: number;

  @IsNotEmpty()
  questionIds: number[];
}
