/* eslint-disable camelcase */
import { ICreateAgendamentoDTO } from "../dtos/ICreateAgendamentoDTO";
import Agendamentos from "../infra/typeorm/entities/Agendamento";

export interface IAgendamentoRepository {
   create(data: ICreateAgendamentoDTO): Promise<Agendamentos>;
   findAgenndamentosDoDia(
      dia: number,
      mes: number,
      provider_id: string
   ): Promise<Agendamentos[]>;
   delete(id: string): Promise<void>;
   findTodosAgendamentos(): Promise<Agendamentos[]>;
   findTodosAgendamentosUser(user_id: string): Promise<Agendamentos[]>;
   findTodosAgendamentosPrestador(provider_id: string): Promise<Agendamentos[]>;
}
