import { IServiceDTO } from "../dtos/IServiceDTO";
import Service from "../infra/typeorm/entities/Service";

export default interface IServiceRepository {
   create(data: IServiceDTO): Promise<Service>;
   findUniqService(
      provider_id: string,
      service: string
   ): Promise<Service | undefined>;
   listService(provider_id: string): Promise<Service[]>;
   save(service: Service): Promise<Service>;
}
