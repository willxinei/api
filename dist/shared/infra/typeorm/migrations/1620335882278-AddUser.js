"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class AddUser1620335882278 {
  async up(queryRunner) {
    await queryRunner.addColumn("agendamentos", new _typeorm.TableColumn({
      name: "user_id",
      type: "uuid",
      isNullable: true
    }));
    await queryRunner.addColumn("agendamentos", new _typeorm.TableColumn({
      name: "user_name",
      type: "varchar"
    }));
    await queryRunner.addColumn("agendamentos", new _typeorm.TableColumn({
      name: "telefone",
      type: "varchar"
    }));
    await queryRunner.addColumn("agendamentos", new _typeorm.TableColumn({
      name: "avatar",
      type: "varchar",
      isNullable: true
    }));
    await queryRunner.createForeignKey("agendamentos", new _typeorm.TableForeignKey({
      name: "AppointmentUser",
      columnNames: ["user_id"],
      referencedColumnNames: ["id"],
      referencedTableName: "users",
      onDelete: "SET NULL",
      onUpdate: "CASCADE"
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey("agendamentos", "AppointmentProvider");
    await queryRunner.dropColumn("agendamentos", "avatar");
    await queryRunner.dropColumn("agendamentos", "telefone");
    await queryRunner.dropColumn("agendamentos", "user_name");
    await queryRunner.dropColumn("agendamentos", "user_id");
  }

}

exports.default = AddUser1620335882278;