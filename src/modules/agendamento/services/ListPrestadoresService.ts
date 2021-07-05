import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import { Users } from "@prisma/client";
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

   public async execute({ user_id }: IRequest): Promise<Users[]> {
      let users = await this.cacheProvider.recover<Users[]>(
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
