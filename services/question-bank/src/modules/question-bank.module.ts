import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OptionController } from './options/option.controller';
import { Option } from './options/option.entity';
import { OptionRepository } from './options/option.repository';
import { OptionService } from './options/option.service';
import { QuestionBank } from './question-bank/entities/bank.entity';
import { QuestionBankController } from './question-bank/question-bank.controller';
import { QuestionBankService } from './question-bank/question-bank.service';
import { BankRepository } from './question-bank/repositories/bank.repository';
import { Questions } from './questions/question.entity';
import { QuestionRepository } from './questions/question.repository';
import { QuestionService } from './questions/question.service';
import { QuestionsController } from './questions/questions.controller';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionBank, Questions, Option])],
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
