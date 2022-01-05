import { Response } from "express";
import { OK } from "../constants/statusCodes";

interface ResponseParams {
  res: Response;
  status?: number;
  data?: any;
  message?: string;
  errorCode?: string;
  errors?: any;
}
/**
 * @param  {Object} data
 * @param  {ServerResponse} res
 */
const jsonResponse = ({
  status = OK,
  res,
  ...data
}: ResponseParams): Response => {
  return res.status(status).json({
    status,
    ...data,
  });
};

export default jsonResponse;
