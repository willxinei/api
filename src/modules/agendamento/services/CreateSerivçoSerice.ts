import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IServiceDTO } from "../dtos/IServiceDTO";
import Service from "../infra/typeorm/entities/Service";
import IServiceRepository from "../repositories/IServiceRepository";

interface IRequest {
   provider_id: string;
   service: string;
   description: string;
   time: string;
   value: number;
}
@injectable()
export default class CreateServiçoService {
   constructor(
      @inject("ServiceRepository")
      private serviceRepository: IServiceRepository
   ) {}

   public async execute({
      provider_id,
      service,
      description,
      time,
      value,
   }: IRequest): Promise<Service> {
      const ser = await this.serviceRepository.findUniqService(service);
      const pro = await this.serviceRepository.findUniqProvider(provider_id);

      console.log(pro);

      if (pro && ser) {
         throw new AppError("Serviço ja existe");
      }

      const serviço = await this.serviceRepository.create({
         provider_id,
         service,
         description,
         time,
         value,
      });

      return serviço;
   }
}
