/* eslint-disable import/prefer-default-export */
import { CreateTokenService } from "@modules/tokens/services/CreatetokenService";
import { FindtokenService } from "@modules/tokens/services/FindTokenService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class TokenController {
   /**
    * creaet
    */
   public async creaet(req: Request, res: Response): Promise<Response> {
      try {
         const tokenCreate = container.resolve(CreateTokenService);
         const { token } = req.body;
         const prestador_id = req.user.id;

         const create = await tokenCreate.execute({
            token,
            prestador_id,
         });

         return res.json(create);
      } catch (error) {
         return res.json(error).status(400);
      }
   }

   public async find(req: Request, res: Response): Promise<Response> {
      const tokenCreate = container.resolve(FindtokenService);
      const { prestador_id } = req.params;

      const create = await tokenCreate.execute({
         prestador_id,
      });

      return res.json(create);
   }
}
