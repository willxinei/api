/* eslint-disable import/prefer-default-export */
import IPrestadorRepository from "@modules/prestador/repositories/IPrestadorRepository";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import { Tokens } from "@prisma/client";
import { inject, injectable } from "tsyringe";

import { ITokensDTO } from "../DTOs/ITokensDTO";
import { ITokenRepository } from "../repositories/ITokenRepository";

interface Request {
   token: string;
   prestador_id: string;
}

@injectable()
export class CreateTokenService {
   constructor(
      @inject("PrestadorRepository")
      private prestadorRepository: IPrestadorRepository,

      @inject("UserRepository")
      private userRepository: IUsersRepository,

      @inject("TokenRepository")
      private tokenRepository: ITokenRepository
   ) {}

   public async execute({ token, prestador_id }: Request): Promise<Tokens> {
      const create = await this.tokenRepository.create({
         token,
         prestador_id,
      });

      return create;
   }
}
