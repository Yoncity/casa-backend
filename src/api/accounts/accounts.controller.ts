import { Request, Response } from "express";
import locales from "../../constants/locale";
import { OK, CREATED } from "../../constants/statusCodes";
import jsonResponse from "../../helpers/jsonResponse";
import updateStatistics from "../../helpers/updateStatistics";
import { Accounts, Statistics, Transactions } from "../../models/";

export const createAccount = async (req: Request, res: Response) => {
  const { owner, balance, timestamp, transactionHash } = req.body;

  const data = await Accounts.create({
    owner,
    balance,
    timestamp,
    status: "open_account_pending",
  });

  await Transactions.create({
    accountID: data._id,
    amount: balance,
    type: "new_account",
    status: "pending",
    transactionHash,
  });

  return jsonResponse({
    status: CREATED,
    res,
    message: locales("account_created_successfully", "en"),
    data,
  });
};

export const getAccounts = async (req: Request, res: Response) => {
  const { address } = req.params;

  const data = await Accounts.find({
    owner: address,
    active: true,
  });

  return jsonResponse({
    status: OK,
    res,
    data,
  });
};

export const updateAccount = async (req: Request, res: Response) => {
  const {
    params: { address, accountNumber },
    body: { amount, type, transactionHash },
  } = req;

  const data = await Accounts.findOne({
    owner: address,
    accountNumber,
  });

  if (!data) {
    return jsonResponse({
      status: CREATED,
      res,
      message: locales("account_does_not_exist", "en"),
      data,
    });
  }

  const transactionData: Record<string, any> = {
    accountID: data._id,
    type,
    transactionHash,
    status: "pending",
  };

  if (type === "close_account") {
    transactionData.amount = data.balance;
    data.status = "close_account_pending";
    await data.save();
  } else transactionData.amount = amount;

  await Transactions.create(transactionData);

  return jsonResponse({
    status: OK,
    res,
    data,
  });
};
