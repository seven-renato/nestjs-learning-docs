import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/courses.entity';
import { Tag } from './entities/tags.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Course, Tag])], // Qual entidade esse módulo vai usar
    controllers: [CoursesController],
    providers: [CoursesService],
    exports: [CoursesService] // Acessível fora desse modulo
})
export class CoursesModule {}
