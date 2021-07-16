import CreateAgendamentoService from "@modules/agendamento/services/CreateAgendamentoService";
import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class AgendamentoController {
   public async create(req: Request, res: Response): Promise<Response> {
      try {
         const {
            user_id,
            provider_id,
            from,
            service,
            dia,
            mes,
            ano,
         } = req.body;

         const createAgendamento = container.resolve(CreateAgendamentoService);

         const agendamento = await createAgendamento.execute({
            provider_id,
            user_id,
            from,
            at: from,
            dia,
            mes,
            ano,
            service,
         });

         await req.io.emit("agenda");

         return res.json(agendamento);
      } catch (error) {
         return res.json(error).status(400);
      }
   }
}
