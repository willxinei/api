import IPrestadorRepository from "@modules/prestador/repositories/IPrestadorRepository";
import { IAgendamentoRepository } from "@modules/agendamento/repositories/IAgendamentoRespository";
import IServiceRepository from "@modules/agendamento/repositories/IServiceRepository";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import { container } from "tsyringe";
import "./providers";
import "@modules/users/providers";
import INotification from "@modules/notifications/repositories/INotificationsReposiotry";
import IUserTokenRepository from "@modules/users/repositories/IUserTokenRepository";
import IBloqueioRepository from "@modules/agendamento/repositories/IBloqueioRepository";
import PrismaUsersRepository from "@modules/users/infra/Prisma/PrismaUsersRepository";
import PrestadorRepository from "@modules/prestador/infra/Prisma/PrestadorRepository";
import PrismaTokenRepository from "@modules/users/infra/Prisma/PrismaTokenRepository";
import AgendamentoRepository from "@modules/agendamento/infra/Prisma/AgendamentoRepository";
import ServiceRepository from "@modules/agendamento/infra/Prisma/ServiceRespository";
import BloqueioRepository from "@modules/agendamento/infra/Prisma/BloqueioRepository";
import NotificationsRepository from "@modules/notifications/infra/Prisma/NotificatonRepository";

container.registerSingleton<IAgendamentoRepository>(
   "AgendamentoRepository",
   AgendamentoRepository
);

container.registerSingleton<IServiceRepository>(
   "ServiceRepository",
   ServiceRepository
);

container.registerSingleton<IBloqueioRepository>(
   "BloqueioRepostory",
   BloqueioRepository
);

container.registerSingleton<IUsersRepository>(
   "UserRepository",
   PrismaUsersRepository
);

container.registerSingleton<IPrestadorRepository>(
   "PrestadorRepository",
   PrestadorRepository
);

// container.registerSingleton<IUserTokenRepository>(
//    "UserToken",
//    PrismaTokenRepository
// );

container.registerSingleton<INotification>(
   "NotificationRepository",
   NotificationsRepository
);
