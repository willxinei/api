import IBloqueioRepository from "@modules/agendamento/repositories/IBloqueioRepository";
import { bloqueio, PrismaClient } from "@prisma/client";
import { getRepository, Repository } from "typeorm";

export default class BloqueioRepository implements IBloqueioRepository {
   private prisma = new PrismaClient();

   public async create(
      provider_id: string,
      from: string,
      at: string,
      dia: number,
      mes: number
   ): Promise<bloqueio> {
      const bloc = await this.prisma.bloqueio.create({
         data: {
            provider_id,
            at,
            from,
            dia,
            mes,
         },
      });

      return bloc;
   }

   public async findBloqueio(
      provider_id: string,
      dia: number,
      mes: number
   ): Promise<bloqueio | null> {
      const find = await this.prisma.bloqueio.findFirst({
         where: {
            provider_id,
            dia,
            mes,
         },
      });

      return find;
   }
}
