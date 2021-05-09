import AuthenticateUserService from "@modules/users/services/AuthenticateUserSercice";
import midlewareAuth from "@shared/infra/http/midleWares/midlewareAuth";
import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import multer from "multer";
import ForgotPasswordController from "../controller/ForgotPasswordController";
import ResetPasswordController from "../controller/ResetPasswordController";
import SessionController from "../controller/SessionController";
import UpdateAvatercontrller from "../controller/UpdateAvatarController";
import UpdateProfileControll from "../controller/UpdateProfileContrller";
import UserController from "../controller/UserController";

const UserRoute = Router();
const userController = new UserController();
const sessionController = new SessionController();
const updateProfile = new UpdateProfileControll();
const updateAvatercontrller = new UpdateAvatercontrller();
const resetPassword = new ResetPasswordController();
const forgot = new ForgotPasswordController();

const img = multer();

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
UserRoute.get("/profile", midlewareAuth, updateProfile.show);
UserRoute.put("/profile", midlewareAuth, updateProfile.update);

UserRoute.post(
   "/avatar",
   midlewareAuth,
   img.single("avatar"),
   updateAvatercontrller.update
);

UserRoute.post("/forgot", midlewareAuth, forgot.create);
UserRoute.post("/reset", midlewareAuth, resetPassword.create);

export default UserRoute;
