import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import Agendamentos from "../infra/typeorm/entities/Agendamento";
import { IAgendamentoRepository } from "../repositories/IAgendamentoRespository";

@injectable()
export default class FindTodosAgendamentosPrestadorSerice {
   constructor(
      @inject("AgendamentoRepository")
      private agendamentoRepository: IAgendamentoRepository
   ) {}

   public async execute(provider_id: string): Promise<Agendamentos[]> {
      const agendamento = await this.agendamentoRepository.findTodosAgendamentosPrestador(
         provider_id
      );

      if (!agendamento) {
         throw new AppError("sem agendamento");
      }

      const agenda = agendamento.sort((a, b) => {
         return a.from - b.from;
      });

      agenda.sort((a, b) => {
         return a.dia - b.dia;
      });

      return agenda;
   }
}
