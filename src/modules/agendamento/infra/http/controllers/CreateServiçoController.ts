import CreateServiçoService from "@modules/agendamento/services/CreateSerivçoSerice";
import UpdateServices from "@modules/agendamento/services/UpdateService";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { updateSetAccessor } from "typescript";

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
         return res.json(err.message);
      }
   }

   public async update(req: Request, res: Response): Promise<Response> {
      try {
         const updateService = container.resolve(UpdateServices);
         const { service, description, time, value } = req.body;
         const provider_id = req.user.id;
         const services = await updateService.execute({
            provider_id,
            service,
            description,
            time,
            value,
         });

         return res.json(services);
      } catch (err) {
         return res.json(err.message);
      }
   }
}
