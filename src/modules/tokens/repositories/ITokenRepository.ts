import { Tokens } from "@prisma/client";

import { ITokensDTO } from "../DTOs/ITokensDTO";

export interface ITokenRepository {
   create(data: ITokensDTO): Promise<Tokens>;
   findByid(prestador: string): Promise<Tokens[]>;
}
