import { Request, Response } from "express";
import locales from "../../constants/locale";
import { OK, CREATED } from "../../constants/statusCodes";
import jsonResponse from "../../helpers/jsonResponse";
import { Accounts, Statistics } from "../../models/";

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
    blockNumber,
    blockHash,
    transactionHash,
    signature,
  });

  let statistics: any = await Statistics.find();

  if (statistics.length) {
    statistics = statistics[0];

    const newLockedVolume =
      parseFloat(statistics.lockedVolume) + parseFloat(balance);

    if (!firstAccount) {
      await Statistics.updateOne(
        {},
        { $inc: { totalUsers: 1 }, $set: { lockedVolume: newLockedVolume } }
      );
    } else {
      await Statistics.updateOne(
        {},
        { $set: { lockedVolume: newLockedVolume } }
      );
    }
  }

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
    body: { balance, active },
  } = req;

  const data = await Accounts.findOne({
    owner: address,
    accountNumber,
  });

  return jsonResponse({
    status: OK,
    res,
    data,
  });
};
