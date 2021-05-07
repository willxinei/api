import AppError from "@shared/errors/AppError";
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

      return agendamento;
   }
}
