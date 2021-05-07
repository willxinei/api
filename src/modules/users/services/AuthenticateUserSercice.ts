import AppError from "@shared/errors/AppError";
import { compare } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { sign } from "jsonwebtoken";
import auth from "@config/auth";
import User from "../infra/typeorm/entities/Users";
import IUsersRepository from "../repositories/IUsersRepository";

interface IResponse {
   user: User;
   token: string;
}

interface IRequest {
   email: string;
   password: string;
}
@injectable()
export default class AuthenticateUserService {
   constructor(
      @inject("UserRepository")
      private userRepository: IUsersRepository
   ) {}

   public async execute({ email, password }: IRequest): Promise<IResponse> {
      const user = await this.userRepository.findByEmail(email);

      if (!user) {
         throw new AppError("email incorreto");
      }

      const compareSenhaa = await compare(password, user.password);

      if (!compareSenhaa) {
         throw new AppError("senha incorreta");
      }

      const token = sign({}, auth.jwt.secret, {
         subject: user.id,
         expiresIn: auth.jwt.expiresIn,
      });

      return { user, token };
   }
}
