import { celebrate, Joi } from "celebrate";

export const createAccount = celebrate({
  body: Joi.object().keys({
    owner: Joi.string().required(),
    balance: Joi.string().required(),
    timestamp: Joi.number().required(),
    transactionHash: Joi.string().required(),
  }),
});

export const getAccounts = celebrate({
  params: Joi.object().keys({
    address: Joi.string().required(),
  }),
});

export const updateAccount = celebrate({
  params: Joi.object().keys({
    address: Joi.string().required(),
    accountNumber: Joi.number().min(0).required(),
  }),
  body: Joi.object().keys({
    type: Joi.string().valid("update_account", "close_account").required(),
    amount: Joi.when("type", {
      is: "update_account",
      then: Joi.string().required(),
    }),
    transactionHash: Joi.string().required(),
  }),
});
