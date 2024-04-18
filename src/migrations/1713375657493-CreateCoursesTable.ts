import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCoursesTable1713375657493 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> { // O que vai rodar quando usar o run
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"') // Geração automática de ID para os ID's da aplicação
        await queryRunner.createTable(new Table({
            name: "courses",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true
                },
                {
                    name: "name",
                    type: "varchar"
                },
                {
                    name: "description",
                    type: "varchar"
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP"
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> { // O que vai rodar quando rodar o rever
        await queryRunner.dropTable("courses")
    }

}
