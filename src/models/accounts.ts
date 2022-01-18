import mongoose from "mongoose";

const accountsSchema = new mongoose.Schema(
  {
    owner: {
      type: String,
      required: true,
    },
    balance: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Number,
      required: true,
    },
    accountNumber: {
      type: Number,
      required: true,
    },
    blockNumber: {
      type: Number,
      required: true,
    },
    blockHash: {
      type: String,
      required: true,
      unique: true,
    },
    transactionHash: {
      type: String,
      required: true,
      unique: true,
    },
    signature: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Accounts = mongoose.model("Accounts", accountsSchema);

export default Accounts;
