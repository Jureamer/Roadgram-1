import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as dotenv from 'dotenv';
dotenv.config();

const typeORMConfig: TypeOrmModuleOptions = {
    "type": "mysql",
    "host": process.env.DATABASE_HOST,
    "port": +process.env.DATABASE_PORT,
    "username": process.env.DATABASE_USERNAME,
    "password": process.env.DATABASE_PASSWORD,
    "database": process.env.DATABASE_NAME,
    "entities": ["dist/src/**/*.entity{.ts,.js}"],
    "synchronize": false,
    "logging": false
}

export default typeORMConfig;