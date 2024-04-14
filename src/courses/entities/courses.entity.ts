import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { Tag } from "./tags.entity"

@Entity("courses")
export class Course {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string
    
    @Column()
    description: string


    @JoinTable() // Definir o lado principal do relacionamento
    @ManyToMany(() => Tag, tag => tag.courses,  // 1°) Target (entidade relacionada), alvo de cursos são as tags 2) Inverse side, é o cursos que estão relacionados as tags
    {cascade: true}) // Qualquer dado da entidade tags que estiver em put/patch/create de cursos, deveram gerar e atualizar as tags tbm
    tags: Tag[]
}