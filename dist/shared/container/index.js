"use strict";

var _AgendamentoRepository = _interopRequireDefault(require("../../modules/agendamento/infra/typeorm/repositories/AgendamentoRepository"));

var _ServiceRespository = _interopRequireDefault(require("../../modules/agendamento/infra/typeorm/repositories/ServiceRespository"));

var _UsersRepository = _interopRequireDefault(require("../../modules/users/infra/typeorm/repositories/UsersRepository"));

var _tsyringe = require("tsyringe");

require("./providers");

require("../../modules/users/providers");

var _NotificationRepository = _interopRequireDefault(require("../../modules/notifications/infra/typeorm/repositories/NotificationRepository"));

var _UserTokenRepository = _interopRequireDefault(require("../../modules/users/infra/typeorm/repositories/UserTokenRepository"));

var _BloqueioRepository = _interopRequireDefault(require("../../modules/agendamento/infra/typeorm/repositories/BloqueioRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton("AgendamentoRepository", _AgendamentoRepository.default);

_tsyringe.container.registerSingleton("ServiceRepository", _ServiceRespository.default);

_tsyringe.container.registerSingleton("BloqueioRepostory", _BloqueioRepository.default);

_tsyringe.container.registerSingleton("UserRepository", _UsersRepository.default);

_tsyringe.container.registerSingleton("UserToken", _UserTokenRepository.default);

_tsyringe.container.registerSingleton("NotificationRepository", _NotificationRepository.default);