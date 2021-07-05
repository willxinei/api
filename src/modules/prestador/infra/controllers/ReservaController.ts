import ReservaDeHorariosService from "@modules/prestador/services/ReservaDeHorariosService";
import { Request, Response } from "express";

import { container } from "tsyringe";

export default class ReservaController {
   public async create(req: Request, res: Response): Promise<Response> {
      try {
         const createService = container.resolve(ReservaDeHorariosService);
         const { user_id, from, at, mes } = req.body;
         const provider_id = req.user.id;

         const services = await createService.execute({
            provider_id,
            user_id,
            from,
            at,
            mes,
         });

         return res.json(services);
      } catch (err) {
         return res.json(err);
      }
   }
}
