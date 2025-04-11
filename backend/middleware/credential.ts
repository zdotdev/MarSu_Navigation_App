import { allowed_origins } from "../config/allowed_origin";
import { Request, Response, NextFunction } from "express";

export const credentials = (req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin;
  if (allowed_origins.includes(origin as string)) {
    res.header("Access-Control-Allow-Credentials", "true");
  }
  next();
};