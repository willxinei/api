import upload from "@config/upload";
import CreateServiçoController from "@modules/agendamento/infra/http/controllers/CreateServiçoController";
import FindServiceController from "@modules/agendamento/infra/http/controllers/FindServiceController";
import midlewareAuth from "@shared/infra/http/midleWares/midlewareAuth";
import { Joi, Segments, celebrate } from "celebrate";

import { Router } from "express";
import multer from "multer";
import PrestadorController from "../controllers/PrestadorController";
import ReservaController from "../controllers/ReservaController";
import ForgotPasswordController from "../controllers/SendMailPrestadorController";
import SessionPrestadorController from "../controllers/SessionPrestadorController";
import UpdateAvatercontrller from "../controllers/UpateAvatarController";

const prestadorRoute = Router();
const img = multer(upload.multer);

const prestadorControler = new PrestadorController();
const sessionController = new SessionPrestadorController();
const forgotController = new ForgotPasswordController();
const avatarController = new UpdateAvatercontrller();
const reservaController = new ReservaController();

const createServiceController = new CreateServiçoController();
const listController = new FindServiceController();

//* */ Show profile *//
prestadorRoute.get("/profile", midlewareAuth, prestadorControler.show);

//* */ Create *//
prestadorRoute.post(
   "/",
   celebrate({
      [Segments.BODY]: {
         nome: Joi.string().required(),
         email: Joi.string().required(),
         telefone: Joi.string().required(),
         senha: Joi.string().required(),
         work_init: Joi.string().required(),
         work_and: Joi.string().required(),
         funcao: Joi.string().required().min(6),
      },
   }),
   prestadorControler.create
);

prestadorRoute.post("/reserva", midlewareAuth, reservaController.create);
prestadorRoute.post("/session", sessionController.create);
prestadorRoute.post("/forgot", forgotController.create);

prestadorRoute.put(
   "/update",
   celebrate({
      [Segments.BODY]: {
         nome: Joi.string().required(),
         email: Joi.string().required(),
         telefone: Joi.string().required(),
         senha: Joi.string().required(),
         work_init: Joi.string().required(),
         work_and: Joi.string().required(),
         funcao: Joi.string().required().min(6),
      },
   }),
   midlewareAuth,
   prestadorControler.update
);

prestadorRoute.patch(
   "/avatar",
   midlewareAuth,
   img.single("avatar"),
   avatarController.update
);

prestadorRoute.post("/service", midlewareAuth, createServiceController.create);

prestadorRoute.patch(
   "/service/update",
   midlewareAuth,
   createServiceController.update
);

prestadorRoute.delete(
   "/service/:id/delet",
   midlewareAuth,
   createServiceController.delet
);

prestadorRoute.get("/:provider_id/list", midlewareAuth, listController.create);

export default prestadorRoute;
