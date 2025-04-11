import { allowed_origins } from "./allowed_origin";
import { Cors_Options } from "../interface/cors_option";

export const cors_option: Cors_Options = {
  origin: (origin, callback) => {
    if (allowed_origins.indexOf(origin as string) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};