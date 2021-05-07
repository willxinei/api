import { inject, injectable } from "tsyringe";
import Agendamentos from "../infra/typeorm/entities/Agendamento";
import { IAgendamentoRepository } from "../repositories/IAgendamentoRespository";
import IServiceRepository from "../repositories/IServiceRepository";

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
      private serviceRepository: IServiceRepository
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

      console.log(agendaDodia);

      // const services = await this.serviceRepository.findUniqService(
      //    provider_id,
      //    service
      // );

      const agendamento = this.agendamentoRepository.create({
         provider_id,
         user_id,
         service,
         from,
         at: from,
         dia,
         mes,
         ano,
      });

      return agendamento;
   }
}
