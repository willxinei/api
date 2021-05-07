import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CrateServiços1620396622638 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
         new Table({
            name: "services",
            columns: [
               {
                  name: "id",
                  type: "uuid",
                  isPrimary: true,
                  generationStrategy: "uuid",
                  default: "uuid_generate_v4()",
               },

               {
                  name: "provider_id",
                  type: "varchar",
               },

               {
                  name: "service",
                  type: "varchar",
               },

               {
                  name: "description",
                  type: "varchar",
               },

               {
                  name: "time",
                  type: "varchar",
               },

               {
                  name: "value",
                  type: "decimal",
                  precision: 4,
               },

               {
                  name: "created_at",
                  type: "timestamp",
                  default: "now()",
               },

               {
                  name: "updated_at",
                  type: "timestamp",
                  default: "now()",
               },
            ],
         })
      );
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("services");
   }
}
