import AppError from "@shared/errors/AppError";
import { getDate } from "date-fns";
import { inject, injectable } from "tsyringe";
import Agendamentos from "../infra/typeorm/entities/Agendamento";
import { IAgendamentoRepository } from "../repositories/IAgendamentoRespository";

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

      const agenda = agendamento.map((a, b) => {
         const ag = sortAgenda(a.from, a.from);
         const [hour, minutes] = a.from.split(":").map(String);
         a.from = hour;
         return a;
      });
      console.log(
         agenda.sort((a, b) => {
            return a - b;
         })
      );

      return agendamento;
   }
}
