import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCompliments1624407022318 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'compliments',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true
            },
            {
              name: 'user_sender',
              type: 'uuid',
              isNullable: false
            },
            {
              name: 'user_receiver',
              type: 'uuid',
              isNullable: false
            },
            {
              name: 'tag_id',
              type: 'uuid',
              isNullable: false
            },
            {
              name: 'created_at',
              type: 'timestamp',
              default: 'now()'
            }
          ],
          foreignKeys: [
            {
              columnNames: ['user_sender'],
              referencedColumnNames: ['id'],
              referencedTableName: 'users',
              onDelete: 'CASCADE',
            },
            {
              columnNames: ['user_receiver'],
              referencedColumnNames: ['id'],
              referencedTableName: 'users',
              onDelete: 'CASCADE',
            },
            {
              columnNames: ['tag_id'],
              referencedColumnNames: ['id'],
              referencedTableName: 'tags',
              onDelete: 'CASCADE',
            }
          ]
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('compliments');
    }

}
