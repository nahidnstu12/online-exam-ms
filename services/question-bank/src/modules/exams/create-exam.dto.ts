import { IsNotEmpty, Length } from 'class-validator';

export class CreateExamDto {
  @IsNotEmpty({ message: 'Exam should have title' })
  @Length(3, 255)
  title: string;

  subject: string;

  @IsNotEmpty()
  duration: number;

  @IsNotEmpty()
  publishedDate: string;

  @IsNotEmpty()
  examStartDate: string;

  @IsNotEmpty()
  questionsetId: number;

  isActive: boolean;
}
