import { Router } from "express";
import asyncHandler from "../middleware/asyncHandler";
import accounts from "./accounts/accounts.route";

const router = Router();

router.use("/accounts", asyncHandler(accounts));

export default router;
