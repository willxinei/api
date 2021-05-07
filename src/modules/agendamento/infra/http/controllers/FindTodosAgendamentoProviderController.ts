import FindTodosAgendamentosPrestadorSerice from "@modules/agendamento/services/FindTodosAgendamentosPrestadorServicce";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class FindTodosAgendamentosPrestadorController {
   public async list(req: Request, res: Response): Promise<Response> {
      try {
         const agenda = container.resolve(FindTodosAgendamentosPrestadorSerice);
         const provider_id = req.user.id;

         const ag = await agenda.execute(provider_id);
         return res.json(ag);
      } catch (err) {
         return res.json(err.message).status(400);
      }
   }
}
