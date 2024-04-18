import { randomUUID } from 'crypto';
import { CoursesService } from './courses.service';
import { CreateCourseDTO } from './dto/create-course.dto';
import { UpdateCourseDTO } from './dto/update-course.dto';

describe('CoursesService unit tests', () => {
  let service: CoursesService;
  let id: string;
  let created_at: Date;
  let expectOutputTags: object
  let expectOutputCourses: any
  let mockCourseRepository: any
  let mockTagRepository: any

  // beforeEach/beforeAll/afterEach/afterAll
  beforeEach(async () => { // Rodar esse código abaixo antes de cada teste, preparação e configurações que devem ser definidas
    service = new CoursesService();
    id = randomUUID();
    created_at = new Date();
    expectOutputTags = {
      id,
      name: 'nestjs',
      created_at
    }
    expectOutputCourses = {
      id,
      name: 'nestjs',
      description: 'test description',
      created_at,
      tags: expectOutputTags
    }

    mockCourseRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      save: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      update: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      preload: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      findAll: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      findOne: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      find: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      remove: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
    }

    mockTagRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutputTags)),
      findOne: jest.fn(),
    }

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a course', async () => {
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository
    //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository

    const createCourseDTO: CreateCourseDTO = {
      name: 'nestjs',
      description: 'test description',
      tags: ["nestjs"]
    }

    const newCourse = await service.create(createCourseDTO) // Executando a simulação do método presente no Mock

    expect(mockCourseRepository.save).toHaveBeenCalled();
    expect(expectOutputCourses).toStrictEqual(newCourse)
  });

  it('should list all courses', async () => {
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository
    //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository

    const courses = await service.findAll() // Executando a simulação do método presente no Mock

    expect(mockCourseRepository.find).toHaveBeenCalled(); // Ao usar o findAll do Servide espera-se que o find do repositório seja retorne
    expect(expectOutputCourses).toStrictEqual(courses)
  });

  it('should gets a course by id', async () => {
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository
    //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository

    const course = await service.findOne(id) // Executando a simulação do método presente no Mock

    expect(mockCourseRepository.findOne).toHaveBeenCalled(); // Ao usar o findAll do Servide espera-se que o find do repositório seja retorne
    expect(expectOutputCourses).toStrictEqual(course)
  });

  it('should update a course', async () => {
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository
    //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository

    const updateCourseDTO: UpdateCourseDTO = {
      name: 'nestjs',
      description: 'test description',
      tags: ["nestjs"]
    }

    const course = await service.update(id, updateCourseDTO) // Executando a simulação do método presente no Mock

    expect(mockCourseRepository.save).toHaveBeenCalled();
    expect(mockCourseRepository.preload).toHaveBeenCalled();
    expect(expectOutputCourses).toStrictEqual(course)
  });

  it('should delete a course by id', async () => {
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository
    //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository

    const course = await service.remove(id) // Executando a simulação do método presente no Mock

    expect(mockCourseRepository.findOne).toHaveBeenCalled(); // Ao usar o findAll do Servide espera-se que o find do repositório seja retorne
    expect(mockCourseRepository.remove).toHaveBeenCalled(); // Ao usar o findAll do Servide espera-se que o find do repositório seja retorne
    expect(expectOutputCourses).toStrictEqual(course)
  });
});
