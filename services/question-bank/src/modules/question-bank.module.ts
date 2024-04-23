import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OptionController } from './options/option.controller';
import { Option } from './options/option.entity';
import { OptionService } from './options/option.service';
import { QuestionSetQuestion } from './others/entity/questionset-question.entity';
import { QuestionBankController } from './question-bank/bank.controller';
import { QuestionBank } from './question-bank/bank.entity';
import { QuestionBankService } from './question-bank/bank.service';
import { QuestionSetController } from './question-set/question-set.controller';
import { QuestionSet } from './question-set/question-set.entity';
import { QuestionSetService } from './question-set/question-set.service';
import { Question } from './questions/question.entity';
import { QuestionService } from './questions/question.service';
import { QuestionsController } from './questions/questions.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      QuestionBank,
      Question,
      Option,
      QuestionSet,
      QuestionSetQuestion,
    ]),
  ],
  controllers: [
    QuestionBankController,
    QuestionsController,
    OptionController,
    QuestionSetController,
  ],
  providers: [
    QuestionBankService,
    QuestionService,
    OptionService,
    QuestionSetService,
  ],
  exports: [QuestionSetService],
})
export class QuestionBankModule {}
