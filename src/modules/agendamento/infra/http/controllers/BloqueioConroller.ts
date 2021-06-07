import CreateBloqueioService from "@modules/agendamento/services/CreateBloqueio";
import { Request, Response } from "express";

import { container } from "tsyringe";

export default class Bloqueiocontroller {
   public async create(req: Request, res: Response): Promise<Response> {
      try {
         const createService = container.resolve(CreateBloqueioService);
         const { provider_id, from, at, dia, mes } = req.body;

         const services = await createService.execute(
            provider_id,
            from,
            at,
            dia,
            mes
         );

         return res.json(services);
      } catch (err) {
         return res.json(err.message);
      }
   }
}
