import UpdateUserAvatarService from "@modules/users/services/UpdateUserAvatarServices";
import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class UpdateAvatercontrller {
   public async update(req: Request, res: Response): Promise<Response> {
      const updateUserAvatar = container.resolve(UpdateUserAvatarService);
      const user = await updateUserAvatar.execute({
         user_id: req.user.id,
         avatarFilename: req.file.filename,
      });

      return res.json(classToClass(user));
   }
}
