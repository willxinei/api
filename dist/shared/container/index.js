"use strict";

var _tsyringe = require("tsyringe");

require("./providers");

require("../../modules/users/providers");

var _PrismaUsersRepository = _interopRequireDefault(require("../../modules/users/infra/Prisma/PrismaUsersRepository"));

var _PrestadorRepository = _interopRequireDefault(require("../../modules/prestador/infra/Prisma/PrestadorRepository"));

var _AgendamentoRepository = _interopRequireDefault(require("../../modules/agendamento/infra/Prisma/AgendamentoRepository"));

var _ServiceRespository = _interopRequireDefault(require("../../modules/agendamento/infra/Prisma/ServiceRespository"));

var _BloqueioRepository = _interopRequireDefault(require("../../modules/agendamento/infra/Prisma/BloqueioRepository"));

var _NotificatonRepository = _interopRequireDefault(require("../../modules/notifications/infra/Prisma/NotificatonRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton("AgendamentoRepository", _AgendamentoRepository.default);

_tsyringe.container.registerSingleton("ServiceRepository", _ServiceRespository.default);

_tsyringe.container.registerSingleton("BloqueioRepostory", _BloqueioRepository.default);

_tsyringe.container.registerSingleton("UserRepository", _PrismaUsersRepository.default);

_tsyringe.container.registerSingleton("PrestadorRepository", _PrestadorRepository.default); // container.registerSingleton<IUserTokenRepository>(
//    "UserToken",
//    PrismaTokenRepository
// );


_tsyringe.container.registerSingleton("NotificationRepository", _NotificatonRepository.default);