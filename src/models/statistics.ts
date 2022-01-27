import mongoose from "mongoose";

const statisticsSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
      unique: true,
    },
    totalLockedVolume: {
      type: String,
      required: true,
    },
    currentLockedVolume: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Statistics = mongoose.model("Statistics", statisticsSchema);

export default Statistics;
