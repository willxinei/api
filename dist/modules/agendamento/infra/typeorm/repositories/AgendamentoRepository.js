"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../../../../dist/shared/errors/AppError"));

var _typeorm = require("typeorm");

var _Agendamento = _interopRequireDefault(require("../entities/Agendamento"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable camelcase */
class AgendamentoRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Agendamento.default);
  }

  async create(data) {
    const agendamento = this.ormRepository.create({
      provider_id: data.provider_id,
      user_id: data.user_id,
      from: data.from,
      user_name: data.user_name,
      telefone: data.telefone,
      avatar: data.avatar,
      at: data.at,
      dia: data.dia,
      mes: data.mes,
      ano: data.ano,
      service: data.service
    });
    await this.ormRepository.save(agendamento);
    return agendamento;
  }

  async findAgenndamentosDoDia(dia, mes, provider_id) {
    const agenda = await this.ormRepository.find({
      where: {
        dia,
        mes,
        provider_id
      }
    });
    return agenda;
  }

  async delete(id) {
    const del = await this.ormRepository.findOne({
      where: {
        id
      }
    });

    if (!del) {
      throw new _AppError.default("not exist");
    }

    await this.ormRepository.remove(del);
  }

  async findTodosAgendamentos() {
    const agendo = await this.ormRepository.find();
    return agendo;
  }

  async findTodosAgendamentosUser(user_id) {
    const agenda = await this.ormRepository.find({
      where: {
        user_id
      },
      relations: ["provider"]
    });
    return agenda;
  }

  async findTodosAgendamentosPrestador(provider_id) {
    const agenda = await this.ormRepository.find({
      where: {
        provider_id
      },
      relations: ["user"]
    });
    return agenda;
  }

}

exports.default = AgendamentoRepository;