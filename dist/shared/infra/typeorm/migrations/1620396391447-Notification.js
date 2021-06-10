"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class Notification1620396391447 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: "notification",
      columns: [{
        name: "id",
        type: "uuid",
        isPrimary: true,
        generationStrategy: "uuid",
        default: "uuid_generate_v4()"
      }, {
        name: "content",
        type: "varchar"
      }, {
        name: "recipient_id",
        type: "varchar"
      }, {
        name: "read",
        type: "boolean",
        default: false
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
    await queryRunner.dropTable("notification");
  }

}

exports.default = Notification1620396391447;