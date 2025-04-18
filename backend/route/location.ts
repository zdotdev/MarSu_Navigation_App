import { Router, Request, Response, NextFunction } from "express";
const router = Router();

import { create_location, get_location, update_location, delete_location } from "../controller/location";

router.post("/", create_location as (req: Request, res: Response, next: NextFunction) => void);
router.get("/", get_location as (req: Request, res: Response, next: NextFunction) => void);
router.put("/:id", update_location as (req: Request, res: Response, next: NextFunction) => void);
router.delete("/:id", delete_location as (req: Request, res: Response, next: NextFunction) => void);

export default router;