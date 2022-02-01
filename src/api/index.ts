import { Router } from "express";
import asyncHandler from "../middleware/asyncHandler";
import accounts from "./accounts/accounts.route";
import statistics from "./statistics/statistics.route";
import transactions from "./transactions/transactions.route";

const router = Router();

router.use("/accounts", asyncHandler(accounts));

router.use("/statistics", asyncHandler(statistics));

router.use("/transactions", asyncHandler(transactions));

export default router;
