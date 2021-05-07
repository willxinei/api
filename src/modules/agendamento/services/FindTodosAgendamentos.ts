import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import Agendamentos from "../infra/typeorm/entities/Agendamento";
import { IAgendamentoRepository } from "../repositories/IAgendamentoRespository";

@injectable()
export default class FindTodosAgendamentos {
   constructor(
      @inject("AgendamentoRepository")
      private agendamentoRepository: IAgendamentoRepository
   ) {}

   public async execute(): Promise<Agendamentos[]> {
      const agenda = await this.agendamentoRepository.findTodosAgendamentos();

      if (!agenda) {
         throw new AppError("Nenhum agendamento disponivel");
      }

      return agenda;
   }
}
