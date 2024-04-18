import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Course } from './entities/courses.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './entities/tags.entity';
import { CreateCourseDTO } from './dto/create-course.dto';
import { UpdateCourseDTO } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
    constructor (
        @InjectRepository(Course) 
        private readonly courseRepository: Repository<Course>,
        @InjectRepository(Tag) 
        private readonly tagRepository: Repository<Tag>
    ) {}

    async findAll() {
        return this.courseRepository.find({relations: ["tags"]}) // Nome da relação que quer trazer junto com os dados
    }

    async findOne(id: string) {
        const course = await this.courseRepository.findOne({where: {id}, relations: ["tags"]})
        if (!course) {
            throw new HttpException(`Course ID ${id} not found`, HttpStatus.NOT_FOUND)
        }
        return course;   
    }

    async create(createCourseDTO: CreateCourseDTO){
        const tags = await Promise.all(
            createCourseDTO.tags.map(name => this.preloadTagByName(name))
        )
        const course = this.courseRepository.create({
            ...createCourseDTO,
            tags
        })
        return this.courseRepository.save(course)
    }

    async update(id: string, updateCourseDTO: UpdateCourseDTO) {
        const tags = updateCourseDTO.tags &&  await Promise.all(
            updateCourseDTO.tags.map(name => this.preloadTagByName(name))
        )
        const course = await this.courseRepository.preload({ // Cria um objeto da entidade que recebe
            ...updateCourseDTO,
            id, 
            tags
        })
        if (!course) {
            throw new HttpException(`Course ID ${id} not found`, HttpStatus.NOT_FOUND)
        }
        return this.courseRepository.save(course)
    }

    async remove(id: string) {
        const course = await this.courseRepository.findOne({where: {id}})
        if (!course) {
            throw new HttpException(`Course ID ${id} not found`, HttpStatus.NOT_FOUND)
        }
        return this.courseRepository.remove(course)
    }

    private async preloadTagByName(name: string): Promise<Tag> {
        const tag = await this.tagRepository.findOne({where: {name}})
        if (tag) {return tag;}
        return this.tagRepository.create({name})
    }
}
