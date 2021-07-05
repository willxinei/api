import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import IStorageProvider from "@shared/container/providers/StorageProvider/models/IStorageProviders";
import { Users } from "@prisma/client";
import IUsersRepository from "../repositories/IUsersRepository";

interface IRequest {
   user_id: string;
   avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
   constructor(
      @inject("UserRepository")
      private userRepository: IUsersRepository,

      @inject("StorageProvider")
      private storageProvider: IStorageProvider
   ) {}

   public async execute({ user_id, avatarFilename }: IRequest): Promise<Users> {
      const user = await this.userRepository.findById(user_id);

      if (!user) {
         throw new AppError("usuario nao encontrado");
      }

      if (user.avatar) {
         await this.storageProvider.deleteFile(user.avatar);
      }

      const filename = await this.storageProvider.saveFile(avatarFilename);

      user.avatar = filename;

      return user;
   }
}

export default UpdateUserAvatarService;
