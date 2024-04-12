import { Module } from '@nestjs/common';
import { QuestionBankController } from './question-bank.controller';
import { QuestionBankService } from './question-bank.service';
import { BankRepository } from './repositories/bank.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionBank } from './entities/bank.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionBank])],
  controllers: [QuestionBankController],
  providers: [QuestionBankService, BankRepository],
})
export class QuestionBankModule {}
