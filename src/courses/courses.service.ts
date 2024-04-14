import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Course } from './entities/courses.entity';

@Injectable()
export class CoursesService {
    private courses: Course[] = [
        {
            id: 1,
            name: "Fundamentos do Framework NestJS",
            description: "Curso sobre fundamentos do framework NestJS",
            tags: ["node.js", "nestjs", "javascript", "typescript"]
        }
    ]


    findAll() {
        return this.courses
    }

    findOne(id: number) {
        const course = this.courses.find(course => course.id === id)
        if (!course) {
            throw new HttpException(`Course ID ${id} not found`, HttpStatus.NOT_FOUND)
        }
        return course;   
    }

    create(createCourseDTO: any){
        this.courses.push(createCourseDTO)
        return createCourseDTO
    }

    update(id: number, updateCourseDTO: any) {
        if (this.findOne(id) as any) {
            const index = this.courses.findIndex(course => course.id === id)
            this.courses[index] = {
                id,
                ...updateCourseDTO
            }
        }
    }

    remove(id: number) {
        if (this.findOne(id)) {
            const index = this.courses.findIndex(course => course.id === id)
            this.courses.splice(index, 1)
        }
    }
}
