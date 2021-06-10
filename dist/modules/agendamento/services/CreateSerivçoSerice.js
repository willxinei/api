"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _tsyringe = require("tsyringe");

var _IServiceRepository = _interopRequireDefault(require("../repositories/IServiceRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateServiçoService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("ServiceRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IServiceRepository.default === "undefined" ? Object : _IServiceRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateServiçoService {
  constructor(serviceRepository) {
    this.serviceRepository = serviceRepository;
  }

  async execute({
    provider_id,
    service,
    description,
    time,
    value
  }) {
    const ser = await this.serviceRepository.findUniqService(provider_id, service);
    console.log(ser);

    if (ser) {
      throw new _AppError.default("Serviço ja existe");
    }

    const serviço = await this.serviceRepository.create({
      provider_id,
      service,
      description,
      time,
      value
    });
    return serviço;
  }

}) || _class) || _class) || _class) || _class);
exports.default = CreateServiçoService;