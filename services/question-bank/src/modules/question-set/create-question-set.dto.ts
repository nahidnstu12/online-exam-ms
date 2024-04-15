import { IsNotEmpty, IsOptional, Length } from 'class-validator';

export class CreateQuestionSetDto {
  @IsNotEmpty({ message: 'Question Set should have title' })
  @Length(3, 255)
  title: string;

  @IsNotEmpty()
  isNegetive: number;

  @IsNotEmpty()
  publish: number;

  @IsOptional()
  isNegetiveNumber: boolean;

  @IsNotEmpty()
  questionBankId: number;

  // @IsNotEmpty()
  // questionIds: number;
}
