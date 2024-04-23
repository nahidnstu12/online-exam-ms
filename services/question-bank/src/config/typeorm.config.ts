import { Exam } from 'src/modules/exams/exam.entity';
import { Option } from 'src/modules/options/option.entity';
import { QuestionSetQuestion } from 'src/modules/others/entity/questionset-question.entity';
import { QuestionBank } from 'src/modules/question-bank/bank.entity';
import { QuestionSet } from 'src/modules/question-set/question-set.entity';
import { Question } from 'src/modules/questions/question.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const typeOrmConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  entities: [
    QuestionBank,
    Question,
    Option,
    QuestionSet,
    QuestionSetQuestion,
    Exam,
  ],
  // entities: [__dirname + '/dist/modules/**/*.entity{.ts,.js}'],
  // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false,
  logging: false,
  // migrations: [__dirname + '/dist/modules/others/migrations/*{.ts,.js}'],
  migrations: [`${__dirname}/../modules/others/migrations/*.js`],
  migrationsTableName: 'migrations',
};

export default typeOrmConfig;
