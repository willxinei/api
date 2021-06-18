import CreateAgendamentoService from "@modules/agendamento/services/CreateAgendamentoService";
import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class AgendamentoController {
   public async create(req: Request, res: Response): Promise<Response> {
      try {
         const {
            provider_id,
            user_name,
            telefone,
            avatar,
            from,
            service,
            dia,
            mes,
            ano,
         } = req.body;
         const user_id = req.user.id;

         const createAgendamento = container.resolve(CreateAgendamentoService);

         const agendamento = await createAgendamento.execute({
            provider_id,
            user_id,
            from,
            user_name,
            telefone,
            avatar,
            at: from,
            dia,
            mes,
            ano,
            service,
         });

         await req.io.emit("agenda", classToClass(agendamento));

         return res.json(classToClass(agendamento));
      } catch (err) {
         return res.json(err).status(401);
      }
   }
}
