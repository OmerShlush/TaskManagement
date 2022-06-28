import dotenv from 'dotenv';
import {  DataSourceOptions } from 'typeorm';
dotenv.config();

interface AppConfig {
    port: number;
    database: DataSourceOptions
}

function createConfig(): AppConfig {
    return {   
         port: Number(process.env.PORT) || 3000,
         database: {
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "omerdev",
            password: "omerdev",
            database: "tasks",
            entities: ["src/entity/*.ts"],
            migrations: ["src/migrations/*.ts"],
            logging: true,
            synchronize: true,
        }
    }
}

export const config = createConfig();