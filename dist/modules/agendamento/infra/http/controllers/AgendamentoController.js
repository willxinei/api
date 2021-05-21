"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CreateAgendamentoService = _interopRequireDefault(require("../../../../../../dist/modules/agendamento/services/CreateAgendamentoService"));

var _classTransformer = require("class-transformer");

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AgendamentoController {
  async create(req, res) {
    try {
      const {
        provider_id,
        user_name,
        telefone,
        avatar,
        from,
        service,
        dia,
        mes,
        ano
      } = req.body;
      const user_id = req.user.id;

      const createAgendamento = _tsyringe.container.resolve(_CreateAgendamentoService.default);

      const agendamento = await createAgendamento.execute({
        provider_id,
        user_id,
        from,
        user_name,
        telefone,
        avatar,
        at: from,
        dia,
        mes,
        ano,
        service
      });
      await req.io.emit("agenda", (0, _classTransformer.classToClass)(agendamento));
      return res.json((0, _classTransformer.classToClass)(agendamento));
    } catch (err) {
      return res.json(err.message).status(401);
    }
  }

}

exports.default = AgendamentoController;