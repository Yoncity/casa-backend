import mongoose from "mongoose";

const statisticsSchema = new mongoose.Schema(
  {
    totalUsers: {
      type: String,
      required: true,
    },
    lockedVolume: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Statistics = mongoose.model("Statistics", statisticsSchema);

export default Statistics;
