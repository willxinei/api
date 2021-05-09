import IFindAllProvidersDTO from "@modules/users/dtos/IFindAllProvidersDTO";
import IUsersDTO from "@modules/users/dtos/UsersDTO";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import { getRepository, Repository } from "typeorm";
import User from "../entities/Users";

export default class UsersRepository implements IUsersRepository {
   private ormrepository: Repository<User>;

   constructor() {
      this.ormrepository = getRepository(User);
   }

   public async findTodosPrestadores({
      prestador,
   }: IFindAllProvidersDTO): Promise<User[]> {
      const find = await this.ormrepository.find({ where: { prestador } });
      return find;
   }

   public async create(data: IUsersDTO): Promise<User> {
      const user = this.ormrepository.create({
         name: data.name,
         email: data.email,
         telefone: data.telefone,
         password: data.password,
         prestador: data.prestador,
      });

      await this.ormrepository.save(user);

      return user;
   }

   public async findByEmail(email: string): Promise<User | undefined> {
      const user = await this.ormrepository.findOne({
         where: { email },
      });

      return user;
   }

   public async findById(id: string): Promise<User | undefined> {
      const user = await this.ormrepository.findOne(id);

      return user;
   }

   public async save(user: User): Promise<User> {
      return this.ormrepository.save(user);
   }
}
