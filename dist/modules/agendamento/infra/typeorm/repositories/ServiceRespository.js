"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Service = _interopRequireDefault(require("../entities/Service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ServiceRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Service.default);
  }

  async findUniqService(provider_id, service) {
    const find = await this.ormRepository.findOne({
      where: {
        provider_id,
        service
      }
    });
    return find;
  }

  async listService(provider_id) {
    const find = await this.ormRepository.find({
      where: {
        provider_id
      }
    });
    return find;
  }

  async create(data) {
    const service = this.ormRepository.create({
      provider_id: data.provider_id,
      description: data.description,
      value: data.value,
      time: data.time,
      service: data.service
    });
    await this.ormRepository.save(service);
    return service;
  }

}

exports.default = ServiceRepository;