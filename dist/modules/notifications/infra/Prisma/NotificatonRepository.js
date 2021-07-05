"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _client = require("@prisma/client");

class NotificationsRepository {
  constructor() {
    this.prisma = new _client.PrismaClient();
  }

  async create({
    content,
    recipient_id
  }) {
    const notifica = await this.prisma.notification.create({
      data: {
        content,
        recipient_id
      }
    });
    return notifica;
  }

}

exports.default = NotificationsRepository;