"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

/* eslint-disable class-methods-use-this */
class AterarProvider1620302586556 {
  async up(queryRunner) {
    await queryRunner.dropColumn("agendamentos", "provider");
    await queryRunner.addColumn("agendamentos", new _typeorm.TableColumn({
      name: "provider_id",
      type: "uuid",
      isNullable: true
    }));
    await queryRunner.createForeignKey("agendamentos", new _typeorm.TableForeignKey({
      name: "AppointmentProvider",
      columnNames: ["provider_id"],
      referencedColumnNames: ["id"],
      referencedTableName: "users",
      onDelete: "SET NULL",
      onUpdate: "CASCADE"
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey("agendamentos", "AppointmentProvider");
    await queryRunner.dropColumn("agendamentos", "provider_id");
    await queryRunner.addColumn("agendamentos", new _typeorm.TableColumn({
      name: "provider",
      type: "varchar"
    }));
  }

}

exports.default = AterarProvider1620302586556;