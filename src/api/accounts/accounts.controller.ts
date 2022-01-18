import { Request, Response } from "express";
import locales from "../../constants/locale";
import { OK, CREATED } from "../../constants/statusCodes";
import jsonResponse from "../../helpers/jsonResponse";
import updateStatistics from "../../helpers/updateStatistics";
import { Accounts, Statistics, Transactions } from "../../models/";

export const createAccount = async (req: Request, res: Response) => {
  const {
    owner,
    balance,
    timestamp,
    accountNumber,
    blockNumber,
    blockHash,
    transactionHash,
    signature,
  } = req.body;

  const firstAccount = await Accounts.findOne({ owner });

  const data = await Accounts.create({
    owner,
    balance,
    timestamp,
    accountNumber,
  });

  await updateStatistics(!firstAccount, balance);

  await Transactions.create({
    accountID: data._id,
    amount: balance,
    status: "new_account",
    blockNumber,
    blockHash,
    transactionHash,
    signature,
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
    body: {
      amount,
      status,
      blockNumber,
      blockHash,
      transactionHash,
      signature,
    },
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
    status,
    blockNumber,
    blockHash,
    transactionHash,
    signature,
  };

  if (status === "close_account") {
    await updateStatistics(false, `-${data.balance}`);

    transactionData.amount = data.balance;

    data.active = false;
    data.balance = "0";
  } else {
    await updateStatistics(false, amount);

    transactionData.amount = amount;

    const newBalance = parseFloat(data.balance) + parseFloat(amount);
    data.balance = String(newBalance);
  }

  await data.save();

  await Transactions.create(transactionData);

  return jsonResponse({
    status: OK,
    res,
    data,
  });
};
