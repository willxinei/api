import IPrestadorRepository from "@modules/prestador/repositories/IPrestadorRepository";
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
      private serviceRepository: IServiceRepository,

      @inject("PrestadorRepository")
      private prestadorRepository: IPrestadorRepository
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

<<<<<<< HEAD
      const pres = await this.prestadorRepository.findById(provider_id);

      console.log(pres);

=======
      console.log(ser);
>>>>>>> 0873be1e3db527e711a9faacac6e91fef06b25eb
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

      console.log(serviço);

      return serviço;
   }
}
