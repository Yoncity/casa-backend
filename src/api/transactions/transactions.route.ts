import { Router } from "express";
import asyncHandler from "../../middleware/asyncHandler";
import { getTransactions } from "./transactions.controller";
import { celebrate, Joi } from "celebrate";

const router = Router();

router.get(
  "/:address",
  celebrate({
    params: Joi.object().keys({
      address: Joi.string().required(),
    }),
  }),
  asyncHandler(getTransactions)
);

export default router;
