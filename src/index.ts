import express from "express";
import { json } from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import routes from "./api";
import Database from "./models/database";
import Web3Controller from "./helpers/web3Controller";

dotenv.config();

const app = express();

Database.connect();

app.use(json());

app.use(cors());

app.use(routes);

new Web3Controller();

const { PORT = 3001 } = process.env;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
