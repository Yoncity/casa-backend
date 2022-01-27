import { Statistics } from "../models";
import dotenv from "dotenv";

dotenv.config();

const { CONTRACT_ADDRESS } = process.env;

const updateStatistics = async (
  address: string,
  amount: string,
  changeTotalLockedVolume: boolean = true
) => {
  // Update the contract stats
  let statistics: any = await Statistics.findOne({
    address: CONTRACT_ADDRESS,
  });

  if (statistics) {
    const newTotalLockedVolume =
      parseFloat(statistics.totalLockedVolume) +
      parseFloat(amount.replace("-", ""));

    const newCurrentLockedVolume =
      parseFloat(statistics.currentLockedVolume) + parseFloat(amount);

    statistics.currentLockedVolume = newCurrentLockedVolume;
    if (changeTotalLockedVolume) {
      statistics.totalLockedVolume = newTotalLockedVolume;
    }

    await statistics.save();
  } else {
    await Statistics.create({
      address: CONTRACT_ADDRESS,
      totalLockedVolume: amount,
      currentLockedVolume: amount,
    });
  }

  // Update the users stats
  statistics = await Statistics.findOne({
    address,
  });

  if (statistics) {
    const newTotalLockedVolume =
      parseFloat(statistics.totalLockedVolume) +
      parseFloat(amount.replace("-", ""));

    const newCurrentLockedVolume =
      parseFloat(statistics.currentLockedVolume) + parseFloat(amount);

    statistics.currentLockedVolume = newCurrentLockedVolume;

    if (changeTotalLockedVolume) {
      statistics.totalLockedVolume = newTotalLockedVolume;
    }

    await statistics.save();
  } else {
    await Statistics.create({
      address,
      totalLockedVolume: amount,
      currentLockedVolume: amount,
    });
  }
};

export default updateStatistics;
