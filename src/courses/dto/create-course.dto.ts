import { IsString } from "class-validator"


export class CreateCourseDTO {
    @IsString()
    readonly name: string // Readonly define Imutabilidade de classes
    
    @IsString()
    readonly description: string
    
    @IsString({each: true})
    readonly tags: string[]
}