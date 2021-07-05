import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { isAfter, addHours } from "date-fns";
import IUsersRepository from "../repositories/IUsersRepository";
import IUserTokenRepository from "../repositories/IUserTokenRepository";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";

interface IRequest {
   token: string;
   senha: string;
}

@injectable()
class ResetPasswordService {
   constructor(
      @inject("UserRepository")
      private userRepository: IUsersRepository,

      @inject("UserToken")
      private userToken: IUserTokenRepository,

      @inject("HashProvider")
      private hashProvider: IHashProvider
   ) {}

   public async execute({ token, senha }: IRequest): Promise<void> {
      const usertoken = await this.userToken.findByToken(token);

      if (!usertoken) {
         throw new AppError("token do usuario nao existe");
      }

      const user = await this.userRepository.findById(usertoken.id);

      if (!user) {
         throw new AppError("usuario nao existe");
      }

      const tokenCreateAt = usertoken.created_at;
      const compareDate = addHours(tokenCreateAt, 2);

      if (isAfter(Date.now(), compareDate)) {
         throw new AppError("Token expirado");
      }

      user.senha = await this.hashProvider.generateHah(senha);
   }
}

export default ResetPasswordService;
