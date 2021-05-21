import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateBloqueiodeHorarios1621376660342
   implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
         new Table({
            name: "bloqueio",
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
                  name: "from",
                  type: "varchar",
               },

               {
                  name: "at",
                  type: "varchar",
               },

               {
                  name: "dia",
                  type: "varchar",
               },

               {
                  name: "mes",
                  type: "varchar",
               },
            ],
         })
      );
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("bloqueio");
   }
}
