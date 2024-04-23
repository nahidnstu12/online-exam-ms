import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamController } from './exam.controller';
import { Exam } from './exam.entity';
import { ExamService } from './exam.service';
import { QuestionSetService } from '../question-set/question-set.service';

@Module({
  imports: [TypeOrmModule.forFeature([Exam])],
  controllers: [ExamController],
  providers: [ExamService, QuestionSetService],
})
export class ExamModule {}
