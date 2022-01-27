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
      // required: true,
    },
    status: {
      type: String,
      enum: ["open", "closed", "open_account_pending", "close_account_pending"],
      required: true,
    },
  },
  { timestamps: true }
);

const Accounts = mongoose.model("Accounts", accountsSchema);

export default Accounts;
