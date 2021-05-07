import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import SessionController from "../controller/SessionController";
import UserController from "../controller/UserController";

const UserRoute = Router();
const userController = new UserController();
const sessionController = new SessionController();

UserRoute.post(
   "/user",
   celebrate({
      [Segments.BODY]: {
         name: Joi.string().required(),
         email: Joi.string().required(),
         telefone: Joi.number().required(),
         password: Joi.string().required().min(6),
         prestador: Joi.boolean().required(),
      },
   }),
   userController.create
);

UserRoute.post("/session", sessionController.create);

export default UserRoute;
