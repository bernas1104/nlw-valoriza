import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1624324205997 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true
          },
          {
            name: "name",
            type: "varchar",
            length: "100",
            isNullable: false
          },
          {
            name: "email",
            type: "varchar",
            length: "100",
            isUnique: true
          },
          {
            name: "password",
            type: "varchar",
            length: "255",
            isNullable: false
          },
          {
            name: "admin",
            type: "boolean"
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()"
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()"
          }
        ]
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("users");
    }

}
