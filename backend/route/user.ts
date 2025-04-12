import { Router, Request, Response, NextFunction } from "express";
const router = Router();

import { sign_up, sign_in, get_user } from "../controller/user";

router.post("/signup", sign_up as (req: Request, res: Response, next: NextFunction) => void);
router.post("/signin", sign_in  as (req: Request, res: Response, next: NextFunction) => void);
router.get("/", get_user  as (req: Request, res: Response, next: NextFunction) => void);

export default router;