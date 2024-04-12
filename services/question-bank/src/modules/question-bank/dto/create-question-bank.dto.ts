import { IsNotEmpty, Length } from 'class-validator';

export class CreateQuestionBankDto {
  @IsNotEmpty({ message: 'Question Bank should have title' })
  @Length(3, 255)
  title: string;

  @IsNotEmpty()
  teacherId: number;
}
