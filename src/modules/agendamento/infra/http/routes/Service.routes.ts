import midlewareAuth from "@shared/infra/http/midleWares/midlewareAuth";
import { Router } from "express";
import CreateServiçoController from "../controllers/CreateServiçoController";
import FindServicecontroller from "../controllers/FindServiceController";

const serviceRoute = Router();

const createServiceController = new CreateServiçoController();
const listController = new FindServicecontroller();
// Create Serviço
serviceRoute.post("/service", midlewareAuth, createServiceController.create);

serviceRoute.get("/:provider_id/list", midlewareAuth, listController.create);
export default serviceRoute;
