/* eslint-disable class-methods-use-this */
import {
   MigrationInterface,
   QueryRunner,
   TableColumn,
   TableForeignKey,
} from "typeorm";

export default class AterarProvider1620302586556 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn("agendamentos", "provider");
      await queryRunner.addColumn(
         "agendamentos",
         new TableColumn({
            name: "provider_id",
            type: "uuid",
            isNullable: true,
         })
      );

      await queryRunner.createForeignKey(
         "agendamentos",
         new TableForeignKey({
            name: "AppointmentProvider",
            columnNames: ["provider_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
         })
      );
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey("agendamentos", "AppointmentProvider");
      await queryRunner.dropColumn("agendamentos", "provider_id");
      await queryRunner.addColumn(
         "agendamentos",
         new TableColumn({
            name: "provider",
            type: "varchar",
         })
      );
   }
}
