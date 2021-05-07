/* eslint-disable camelcase */
import { ICreateAgendamentoDTO } from "@modules/agendamento/dtos/ICreateAgendamentoDTO";
import { IAgendamentoRepository } from "@modules/agendamento/repositories/IAgendamentoRespository";
import AppError from "@shared/errors/AppError";
import { getRepository, Repository } from "typeorm";
import Agendamentos from "../entities/Agendamento";

export default class AgendamentoRepository implements IAgendamentoRepository {
   private ormRepository: Repository<Agendamentos>;

   constructor() {
      this.ormRepository = getRepository(Agendamentos);
   }

   public async create(data: ICreateAgendamentoDTO): Promise<Agendamentos> {
      const agendamento = this.ormRepository.create({
         provider_id: data.provider_id,
         user_id: data.user_id,
         from: data.from,
         at: data.at,
         dia: data.dia,
         mes: data.mes,
         ano: data.ano,
         service: data.service,
      });

      await this.ormRepository.save(agendamento);

      return agendamento;
   }

   public async findAgenndamentosDoDia(
      dia: number,
      mes: number,
      provider_id: string
   ): Promise<Agendamentos[]> {
      const agenda = await this.ormRepository.find({
         where: {
            dia,
            mes,
            provider_id,
         },
      });

      return agenda;
   }

   public async delete(id: string): Promise<void> {
      const del = await this.ormRepository.findOne({ where: { id } });

      if (!del) {
         throw new AppError("not exist");
      }

      await this.ormRepository.remove(del);
   }

   public async findTodosAgendamentos(): Promise<Agendamentos[]> {
      const agendo = await this.ormRepository.find();

      return agendo;
   }

   public async findTodosAgendamentosUser(
      user_id: string
   ): Promise<Agendamentos[]> {
      const agenda = await this.ormRepository.find({ where: { user_id } });

      return agenda;
   }

   public async findTodosAgendamentosPrestador(
      provider_id: string
   ): Promise<Agendamentos[]> {
      const agenda = await this.ormRepository.find({ where: { provider_id } });

      return agenda;
   }
}
