"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Bloqueio = _interopRequireDefault(require("../entities/Bloqueio"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BloqueioRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Bloqueio.default);
  }

  async create(provider_id, from, at, dia, mes) {
    const create = this.ormRepository.create({
      provider_id,
      at,
      from,
      dia,
      mes
    });
    await this.ormRepository.save(create);
    return create;
  }

  async findBloqueio(provider_id, dia, mes) {
    const find = await this.ormRepository.findOne({
      where: {
        provider_id,
        dia,
        mes
      }
    });
    return find;
  }

}

exports.default = BloqueioRepository;