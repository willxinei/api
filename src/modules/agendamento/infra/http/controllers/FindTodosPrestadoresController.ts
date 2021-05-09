import ListPrestadoresService from "@modules/agendamento/services/ListPrestadoresService";
import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class FindTodosPrestadoresController {
   public async list(req: Request, res: Response): Promise<Response> {
      try {
         const listHorarios = container.resolve(ListPrestadoresService);

         const user_id = req.user.id;

         const list = await listHorarios.execute({
            user_id,
         });

         return res.json(classToClass(list));
      } catch (err) {
         return res.json(err.message).status(400);
      }
   }
}
