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
import { Question } from './questions/question.entity';
import { QuestionRepository } from './questions/question.repository';
import { QuestionService } from './questions/question.service';
import { QuestionsController } from './questions/questions.controller';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionBank, Question, Option])],
  controllers: [QuestionBankController, QuestionsController, OptionController],
  providers: [
    QuestionBankService,
    BankRepository,
    QuestionRepository,
    QuestionService,
    OptionRepository,
    OptionService,
  ],
})
export class QuestionBankModule {}
