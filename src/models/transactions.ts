import mongoose from "mongoose";

const transactionsSchema = new mongoose.Schema(
  {
    accountID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Accounts",
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["new_account", "update_account", "close_account"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "failed", "success"],
      required: true,
    },
    blockNumber: {
      type: Number,
    },
    blockHash: {
      type: String,
    },
    transactionHash: {
      type: String,
      required: true,
      unique: true,
    },
    signature: {
      type: String,
    },
  },
  { timestamps: true }
);

const Transactions = mongoose.model("Transactions", transactionsSchema);

export default Transactions;
