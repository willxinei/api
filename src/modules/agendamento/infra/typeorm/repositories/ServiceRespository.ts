import { IServiceDTO } from "@modules/agendamento/dtos/IServiceDTO";
import IServiceRepository from "@modules/agendamento/repositories/IServiceRepository";
import AppError from "@shared/errors/AppError";
import { getRepository, Repository } from "typeorm";
import Service from "../entities/Service";

export default class ServiceRepository implements IServiceRepository {
   private ormRepository: Repository<Service>;

   constructor() {
      this.ormRepository = getRepository(Service);
   }

   public async listService(provider_id: string): Promise<Service[]> {
      const find = await this.ormRepository.find({
         where: { provider_id },
      });

      return find;
   }

   public async create(data: IServiceDTO): Promise<Service> {
      const service = this.ormRepository.create({
         provider_id: data.provider_id,
         description: data.description,
         value: data.value,
         time: data.time,
         service: data.service,
      });

      await this.ormRepository.save(service);

      return service;
   }

   public async findUniqService(service: string): Promise<Service | undefined> {
      const findService = await this.ormRepository.findOne({
         where: { service },
      });

      return findService;
   }

   public async findUniqProvider(
      provider_id: string
   ): Promise<Service | undefined> {
      const findService = await this.ormRepository.findOne({
         where: { provider_id },
      });

      return findService;
   }
}
