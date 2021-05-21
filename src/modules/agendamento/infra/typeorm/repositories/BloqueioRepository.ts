import IBloqueioRepository from "@modules/agendamento/repositories/IBloqueioRepository";
import { getRepository, Repository } from "typeorm";
import Bloqueio from "../entities/Bloqueio";

export default class BloqueioRepository implements IBloqueioRepository {
   private ormRepository: Repository<Bloqueio>;

   constructor() {
      this.ormRepository = getRepository(Bloqueio);
   }

   public async create(
      provider_id: string,
      from: string,
      at: string,
      dia: number,
      mes: number
   ): Promise<Bloqueio> {
      const create = this.ormRepository.create({
         provider_id,
         at,
         from,
         dia,
         mes,
      });

      await this.ormRepository.save(create);

      return create;
   }

   public async findBloqueio(
      provider_id: string,
      dia: number,
      mes: number
   ): Promise<Bloqueio | undefined> {
      const find = await this.ormRepository.findOne({
         where: {
            provider_id,
            dia,
            mes,
         },
      });

      return find;
   }
}
