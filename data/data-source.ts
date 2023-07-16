import { configuration } from 'src/config/configuration';
import { DataSource, DataSourceOptions } from 'typeorm';

const { dbName } = configuration().databaseConfig;
console.log(dbName);
console.log(__dirname);
export const datasourceOptions: DataSourceOptions = {
  type: 'sqlite',
  database: `./data/${dbName}`,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/data/migrations/*.js'],
  synchronize: true,
};

const dataSource = new DataSource(datasourceOptions);
export default dataSource;
