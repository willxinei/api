import CrateUserService from "@modules/users/services/CreateUserService";
import AppError from "@shared/errors/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class UserController {
   public async create(req: Request, res: Response): Promise<Response> {
      try {
         const { name, email, telefone, password, prestador } = req.body;

         const create = container.resolve(CrateUserService);

         const user = await create.execute({
            name,
            email,
            telefone,
            password,
            prestador,
         });

         return res.json(user);
      } catch (err) {
         return res.status(400).send(err.message);
      }
   }
}
