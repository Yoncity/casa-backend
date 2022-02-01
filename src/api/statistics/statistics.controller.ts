import { Request, Response } from "express";
import { OK } from "../../constants/statusCodes";
import jsonResponse from "../../helpers/jsonResponse";
import { Statistics, Accounts, Transactions } from "../../models";

export const getStatistics = async (req: Request, res: Response) => {
  const {
    params: { address },
    query: { full },
  } = req;

  let data: Record<string, any> = {};

  if (full) {
    const stats = await Statistics.findOne({ address });
    data.statistics = {
      totalLockedVolume: stats.totalLockedVolume,
      currentLockedVolume: stats.currentLockedVolume,
    };

    const accounts = await Accounts.find({ owner: address });
    let openAccounts = 0,
      closedAccounts = 0;

    const filter: Array<string> = [];

    accounts.map(({ _id, status }) => {
      filter.push(_id);
      if (status === "open") openAccounts += 1;
      else if (status === "closed") closedAccounts += 1;
    });

    data.accounts = {
      open: openAccounts,
      closed: closedAccounts,
      total: accounts.length,
    };

    const transactions = await Transactions.find({
      accountID: { $in: filter },
    });
    let successTransactions = 0,
      failedTransactions = 0;

    transactions.map(({ status }) => {
      if (status === "success") successTransactions += 1;
      else failedTransactions += 1;
    });

    data.transactions = {
      total: failedTransactions + successTransactions,
      failed: failedTransactions,
      successful: successTransactions,
    };
  } else {
    const addressStat = await Statistics.findOne({ address }, [
      "totalLockedVolume",
      "currentLockedVolume",
    ]);
    const totalUsers = await Statistics.count();

    data.totalUsers = totalUsers - 1;
    data.statistics = addressStat;
  }

  return jsonResponse({
    status: OK,
    res,
    data,
  });
};
