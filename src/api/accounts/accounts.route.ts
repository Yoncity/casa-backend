import { Router } from "express";
import * as controller from "./accounts.controller";
import * as validator from "./accounts.validator";

const router = Router();

router
  .route("/")
  .get(controller.overview)
  .post(validator.createAccount, controller.createAccount);

export default router;
