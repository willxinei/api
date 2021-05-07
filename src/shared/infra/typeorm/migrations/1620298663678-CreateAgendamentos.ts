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

               {
                  name: "ano",
                  type: "varchar",
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
