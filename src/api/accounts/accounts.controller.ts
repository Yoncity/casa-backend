import { Request, Response } from "express";
import locales from "../../constants/locale";
import { OK } from "../../constants/statusCodes";
import jsonResponse from "../../helpers/jsonResponse";

export const homepage = async (req: Request, res: Response) => {
  return jsonResponse({ status: OK, res, message: locales("hello", "es") });
};
