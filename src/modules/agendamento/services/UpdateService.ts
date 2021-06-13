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
export default class UpdateServices {
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
      const ser = await this.serviceRepository.findUniqService(
         provider_id,
         service
      );

      if (!ser) {
         throw new AppError("servicço nao existe");
      }

      ser.service = service;
      ser.time = time;
      ser.value = value;
      ser.description = description;

      return this.serviceRepository.save(ser);
   }
}
