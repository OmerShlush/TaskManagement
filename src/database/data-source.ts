import { DataSource } from "typeorm"

export const appDataSource = new DataSource({
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
})

