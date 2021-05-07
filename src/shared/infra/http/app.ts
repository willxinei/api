import "reflect-metadata";
import "express-async-errors";
import "@shared/infra/typeorm";
import "@shared/container";

import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { errors } from "celebrate";
import AppError from "@shared/errors/AppError";
import upload from "@config/upload";
import Route from "./routes";
import rateLimiter from "./midleWares/rateLimit";

const app = express();

app.use(rateLimiter);
app.use(cors());
app.use(express.json());
app.use("/file", express.static(upload.UploadFolder));

app.use(Route);
app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
   if (err instanceof AppError) {
      return response.status(err.statusCode).json({
         status: "error",
         message: err.message,
      });
   }

   console.log(err);

   return response.status(500).json({
      status: "error",
      message: "Interal server error",
   });
});

app.listen(3333, () => console.log("Server is Ok"));

export default app;
