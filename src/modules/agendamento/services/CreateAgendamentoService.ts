import INotification from "@modules/notifications/repositories/INotificationsReposiotry";
import ICacheProvider from "@shared/container/providers/CashProvider/models/ICachProvider";
import AppError from "@shared/errors/AppError";
import { format, isBefore } from "date-fns";
import { inject, injectable } from "tsyringe";
import Agendamentos from "../infra/typeorm/entities/Agendamento";
import { IAgendamentoRepository } from "../repositories/IAgendamentoRespository";
import IServiceRepository from "../repositories/IServiceRepository";
import convertHours from "./utils/ConvertHourToMinutes";

interface IRequest {
   provider_id: string;
   user_id: string;
   service: string;
   from: string;
   at: string;
   dia: number;
   mes: number;
   ano: number;
}

@injectable()
export default class CreateAgendamentoService {
   constructor(
      @inject("AgendamentoRepository")
      private agendamentoRepository: IAgendamentoRepository,

      @inject("ServiceRepository")
      private serviceRepository: IServiceRepository,

      @inject("NotificationRepository")
      private notificationRepository: INotification,

      @inject("CacheProvider")
      private cacheProvider: ICacheProvider
   ) {}

   public async execute({
      provider_id,
      user_id,
      service,
      from,
      dia,
      mes,
      ano,
   }: IRequest): Promise<Agendamentos> {
      const agendaDodia = await this.agendamentoRepository.findAgenndamentosDoDia(
         dia,
         mes,
         provider_id
      );

      const findServices = await this.serviceRepository.findUniqService(
         provider_id,
         service
      );

      const tempo = findServices?.time as string;

      console.log(findServices?.time);
      const hour = convertHours(from);
      const endHour = convertHours(tempo) + hour;

      if (!findServices) {
         throw new AppError("esse servico nao existe");
      }

      const hourFrom: string[] = [];
      const hourtAt: string[] = [];

      const f = agendaDodia.map((h) => {
         const conver = convertHours(h.from);
         return conver;
      });

      const horaFinal: number[] = [];
      agendaDodia.map((hou) => {
         const convert = convertHours(hou.at);
         horaFinal.push(convert);
      });

      if (findServices.service === service) {
         const minIn = format(new Date(2000, 2, 2, 0, hour, 0, 0), "HH:mm");
         const horaA = format(
            new Date(2000, 2, 2, 0, endHour - 1, 0, 0),
            "HH:mm"
         );

         hourFrom.push(minIn);
         hourtAt.push(horaA);

         const inLeng = f.length - 1;
         let indice = -1;
         const horarioJaAgendados: number[] = [];

         while (indice < inLeng) {
            indice += 1;
            while (f[indice] < horaFinal[indice]) {
               f[indice] += 1;
               horarioJaAgendados.push(f[indice]);
            }
         }

         let h = hour;

         const horasFrom: number[] = [];
         while (h < endHour) {
            h += 1;
            horasFrom.push(h);
         }

         horarioJaAgendados.map((ho) => {
            horasFrom.map((p) => {
               if (ho === p) {
                  throw new AppError("Esse horário ja esta marcado");
               }
            });
         });
      }

      const date = new Date(ano, mes - 1, dia, 0, hour);

      if (isBefore(date, Date.now())) {
         throw new AppError(
            "Você não pode agendar um horario em horas ja passadas"
         );
      }

      if (user_id === provider_id) {
         throw new AppError("Você não pode agendar um horario para voce mesmo");
      }

      const appointment = this.agendamentoRepository.create({
         provider_id,
         user_id,
         from: hourFrom[0],
         at: hourtAt[0],
         dia,
         mes,
         ano,
         service,
      });

      const dateFormatted = format(date, "dd/MMM/yyyy 'ás' HH:mm");

      await this.notificationRepository.create({
         recipient_id: provider_id,
         content: `Novo agendameto de ${service} para o dia ${dateFormatted}`,
      });

      await this.cacheProvider.invalidate(
         `provider-appointments:${provider_id}:${format(hour, "yyyy-M-d")}`
      );

      return appointment;
   }
}
