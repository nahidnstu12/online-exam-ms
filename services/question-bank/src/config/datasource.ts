import { DataSource } from 'typeorm';
import typeOrmConfig from './typeorm.config';

const AppDataSource = new DataSource(typeOrmConfig);

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

export default AppDataSource;
