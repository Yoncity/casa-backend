import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { DATABASE_URL = "" } = process.env;

class Database {
  static async connect() {
    try {
      await mongoose.connect(DATABASE_URL, {
        // @ts-ignore
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useMongoClient: true,
      });
      console.log("Database connected successfully");
    } catch (e) {
      console.error(
        `Unable to connect to the database \n At ${DATABASE_URL} \n With error ${e}`
      );
    }
  }
}

export default Database;
