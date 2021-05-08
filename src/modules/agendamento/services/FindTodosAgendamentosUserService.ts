import AppError from "@shared/errors/AppError";
import { format, getDate } from "date-fns";
import { inject, injectable } from "tsyringe";
import Agendamentos from "../infra/typeorm/entities/Agendamento";
import { IAgendamentoRepository } from "../repositories/IAgendamentoRespository";

type Ihorarios = Array<{
   id: string;
   name: string;
   from: string;
   at: string;
   dia: number;
   mes: number;
   ano: number;
}>;
@injectable()
export default class FindTodosAgendamentosUserSerice {
   constructor(
      @inject("AgendamentoRepository")
      private agendamentoRepository: IAgendamentoRepository
   ) {}

   public async execute(user_id: string): Promise<Agendamentos[]> {
      const agendamento = await this.agendamentoRepository.findTodosAgendamentosUser(
         user_id
      );

      if (!agendamento) {
         throw new AppError("sem agendamento");
      }

      function sortAgenda(a: any, b: any) {
         return a - b;
      }

      // const [hour, minutes] = time.split(":").map(Number);

      const agenda = agendamento.sort((a, b) => {
         return a.from - b.from;
      });

      const agendaFormatada = agenda.map((h) => {
         const dateFrom = new Date(h.ano, h.mes - 1, h.dia, 0, h.from, 0);
         const dateAt = new Date(h.ano, h.mes - 1, h.dia, 0, h.at, 0);
         const fromFormated = format(dateFrom, "HH:00");
         const atFormated = format(dateAt, "HH:00");
         h.from = fromFormated;
         h.at = atFormated;
         return h;
      });
      console.log(agendaFormatada);

      return agendaFormatada;
   }
}
