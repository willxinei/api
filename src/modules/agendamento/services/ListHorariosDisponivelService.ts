/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/ban-types */
import AppError from "@shared/errors/AppError";
import { isAfter, getMinutes, format, toDate } from "date-fns";
import ptBR from "date-fns/esm/locale/pt-BR/index.js";

import { inject, injectable } from "tsyringe";
import { IAgendamentoRepository } from "../repositories/IAgendamentoRespository";
import IBloqueioRepository from "../repositories/IBloqueioRepository";
import IServiceRepository from "../repositories/IServiceRepository";

interface IRequest {
   provider_id: string;
   service: string;
   dia: number;
   mes: number;
   ano: number;
}

type Ihorarios = Array<{}>;

@injectable()
export default class ListHorarioDiponilvelService {
   constructor(
      @inject("AgendamentoRepository")
      private agendamentoRepository: IAgendamentoRepository,

      @inject("ServiceRepository")
      private serviceRepository: IServiceRepository,

      @inject("BloqueioRepostory")
      private bloquioRepository: IBloqueioRepository
   ) {}

   public async exec({
      provider_id,
      service,
      dia,
      mes,
      ano,
   }: IRequest): Promise<Ihorarios> {
      const horarios: number[] = [];

      function convertHours(time: string) {
         const [hour, minutes] = time.split(":").map(Number);
         const timeInMinutes = hour * 60 + minutes;
         return timeInMinutes;
      }

      function rangeHorario(start: number, stop: number) {
         stop = stop === undefined ? start : stop;
         start = stop === start ? 1 : start;

         const length = stop - start + 1;

         const mapFn = (_: number, i: number) => start + i;

         const horarios = Array.from({ length }, mapFn);
      }

      const findSercies = await this.serviceRepository.findUniqService(
         provider_id,
         service
      );

      if (!findSercies) {
         throw new AppError("Esse serviço nao existe");
      }

      const tempo = convertHours(findSercies?.time);
      const time = getMinutes(new Date(2000, 2, 2, 10, tempo - 1, 0, 0));

      const appointments = await this.agendamentoRepository.findAgenndamentosDoDia(
         dia,
         mes,
         provider_id
      );

      console.log(horarios);

      const horaStartAgenda = appointments.map((h) => {
         return h.from;
      });
      horaStartAgenda.sort((a, b) => {
         return a - b;
      });

      const horafim = appointments.map((h) => {
         // const horaReduzida = convertHours(h.at);

         return h.at;
      });
      horafim.sort((a, b) => {
         return a - b;
      });

      const inicioLeng = horaStartAgenda.length - 1;

      if (findSercies.service === service) {
         const hora: number[] = [];

         let indice = -1;
         while (indice < inicioLeng) {
            indice += 1;
            const inicio = horaStartAgenda[indice + 1] + 1;
            let fim = horafim[indice];
            while (fim < inicio) {
               fim += 1;
               if (fim + tempo < inicio) {
                  hora.push(fim);
               }
            }
         }

         rangeHorario(480, 660);

         let indCont = -tempo;
         while (indCont < hora[hora.length - 1]) {
            indCont += tempo;
            if (hora[indCont] !== undefined) {
               horarios.push(hora[indCont]);
            }
         }

         if (horaStartAgenda[0] === undefined) {
            let conte = 480 - tempo;
            while (conte < 1140) {
               conte += tempo;
               horarios.push(conte);
            }
         }

         if (horaStartAgenda[0] > 780) {
            let con = 480 - tempo;
            const or: number[] = [];
            const horaMI = horaStartAgenda[0] - tempo;
            while (con < horaMI) {
               con += tempo;
               or.push(con);
            }
            or.filter((h) => {
               if (h + time < horaStartAgenda[0]) {
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
      }

      horarios.sort((a, b) => {
         return a - b;
      });

      const findBloqueio = await this.bloquioRepository.findBloqueio(
         provider_id,
         dia,
         mes
      );

      const bloqueio: number[] = [];
      if (findBloqueio) {
         let from = convertHours(findBloqueio.from) - 1;
         const at = convertHours(findBloqueio.at) - 1;
         while (from < at) {
            from += 1;
            bloqueio.push(from);
         }
      }

      const horariosBloqueados = horarios.filter((h) => {
         const bk = bloqueio.find((d) => {
            return h === d;
         });
         return h !== bk;
      });

      const hor = horariosBloqueados.map((h) => {
         const hourCorrent = new Date(Date.now());
         hourCorrent.setMinutes(-(3 * 60));

         const event = new Date(ano, mes - 1, dia, 0, h, 0);

         const formated = format(event, "HH:mm");
         let week = format(event, "i");
         if (week === "7") {
            week = false;
         } else {
            week = true;
         }

         return {
            hour: formated,
            avaliable: isAfter(event, hourCorrent) && week,
         };
      });

      return hor;
   }
}
