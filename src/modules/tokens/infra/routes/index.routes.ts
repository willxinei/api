/* eslint-disable import/prefer-default-export */
import { Router } from "express";

import { route } from "./token.routes";

const TokenRoue = Router();

TokenRoue.use("/token", route);

export { TokenRoue };
