import { Services } from "@prisma/client";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
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
   }: IRequest): Promise<Services> {
      const ser = await this.serviceRepository.findUniqService(
         provider_id,
         service
      );

      console.log(ser);
      if (ser) {
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
