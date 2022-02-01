import { Request, Response } from "express";
import { OK } from "../../constants/statusCodes";
import jsonResponse from "../../helpers/jsonResponse";
import { Accounts, Transactions } from "../../models";

export const getTransactions = async (req: Request, res: Response) => {
  const { address: owner } = req.params;

  const accounts = await Accounts.find({ owner }, "_id");

  const filter: Array<string> = [];

  accounts.map(({ _id }) => {
    filter.push(_id);
  });

  if (filter.length === 0) {
    return jsonResponse({
      status: OK,
      res,
      data: [],
    });
  }

  const data = await Transactions.find({ accountID: { $in: filter } }).populate(
    "accountID",
    "accountNumber"
  );

  return jsonResponse({
    status: OK,
    res,
    data,
  });
};
