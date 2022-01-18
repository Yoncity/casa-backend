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
    amount: Joi.string().required(),
    status: Joi.string()
      .valid("new_account", "update_account", "close_account")
      .required(),
    blockNumber: Joi.number().required(),
    blockHash: Joi.string().required(),
    transactionHash: Joi.string().required(),
    signature: Joi.string().required(),
  }),
});
