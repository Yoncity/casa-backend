import { Statistics } from "../models";

const updateStatistics = async (firstAccount: boolean, amount: string) => {
  let statistics: any = await Statistics.find();

  if (statistics.length) {
    statistics = statistics[0];

    const newLockedVolume =
      parseFloat(statistics.lockedVolume) + parseFloat(amount);

    if (firstAccount) statistics.totalUsers += 1;

    statistics.lockedVolume = newLockedVolume;

    await statistics.save();
  } else {
    await Statistics.create({
      totalUsers: 1,
      lockedVolume: amount,
    });
  }
};

export default updateStatistics;
