"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

/* eslint-disable class-methods-use-this */
class CreateAgendamentos1620298663678 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: "agendamentos",
      columns: [{
        name: "id",
        type: "uuid",
        isPrimary: true,
        generationStrategy: "uuid",
        default: "uuid_generate_v4()"
      }, {
        name: "provider",
        type: "varchar"
      }, {
        name: "from",
        type: "integer"
      }, {
        name: "at",
        type: "integer"
      }, {
        name: "dia",
        type: "integer"
      }, {
        name: "mes",
        type: "integer"
      }, {
        name: "ano",
        type: "integer"
      }, {
        name: "service",
        type: "varchar"
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
    await queryRunner.dropTable("agendamentos");
  }

}

exports.default = CreateAgendamentos1620298663678;