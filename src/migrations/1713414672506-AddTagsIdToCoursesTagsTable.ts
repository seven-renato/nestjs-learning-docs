import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddTagsIdToCoursesTagsTable1713414672506 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("courses_tags_tags", new TableColumn(
            {
                name: "tagsId",
                type: "uuid",
                isNullable: true
            }
        ))

        await queryRunner.createForeignKey("courses_tags_tags", new TableForeignKey({
            name: 'courses_tags_tags',
            columnNames: ['tagsId'], // Coluna da tabela courses_tags, que se relaciona com a tabela _courses
            referencedTableName: 'tags',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL'
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('courses_tags_tags', 'courses_tags_tags')
        
        await queryRunner.dropColumn('courses_tags_tags', 'tagsId')
    }

}
