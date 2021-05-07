import IUsersDTO from "../dtos/UsersDTO";
import User from "../infra/typeorm/entities/Users";

export default interface IUsersRepository {
   create(data: IUsersDTO): Promise<User>;
   findByEmail(email: string): Promise<User | undefined>;
   findById(id: string): Promise<User | undefined>;
   save(user: User): Promise<User>;
}
