import { celebrate, Joi } from "celebrate";

export const createAccount = celebrate({
  body: Joi.object().keys({
    owner: Joi.string().required(),
    balance: Joi.string().required(),
    timestamp: Joi.number().required(),
    accountNumber: Joi.number().required(),
    blockNumber: Joi.number().required(),
    blockHash: Joi.string().required(),
    transactionHash: Joi.string().required(),
    signature: Joi.string().required(),
  }),
});
