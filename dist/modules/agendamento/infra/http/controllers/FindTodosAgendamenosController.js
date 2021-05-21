"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _FindTodosAgendamentos = _interopRequireDefault(require("../../../../../../dist/modules/agendamento/services/FindTodosAgendamentos"));

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FindTodosAgendamenosController {
  async list(req, res) {
    try {
      const agenda = _tsyringe.container.resolve(_FindTodosAgendamentos.default);

      const user_id = req.user.id;
      const ag = await agenda.execute(user_id);
      return res.json(ag);
    } catch (err) {
      return res.json(err.message).status(400);
    }
  }

}

exports.default = FindTodosAgendamenosController;