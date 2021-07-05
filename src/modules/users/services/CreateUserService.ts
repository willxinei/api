import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";
import { Users } from "@prisma/client";
import IUsersDTO from "../dtos/UsersDTO";
import IUsersRepository from "../repositories/IUsersRepository";

@injectable()
class CrateUserService {
   constructor(
      @inject("UserRepository")
      private userrepository: IUsersRepository
   ) {}

   public async execute({
      nome,
      email,
      telefone,
      senha,
      prestador,
   }: IUsersDTO): Promise<Users> {
      const findUser = await this.userrepository.findByEmail(email);

      if (findUser) {
         throw new AppError("Email ja existe");
      }

      const hashd = await hash(senha, 8);
      const user = await this.userrepository.create({
         nome,
         email,
         telefone,
         senha: hashd,
         prestador,
      });

      return user;
   }
}

export default CrateUserService;
