import midlewareAuth from "@shared/infra/http/midleWares/midlewareAuth";
import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import AgendamentoController from "../controllers/AgendamentoController";
import FindTodosAgendamentos from "../controllers/FindTodosAgendamenosController";
import FindTodosAgendamentosPrestadorController from "../controllers/FindTodosAgendamentoProviderController";
import FindTodosAgendamentosUserController from "../controllers/FindTodosAgendamentoUsersController";

const agendaRoute = Router();

const agendamentocontroller = new AgendamentoController();
const listarAgentadamento = new FindTodosAgendamentos();
const listUsersController = new FindTodosAgendamentosUserController();
const listPrestadorController = new FindTodosAgendamentosPrestadorController();
agendaRoute.use(midlewareAuth);

// Criar um agendamento
agendaRoute.post(
   "/",
   celebrate({
      [Segments.BODY]: {
         provider_id: Joi.string().required(),
         service: Joi.string().required(),
         from: Joi.string().required(),
         dia: Joi.number().required(),
         mes: Joi.number().required(),
         ano: Joi.number().required(),
      },
   }),
   agendamentocontroller.create
);

// Listar todos agendamentos
agendaRoute.get("/", listarAgentadamento.list);

// Listar todos agendamentos do usuario
agendaRoute.get("/me", listUsersController.list);

// LIstar todos agendamentos do prestador
agendaRoute.get("/me/prestador", listPrestadorController.list);

export default agendaRoute;
