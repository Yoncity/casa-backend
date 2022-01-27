import { Accounts, Transactions } from "../models";
import updateStatistics from "./updateStatistics";

const updateTransaction = async (type: string, data: any) => {
  if (type === "new_account") {
    const owner = await Accounts.findOne({
      owner: data.ownerAddress,
      status: "open_account_pending",
    });

    if (owner) {
      const transaction = await Transactions.findOne({
        status: "pending",
        type,
        accountID: owner._id,
      });

      if (transaction) {
        transaction.blockNumber = data.blockNumber;
        transaction.blockHash = data.blockHash;
        transaction.signature = data.signature;
        transaction.status = "success";
        await transaction.save();

        owner.accountNumber = data.accountNumber;
        owner.status = "open";
        await owner.save();

        await updateStatistics(data.ownerAddress, data.balance, true);
      }
    }
  } else if (type === "update_account") {
    const owner = await Accounts.findOne({
      owner: data.ownerAddress,
      accountNumber: data.accountNumber,
    });

    if (owner) {
      const transaction = await Transactions.findOne({
        status: "pending",
        type,
        accountID: owner._id,
      });

      if (transaction) {
        transaction.blockNumber = data.blockNumber;
        transaction.blockHash = data.blockHash;
        transaction.signature = data.signature;
        transaction.status = "success";
        await transaction.save();

        await updateStatistics(data.ownerAddress, data.balance, true);

        const newBalance = parseFloat(owner.balance) + parseFloat(data.balance);
        owner.balance = String(newBalance);

        await owner.save();
      }
    }
  } else if (type === "close_account") {
    const owner = await Accounts.findOne({
      owner: data.ownerAddress,
      accountNumber: data.accountNumber,
      status: "close_account_pending",
    });

    if (owner) {
      const transaction = await Transactions.findOne({
        status: "pending",
        type,
        accountID: owner._id,
      });

      if (transaction) {
        transaction.blockNumber = data.blockNumber;
        transaction.blockHash = data.blockHash;
        transaction.signature = data.signature;
        transaction.status = "success";
        await transaction.save();

        owner.status = "closed";
        await owner.save();

        await updateStatistics(data.ownerAddress, `-${owner.balance}`, false);
      }
    }
  }
};

export default updateTransaction;
