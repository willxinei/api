/* eslint-disable import/prefer-default-export */
import midlewareAuth from "@shared/infra/http/midleWares/midlewareAuth";
import { Router } from "express";

import { TokenController } from "../controllers/TokensController";

const route = Router();
const controller = new TokenController();

route.post("/", midlewareAuth, controller.creaet);
route.get("/list", midlewareAuth, controller.find);

export { route };
