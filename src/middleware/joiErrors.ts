// import { NextFunction, Response, Request } from 'express';
// import { isCelebrate, CelebrateInternalError } from 'celebrate';
// import { BAD_REQUEST } from 'constants/statusCodes';
// import jsonResponse from 'helpers/jsonResponse';
// import handleUserLang from 'helpers/handleUserLang';
// import locales from 'constants/locales';

// const joiErrors = () => (
//   err: CelebrateInternalError,
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ): void | Response<any> => {
//   if (!isCelebrate(err)) return next(err);
//   const lang = handleUserLang(req);
//   const joiError = err.joi.details[0];
//   let message;
//   try {
//     message = locales({ key: joiError.message, lang });
//   } catch (error) {
//     message = joiError.message;
//   }
//   return jsonResponse({
//     res,
//     status: BAD_REQUEST,
//     message,
//     errors: err.joi.details,
//   });
// };

// export default joiErrors;
