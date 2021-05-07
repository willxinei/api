import midlewareAuth from "@shared/infra/http/midleWares/midlewareAuth";
import { Router } from "express";
import CreateServiçoController from "../controllers/CreateServiçoController";
import FindServicecontroller from "../controllers/FindServiceController";

const serviceRoute = Router();
serviceRoute.use(midlewareAuth);

const createServiceController = new CreateServiçoController();
const listController = new FindServicecontroller();
// Create Serviço
serviceRoute.post("/service", createServiceController.create);

serviceRoute.get("/:provider_id/list", listController.create);
export default serviceRoute;
