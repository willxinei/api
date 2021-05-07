import { inject, injectable } from "tsyringe";
import Service from "../infra/typeorm/entities/Service";
import IServiceRepository from "../repositories/IServiceRepository";

interface IRequest {
   provider_id: string;
}
@injectable()
export default class FindServiçoService {
   constructor(
      @inject("ServiceRepository")
      private serviceRepository: IServiceRepository
   ) {}

   public async execute({ provider_id }: IRequest): Promise<Service[]> {
      const find = await this.serviceRepository.listService(provider_id);

      return find;
   }
}
