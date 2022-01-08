import { celebrate, Joi } from "celebrate";

export const createAccount = celebrate({
  body: Joi.object().keys({
    owner: Joi.string()
      // .label("Owner")
      // .message("Please add sender address")
      .required(),
    balance: Joi.string()
      // .label("Balance")
      // .message("Please add amount to lock")
      .required(),
    timestamp: Joi.number()
      // .label("Timestamp")
      // .message("Timestamp for unlocking balance is required.")
      .required(),
    blockNumber: Joi.number()
      // .label("Block Number")
      // .message("Block Number is a required field.")
      .required(),
    blockHash: Joi.string()
      // .label("Block Hash")
      // .message("Block Hash is required")
      .required(),
    transactionHash: Joi.string()
      // .label("Transaction Hash")
      // .message("Transaction Hash is required")
      .required(),
  }),
});
