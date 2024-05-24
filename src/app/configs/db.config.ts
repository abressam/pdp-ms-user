import { SequelizeModuleOptions } from '@nestjs/sequelize';

const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env;

const dbConfig: SequelizeModuleOptions = {
  dialect: 'mariadb',
  host: DB_HOST,
  port: parseInt(DB_PORT, 10) || 3306,
  username: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  autoLoadModels: true,
  synchronize: true,
  logging: false,
};

export default dbConfig;
