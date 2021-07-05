import CreateServiçoService from "@modules/agendamento/services/CreateSerivçoSerice";
import UpdateServices from "@modules/agendamento/services/UpdateService";
import DeleteServicoService from "@modules/prestador/services/DeleteServicoService";
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
         return res.json(err);
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
         return res.json(err);
      }
   }

   public async delet(re: Request, res: Response): Promise<Response> {
      const geteAgendamento = container.resolve(DeleteServicoService);

      const { id } = re.params;

      re.io.emit("delet", id);

      await geteAgendamento.delete(id);

      return res.status(204).send();
   }
}
