"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../../dist/shared/errors/AppError"));

var _tsyringe = require("tsyringe");

var _IAgendamentoRespository = require("../repositories/IAgendamentoRespository");

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let FindTodosAgendamentosPrestadorSerice = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("AgendamentoRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IAgendamentoRespository.IAgendamentoRepository === "undefined" ? Object : _IAgendamentoRespository.IAgendamentoRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class FindTodosAgendamentosPrestadorSerice {
  constructor(agendamentoRepository) {
    this.agendamentoRepository = agendamentoRepository;
  }

  async execute(provider_id) {
    const agendamento = await this.agendamentoRepository.findTodosAgendamentosPrestador(provider_id);

    if (!agendamento) {
      throw new _AppError.default("sem agendamento");
    }

    const agenda = agendamento.sort((a, b) => {
      return a.from - b.from;
    });
    agenda.sort((a, b) => {
      return a.dia - b.dia;
    });
    return agenda;
  }

}) || _class) || _class) || _class) || _class);
exports.default = FindTodosAgendamentosPrestadorSerice;