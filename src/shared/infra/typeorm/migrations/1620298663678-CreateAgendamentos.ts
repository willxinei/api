/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateAgendamentos1620298663678
   implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
         new Table({
            name: "agendamentos",
            columns: [
               {
                  name: "id",
                  type: "uuid",
                  isPrimary: true,
                  generationStrategy: "uuid",
                  default: "uuid_generate_v4()",
               },

               {
                  name: "provider",
                  type: "varchar",
               },

               {
                  name: "from",
                  type: "integer",
               },

               {
                  name: "at",
                  type: "integer",
               },

               {
                  name: "dia",
                  type: "integer",
               },

               {
                  name: "mes",
                  type: "integer",
               },

               {
                  name: "ano",
                  type: "integer",
               },

               {
                  name: "service",
                  type: "varchar",
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
      await queryRunner.dropTable("agendamentos");
   }
}
