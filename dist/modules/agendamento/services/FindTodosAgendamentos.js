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

let FindTodosAgendamentos = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("AgendamentoRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IAgendamentoRespository.IAgendamentoRepository === "undefined" ? Object : _IAgendamentoRespository.IAgendamentoRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class FindTodosAgendamentos {
  constructor(agendamentoRepository) {
    this.agendamentoRepository = agendamentoRepository;
  }

  async execute() {
    const agenda = await this.agendamentoRepository.findTodosAgendamentos();

    if (!agenda) {
      throw new _AppError.default("Nenhum agendamento disponivel");
    }

    return agenda;
  }

}) || _class) || _class) || _class) || _class);
exports.default = FindTodosAgendamentos;