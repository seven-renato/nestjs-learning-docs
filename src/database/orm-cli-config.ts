import "dotenv/config";
import { DataSource, DataSourceOptions } from "typeorm";
import { CreateCoursesTable1713375657493 } from "src/migrations/1713375657493-CreateCoursesTable";
import { CreateTagsTable1713412848516 } from "src/migrations/1713412848516-CreateTagsTable";
import { CreateCoursesTagsTable1713413668416 } from "src/migrations/1713413668416-CreateCoursesTagsTable";
import { AddCoursesIdToCoursesTagsTable1713414065504 } from "src/migrations/1713414065504-AddCoursesIdToCoursesTagsTable";
import { AddTagsIdToCoursesTagsTable1713414672506 } from "src/migrations/1713414672506-AddTagsIdToCoursesTagsTable";
import { Course } from "src/courses/entities/courses.entity";
import { Tag } from "src/courses/entities/tags.entity";

// CLI não trabalha com módulo do NEST!!! Logo não consegue pegar e usar o service
export const dataSourceOptions: DataSourceOptions = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS, 
    database: process.env.DB_NAME,
    entities: [Course, Tag],
    synchronize: false // A partir do momento que se define uma entidade com os decorators do TypeORM ele identifica e cria uma tabela com nome da entidade com os campos presentes
}

export const dataSourceO = new DataSource({
    ...dataSourceOptions,
    synchronize: false,
    migrations: [CreateCoursesTable1713375657493, CreateTagsTable1713412848516, 
        CreateCoursesTagsTable1713413668416, AddCoursesIdToCoursesTagsTable1713414065504, AddTagsIdToCoursesTagsTable1713414672506]
})