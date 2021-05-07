import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";
import IUsersDTO from "../dtos/UsersDTO";
import User from "../infra/typeorm/entities/Users";
import IUsersRepository from "../repositories/IUsersRepository";

@injectable()
class CrateUserService {
   constructor(
      @inject("UserRepository")
      private userrepository: IUsersRepository
   ) {}

   public async execute({
      name,
      email,
      telefone,
      password,
      prestador,
   }: IUsersDTO): Promise<User> {
      const findUser = await this.userrepository.findByEmail(email);

      if (findUser) {
         throw new AppError("Email ja existe");
      }

      const hashd = await hash(password, 8);
      const user = await this.userrepository.create({
         name,
         email,
         telefone,
         password: hashd,
         prestador,
      });

      return user;
   }
}

export default CrateUserService;
