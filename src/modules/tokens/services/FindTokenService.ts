/* eslint-disable import/prefer-default-export */
import IPrestadorRepository from "@modules/prestador/repositories/IPrestadorRepository";
import { Tokens } from "@prisma/client";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

import { ITokenRepository } from "../repositories/ITokenRepository";

interface Request {
   prestador_id: string;
}
@injectable()
export class FindtokenService {
   constructor(
      @inject("TokenRepository")
      private tokenRepository: ITokenRepository,

      @inject("PrestadorRepository")
      private prestadorRepository: IPrestadorRepository
   ) {}

   public async execute({ prestador_id }: Request): Promise<Tokens[] | null> {
      const token = await this.tokenRepository.findByid(prestador_id);

      return token;
   }
}
