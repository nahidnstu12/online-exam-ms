import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OptionController } from './options/option.controller';
import { Option } from './options/option.entity';
import { OptionRepository } from './options/option.repository';
import { OptionService } from './options/option.service';
import { QuestionBankController } from './question-bank/bank.controller';
import { QuestionBank } from './question-bank/bank.entity';
import { BankRepository } from './question-bank/bank.repository';
import { QuestionBankService } from './question-bank/bank.service';
import { QuestionSetController } from './question-set/question-set.controller';
import { QuestionSet } from './question-set/question-set.entity';
import { QuestionSetService } from './question-set/question-set.service';
import { Question } from './questions/question.entity';
import { QuestionRepository } from './questions/question.repository';
import { QuestionService } from './questions/question.service';
import { QuestionsController } from './questions/questions.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuestionBank, Question, Option, QuestionSet]),
  ],
  controllers: [
    QuestionBankController,
    QuestionsController,
    OptionController,
    QuestionSetController,
  ],
  providers: [
    QuestionBankService,
    BankRepository,
    QuestionRepository,
    QuestionService,
    OptionRepository,
    OptionService,
    QuestionSetService,
  ],
})
export class QuestionBankModule {}
