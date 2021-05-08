/* eslint-disable @typescript-eslint/ban-types */
import AppError from "@shared/errors/AppError";
import { isAfter, getMinutes, format } from "date-fns";

import { inject, injectable } from "tsyringe";
import { IAgendamentoRepository } from "../repositories/IAgendamentoRespository";
import IServiceRepository from "../repositories/IServiceRepository";
import convertHours from "./utils/ConvertHourToMinutes";

interface IRequest {
   provider_id: string;
   service: string;
   dia: number;
   mes: number;
   ano: number;
}

type Ihorarios = Array<{}>;

@injectable()
export default class DiasDisponivelService {
   constructor(
      @inject("AppointmentRepository")
      private agendamentoRepository: IAgendamentoRepository,

      @inject("ServiceRepository")
      private serviceRepository: IServiceRepository
   ) {}

   public async exec({
      provider_id,
      service,
      dia,
      mes,
      ano,
   }: IRequest): Promise<Ihorarios> {
      const horarios = [];

      const findSercies = await this.serviceRepository.findUniqService(
         provider_id,
         service
      );

      if (findSercies === undefined) {
         throw new AppError("Esse serviço nao existe");
      }

      const tempo = convertHours(findSercies.time);
      const time = getMinutes(new Date(2000, 2, 2, 10, tempo - 1, 0, 0));

      const appointments = await this.agendamentoRepository.findAgenndamentosDoDia(
         dia,
         mes,
         provider_id
      );

      const horaInicio = appointments.map((h) => {
         const horaReduzida = convertHours(h.from);
         return horaReduzida;
      });
      horaInicio.sort((a, b) => {
         return a - b;
      });

      const horafim = appointments.map((h) => {
         const horaReduzida = convertHours(h.at);

         return horaReduzida;
      });
      horafim.sort((a, b) => {
         return a - b;
      });

      const inicioLeng = horaInicio.length - 1;

      if (findSercies.service === service) {
         const hora: number[] = [];

         const indice = -1;
         while (indice < inicioLeng) {
            indice += 1;
            const inicio = horaInicio[indice + 1] + 1;
            let fim = horafim[indice];
            while (fim < inicio) {
               fim += 1;
               if (fim + tempo < inicio) {
                  hora.push(fim);
               }
            }
         }

         let indCont = -tempo;
         while (indCont < hora[hora.length - 1]) {
            indCont += tempo;
            if (hora[indCont] !== undefined) {
               horarios.push(hora[indCont]);
            }
         }

         if (horaInicio[0] === undefined) {
            let conte = 780 - tempo;
            while (conte < 1140) {
               conte += tempo;
               horarios.push(conte);
            }
         }

         if (horaInicio[0] > 780) {
            let con = 780 - tempo;
            const or: number[] = [];
            const horaMI = horaInicio[0] - tempo;
            while (con < horaMI) {
               con += tempo;
               or.push(con);
            }
            or.filter((h) => {
               if (h + time < horaInicio[0]) {
                  horarios.push(h);
               }
            });
         }

         let hormin = horafim[horafim.length - 1] + 1 - tempo;
         for (hormin; hormin < 1140; ) {
            hormin += tempo;
            if (hormin <= 1140) {
               horarios.push(hormin);
            }
         }

         // const eachDay = Array.from(
         //    { length: 1140 - 780 },
         //    (_, index) => index + 780,
         // );

         // eachDay.splice(eachDay.indexOf(horaInicio[0]), time + 1);

         // const cont = 0;

         // for (let i = -1; i < eachDay.length - 1; ) {
         //    i += 1;
         //    console.log(horaInicio[i]);
         // }
      }

      horarios.sort((a, b) => {
         return a - b;
      });

      const hor = horarios.map((h) => {
         const hourCorrent = new Date(Date.now());
         const event = new Date(ano, mes - 1, dia, 0, h, 0);
         const formated = format(event, "HH:mm");
         let week = format(event, "i");
         if (week === "7") {
            week = false;
         } else {
            week = true;
         }
         console.log(event);
         return {
            hour: formated,
            avaliable: isAfter(event, hourCorrent) && week,
         };
      });

      return hor;
   }
}
