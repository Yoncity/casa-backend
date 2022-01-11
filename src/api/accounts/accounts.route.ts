import { Router } from "express";
import asyncHandler from "../../middleware/asyncHandler";
import * as controller from "./accounts.controller";
import * as validator from "./accounts.validator";

const router = Router();

router
  .route("/")
  .post(validator.createAccount, asyncHandler(controller.createAccount));

router.get("/:address", asyncHandler(controller.getAccounts));

export default router;
