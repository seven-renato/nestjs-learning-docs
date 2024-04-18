import { DataSource } from "typeorm";
import {dataSourceOptions} from "./database.module"
import { CreateCoursesTable1713375657493 } from "src/migrations/1713375657493-CreateCoursesTable";
import { CreateTagsTable1713412848516 } from "src/migrations/1713412848516-CreateTagsTable";
import { CreateCoursesTagsTable1713413668416 } from "src/migrations/1713413668416-CreateCoursesTagsTable";
import { AddCoursesIdToCoursesTagsTable1713414065504 } from "src/migrations/1713414065504-AddCoursesIdToCoursesTagsTable";
import { AddTagsIdToCoursesTagsTable1713414672506 } from "src/migrations/1713414672506-AddTagsIdToCoursesTagsTable";


export const dataSourceO = new DataSource({
    ...dataSourceOptions,
    synchronize: false,
    migrations: [CreateCoursesTable1713375657493, CreateTagsTable1713412848516, 
        CreateCoursesTagsTable1713413668416, AddCoursesIdToCoursesTagsTable1713414065504, AddTagsIdToCoursesTagsTable1713414672506]
})