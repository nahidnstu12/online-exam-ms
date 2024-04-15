import { IsNotEmpty, Length } from 'class-validator';

export class CreateQuestionDto {
  @IsNotEmpty({ message: 'Question should have title' })
  @Length(3, 255)
  title: string;

  @IsNotEmpty()
  mark: number;

  @IsNotEmpty()
  questionType: string;

  @IsNotEmpty()
  questionBankId: number;
}
