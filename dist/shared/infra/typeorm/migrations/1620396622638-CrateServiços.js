"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CrateServiços1620396622638 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: "services",
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
        name: "service",
        type: "varchar"
      }, {
        name: "description",
        type: "varchar"
      }, {
        name: "time",
        type: "varchar"
      }, {
        name: "value",
        type: "decimal",
        precision: 4
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
    await queryRunner.dropTable("services");
  }

}

exports.default = CrateServiços1620396622638;