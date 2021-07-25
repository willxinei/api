/* eslint-disable import/prefer-default-export */
import IPrestadorRepository from "@modules/prestador/repositories/IPrestadorRepository";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import { Tokens } from "@prisma/client";
import AppError from "@shared/errors/AppError";
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
      const find = await this.tokenRepository.findByid(prestador_id);

      if (find) {
         throw new AppError("Token ja cadastrado");
      }
      const create = await this.tokenRepository.create({
         token,
         prestador_id,
      });

      return create;
   }
}
