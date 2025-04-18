import { Router, Request, Response, NextFunction } from "express";
const router = Router();

import { create_notification, get_notification, delete_notification } from "../controller/notification";

router.post("/", create_notification as (req: Request, res: Response, next: NextFunction) => void);
router.get("/", get_notification as (req: Request, res: Response, next: NextFunction) => void);
router.delete("/:id", delete_notification as (req: Request, res: Response, next: NextFunction) => void);

export default router;