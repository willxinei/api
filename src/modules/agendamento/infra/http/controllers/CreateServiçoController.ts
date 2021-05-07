import CreateServiçoService from "@modules/agendamento/services/CreateSerivçoSerice";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class CreateServiçoController {
   public async create(req: Request, res: Response): Promise<Response> {
      try {
         const createService = container.resolve(CreateServiçoService);
         const { service, description, time, value } = req.body;
         const provider_id = req.user.id;
         const services = await createService.execute({
            provider_id,
            service,
            description,
            time,
            value,
         });

         return res.json(services);
      } catch (err) {
         return res.json(err.message).status(400);
      }
   }
}
