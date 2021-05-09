import User from "@modules/users/infra/typeorm/entities/Users";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import ICacheProvider from "@shared/container/providers/CashProvider/models/ICachProvider";
import { classToClass } from "class-transformer";
import { inject, injectable } from "tsyringe";
import { IAgendamentoRepository } from "../repositories/IAgendamentoRespository";

interface IRequest {
   user_id: string;
}
@injectable()
export default class ListPrestadoresService {
   constructor(
      @inject("UserRepository")
      private userRepository: IUsersRepository,

      @inject("CacheProvider")
      private cacheProvider: ICacheProvider
   ) {}

   public async execute({ user_id }: IRequest): Promise<User[]> {
      let users = await this.cacheProvider.recover<User[]>(
         `providers-list:${user_id}`
      );

      if (!users) {
         users = await this.userRepository.findTodosPrestadores({
            prestador: true,
         });

         await this.cacheProvider.save(
            `providers-list:${user_id},`,
            classToClass(users)
         );
      }

      return users;
   }
}
