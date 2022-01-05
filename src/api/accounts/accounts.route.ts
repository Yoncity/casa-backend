import { Router } from "express";
import * as controller from "./accounts.controller";

const router = Router();

router.route("/").get(controller.homepage);

export default router;
