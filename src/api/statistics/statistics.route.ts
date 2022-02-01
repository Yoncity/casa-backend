import { Router } from "express";
import asyncHandler from "../../middleware/asyncHandler";
import { getStatistics } from "./statistics.controller";
import { celebrate, Joi } from "celebrate";

const router = Router();

router.get(
  "/:address",
  celebrate({
    params: Joi.object().keys({
      address: Joi.string().required(),
    }),
    query: Joi.object().keys({
      full: Joi.boolean(),
    }),
  }),
  asyncHandler(getStatistics)
);

export default router;
