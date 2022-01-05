import express from "express";
import { json } from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import routes from "./api";

dotenv.config();

const app = express();

app.use(json());

app.use(cors());

app.use(routes);

const { PORT = 3001 } = process.env;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
