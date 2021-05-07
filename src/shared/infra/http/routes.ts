import RouteAgendamento from "@modules/agendamento/infra/http/routes/routes";
import UserRoute from "@modules/users/infra/http/routes/routesUser.routes";
import { Router } from "express";

const Route = Router();

Route.use(RouteAgendamento);
Route.use(UserRoute);

export default Route;
