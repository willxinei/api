import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import User from "../infra/typeorm/entities/Users";
import IUsersRepository from "../repositories/IUsersRepository";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";

interface IRequest {
   user_id: string;
   name: string;
   email: string;
   telefone: number;
   old_password?: string;
   password?: string;
}

@injectable()
class UpdateProfileService {
   constructor(
      @inject("UserRepository")
      private userRepository: IUsersRepository,

      @inject("HashProvider")
      private hashProvider: IHashProvider
   ) {}

   public async execute({
      user_id,
      name,
      email,
      telefone,
      password,
      old_password,
   }: IRequest): Promise<User> {
      const user = await this.userRepository.findById(user_id);

      if (!user) {
         throw new AppError("Usuario nao existe");
      }

      const userEmail = await this.userRepository.findByEmail(email);

      if (userEmail && userEmail.id !== user_id) {
         throw new AppError("E-mail ja esta em uso");
      }

      user.name = name;
      user.email = email;
      user.telefone = telefone;

      if (password && !old_password) {
         throw new AppError("voce precisa informar sua senha antiga");
      }

      if (password && old_password) {
         const checkOld = await this.hashProvider.compareHah(
            old_password,
            user.password
         );

         if (!checkOld) {
            throw new AppError("Senha antiga nao confere");
         }
         user.password = await this.hashProvider.generateHah(password);
      }

      return this.userRepository.save(user);
   }
}

export default UpdateProfileService;
