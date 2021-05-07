import AuthenticateUserService from "@modules/users/services/AuthenticateUserSercice";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class SessionController {
   public async create(req: Request, res: Response): Promise<Response> {
      try {
         const { email, password } = req.body;

         const auth = container.resolve(AuthenticateUserService);

         const { user, token } = await auth.execute({
            email,
            password,
         });

         return res.json({ user, token });
      } catch (error) {
         return res.status(400).json({ err: error.message });
      }
   }
}
