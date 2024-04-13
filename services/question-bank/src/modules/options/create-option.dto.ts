import { IsNotEmpty, Length } from 'class-validator';

export class CreateOptionDto {
  @IsNotEmpty({ message: 'Option should have text' })
  @Length(2, 255)
  text: string;

  @IsNotEmpty()
  isCorrect: number;

  @IsNotEmpty()
  questionId: number;
}
