import { Router } from "express";
import agendaRoute from "./Agendamento.routes";
import serviceRoute from "./Service.routes";

const RouteAgendamento = Router();

RouteAgendamento.use("/agendamento", agendaRoute);
RouteAgendamento.use("/", serviceRoute);

export default RouteAgendamento;
