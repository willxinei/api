import {
   MigrationInterface,
   QueryRunner,
   TableColumn,
   TableForeignKey,
} from "typeorm";

export default class AddUser1620335882278 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn(
         "agendamentos",
         new TableColumn({
            name: "user_id",
            type: "uuid",
            isNullable: true,
         })
      );
      await queryRunner.addColumn(
         "agendamentos",
         new TableColumn({
            name: "user_name",
            type: "varchar",
         })
      );
      await queryRunner.addColumn(
         "agendamentos",
         new TableColumn({
            name: "telefone",
            type: "varchar",
         })
      );
      await queryRunner.addColumn(
         "agendamentos",
         new TableColumn({
            name: "avatar",
            type: "varchar",
            isNullable: true,
         })
      );

      await queryRunner.createForeignKey(
         "agendamentos",
         new TableForeignKey({
            name: "AppointmentUser",
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
         })
      );
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey("agendamentos", "AppointmentProvider");
      await queryRunner.dropColumn("agendamentos", "avatar");
      await queryRunner.dropColumn("agendamentos", "telefone");
      await queryRunner.dropColumn("agendamentos", "user_name");
      await queryRunner.dropColumn("agendamentos", "user_id");
   }
}
