// import dayjs from "dayjs";
import Web3 from "web3";
import CASA_ABI from "../constants/abi/casa";
import dotenv from "dotenv";
import updateTransaction from "./updateTransaction";
dotenv.config();

const { CONTRACT_ADDRESS, WEB3_PROVIDER = "" } = process.env;

class Web3Controller {
  web3: any;
  // @ts-ignore
  casaContract: any;

  BLOCKS: Array<Number> = [];

  constructor() {
    this.web3 = new Web3(WEB3_PROVIDER);

    const contract = new this.web3.eth.Contract(CASA_ABI, CONTRACT_ADDRESS);
    this.casaContract = contract;

    this.listenToEvents();

    // this.web3.eth.getTransactionReceipt(
    //   "0x07d2c220a9c4bb35585073725fa6ae64e413d78966ec14386ae28b69f65fd8c8",
    //   (err: any, result: any) => {
    //     console.log(
    //       "🚀 --- this.web3.eth.getTransactionReceipt --- result",
    //       result
    //     );
    //   }
    // );
  }

  async getContractBalance(): Promise<Number> {
    const balance = await this.casaContract.methods.contractBalance().call();
    return this.web3.utils.fromWei(balance, "ether");
  }

  async getTotalUsers(): Promise<Number> {
    const totalUsers = await this.casaContract.methods.getTotalUsers().call();
    return totalUsers;
  }

  isDuplicate(blockNumber: Number) {
    if (this.BLOCKS.includes(blockNumber)) return true;
    this.BLOCKS.push(blockNumber);
    return false;
  }

  listenToEvents() {
    console.log("\nEvent Listening Started.\n");

    this.casaContract.events.allEvents(async (error: any, result: any) => {
      if (error) {
        console.log("🚀 --- listenToEvents --- error", error);
        return;
      }

      if (!this.isDuplicate(result.blockNumber)) {
        const data = {
          ownerAddress: result.returnValues.ownerAddress.toLowerCase(),
          accountNumber: result.returnValues._account,
          blockNumber: result.blockNumber,
          blockHash: result.blockHash,
          signature: result.signature,
        };

        switch (result.event) {
          case "NewAccount":
            await updateTransaction("new_account", {
              ...data,
              balance: result.returnValues._amount,
            });
            break;
          case "UpdateAccount":
            await updateTransaction("update_account", {
              ...data,
              balance: result.returnValues._amount,
            });
            break;
          case "CloseAccount":
            await updateTransaction("close_account", data);
            break;
        }
      }
    });
  }
}

export default Web3Controller;
