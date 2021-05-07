import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class Notification1620396391447 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
         new Table({
            name: "notification",
            columns: [
               {
                  name: "id",
                  type: "uuid",
                  isPrimary: true,
                  generationStrategy: "uuid",
                  default: "uuid_generate_v4()",
               },

               {
                  name: "content",
                  type: "varchar",
               },

               {
                  name: "recipient_id",
                  type: "varchar",
               },

               {
                  name: "read",
                  type: "boolean",
                  default: false,
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
      await queryRunner.dropTable("notification");
   }
}
