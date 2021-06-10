"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

/* eslint-disable class-methods-use-this */
class CreateUser1620301871116 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: "users",
      columns: [{
        name: "id",
        type: "uuid",
        isPrimary: true,
        generationStrategy: "uuid",
        default: "uuid_generate_v4()"
      }, {
        name: "name",
        type: "varchar"
      }, {
        name: "email",
        type: "varchar"
      }, {
        name: "telefone",
        type: "varchar"
      }, {
        name: "password",
        type: "varchar"
      }, {
        name: "prestador",
        type: "boolean"
      }, {
        name: "created_at",
        type: "timestamp",
        default: "now()"
      }, {
        name: "updated_at",
        type: "timestamp",
        default: "now()"
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable("users");
  }

}

exports.default = CreateUser1620301871116;