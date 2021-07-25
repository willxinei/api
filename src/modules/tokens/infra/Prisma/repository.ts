/* eslint-disable import/prefer-default-export */
import { ITokensDTO } from "@modules/tokens/DTOs/ITokensDTO";
import { ITokenRepository } from "@modules/tokens/repositories/ITokenRepository";
import { PrismaClient, Tokens } from "@prisma/client";

export class TokenRepository implements ITokenRepository {
   private prisma = new PrismaClient();

   public async create(data: ITokensDTO): Promise<Tokens> {
      const create = await this.prisma.tokens.create({
         data: {
            token: data.token,
            prestador_id: data.prestador_id,
            user_id: data.user_id,
         },
      });

      return create;
   }
}
