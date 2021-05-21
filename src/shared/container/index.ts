import AgendamentoRepository from "@modules/agendamento/infra/typeorm/repositories/AgendamentoRepository";
import ServiceRepository from "@modules/agendamento/infra/typeorm/repositories/ServiceRespository";
import { IAgendamentoRepository } from "@modules/agendamento/repositories/IAgendamentoRespository";
import IServiceRepository from "@modules/agendamento/repositories/IServiceRepository";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import UserRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";
import { container } from "tsyringe";
import "./providers";
import "@modules/users/providers";
import INotification from "@modules/notifications/repositories/INotificationsReposiotry";
import NotificationsRepository from "@modules/notifications/infra/typeorm/repositories/NotificationRepository";
import IUserTokenRepository from "@modules/users/repositories/IUserTokenRepository";
import UserTokenRepository from "@modules/users/infra/typeorm/repositories/UserTokenRepository";
import IBloqueioRepository from "@modules/agendamento/repositories/IBloqueioRepository";
import BloqueioRepository from "@modules/agendamento/infra/typeorm/repositories/BloqueioRepository";

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

container.registerSingleton<IUsersRepository>("UserRepository", UserRepository);

container.registerSingleton<IUserTokenRepository>(
   "UserToken",
   UserTokenRepository
);

container.registerSingleton<INotification>(
   "NotificationRepository",
   NotificationsRepository
);
