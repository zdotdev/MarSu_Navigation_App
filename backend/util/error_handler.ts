import { Custom_Error } from "../interface/custom_error";
import { Request, Response, NextFunction } from "express";

export const error_handler = (statusCode: number, message: string) => {
  const error = new Error() as Custom_Error;
  error.statusCode = statusCode;
  error.message = message;
  return error;
};

export const global_error_handler = (error: Custom_Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  res.status(error.statusCode || 500).json({
    message: `Internal Server Error`,
    error: error,
  });
};