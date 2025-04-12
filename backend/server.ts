import express, { Express, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import path from "path";

import { credentials } from "./middleware/credential";
import { cors_option } from "./config/cors_option";
import { global_error_handler } from "./util/error_handler";

import user_route from "./route/user";

config();

const app: Express = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));

app.use(credentials);
app.use(cors(cors_option));
app.use(cookieParser());

app.use("/api/user", user_route);

app.use(express.static(path.join(__dirname, "dist")));
app.use("/uploads", express.static("uploads"));

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.use(global_error_handler);

mongoose
  .connect(process.env.MONGODB_URL as string)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Failed to connect to MongoDB", error));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});