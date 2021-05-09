import { Request, Response } from "express";
import { container } from "tsyringe";
import ResetPasswordService from "@modules/users/services/ResetPasswordService";

export default class ResetPasswordController {
   public async create(req: Request, res: Response): Promise<Response> {
      const { token, password } = req.body;

      const sendForgotPasswordEmail = container.resolve(ResetPasswordService);

      const user = await sendForgotPasswordEmail.execute({
         token,
         password,
      });

      return res.json(user);
   }
}
