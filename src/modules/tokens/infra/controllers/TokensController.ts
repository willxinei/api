/* eslint-disable import/prefer-default-export */
import { CreateTokenService } from "@modules/tokens/services/CreatetokenService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class TokenController {
   /**
    * creaet
    */
   public async creaet(req: Request, res: Response): Promise<Response> {
      const tokenCreate = container.resolve(CreateTokenService);
      const { token } = req.body;
      const prestador_id = req.user.id;

      const create = tokenCreate.execute({
         token,
         prestador_id,
      });

      return res.json(create);
   }
}
