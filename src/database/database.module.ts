import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/courses/entities/courses.entity';
import { Tag } from 'src/courses/entities/tags.entity';
import { DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
    type: "postgres",
    host: "localhost",
    port: 54321,
    username: "postgres",
    password: "password", 
    database: "devtraining",
    entities: [Course, Tag],
    synchronize: false // A partir do momento que se define uma entidade com os decorators do TypeORM ele identifica e cria uma tabela com nome da entidade com os campos presentes
}

@Module({
    imports: [TypeOrmModule.forRootAsync(
             {
            useFactory: () => {
                return {
                    ...dataSourceOptions
                }
                }
            }
    )]
})
export class DatabaseModule {}
