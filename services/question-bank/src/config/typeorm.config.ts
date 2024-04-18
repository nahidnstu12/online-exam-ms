import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const typeOrmConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: [__dirname + '/dist/modules/others/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
};

export default typeOrmConfig;
