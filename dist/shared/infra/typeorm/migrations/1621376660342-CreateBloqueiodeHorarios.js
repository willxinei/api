"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateBloqueiodeHorarios1621376660342 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: "bloqueio",
      columns: [{
        name: "id",
        type: "uuid",
        isPrimary: true,
        generationStrategy: "uuid",
        default: "uuid_generate_v4()"
      }, {
        name: "provider_id",
        type: "varchar"
      }, {
        name: "from",
        type: "varchar"
      }, {
        name: "at",
        type: "varchar"
      }, {
        name: "dia",
        type: "varchar"
      }, {
        name: "mes",
        type: "varchar"
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable("bloqueio");
  }

}

exports.default = CreateBloqueiodeHorarios1621376660342;