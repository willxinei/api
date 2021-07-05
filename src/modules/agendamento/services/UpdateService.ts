import { Services } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import IServiceRepository from "../repositories/IServiceRepository";

interface IRequest {
   provider_id: string;
   service: string;
   description: string;
   time: string;
   value: Decimal;
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
   }: IRequest): Promise<Services> {
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

      return ser;
   }
}
