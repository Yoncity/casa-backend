import { Request, Response } from "express";
import locales from "../../constants/locale";
import { OK, CREATED } from "../../constants/statusCodes";
import jsonResponse from "../../helpers/jsonResponse";
import { Accounts } from "../../models/";

export const overview = async (req: Request, res: Response) => {
  return jsonResponse({ status: OK, res, message: locales("hello", "en") });
};

export const createAccount = async (req: Request, res: Response) => {
  const { owner, balance, timestamp, blockNumber, blockHash, transactionHash } =
    req.body;

  const data = await Accounts.create({
    owner,
    balance,
    timestamp,
    blockNumber,
    blockHash,
    transactionHash,
  });

  console.log("🚀 --- overview --- data", data);

  return jsonResponse({
    status: CREATED,
    res,
    message: locales("account_created_successfully", "en"),
  });
};
