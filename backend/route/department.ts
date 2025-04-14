import { Router, Request, Response, NextFunction } from "express";
const router = Router();

import { create_department, get_all_department, get_department, update_department, delete_department } from "../controller/department";

router.get("/", get_all_department as (req: Request, res: Response, next: NextFunction) => void);
router.post("/", create_department  as (req: Request, res: Response, next: NextFunction) => void);
router.get("/:id", get_department as (req: Request, res: Response, next: NextFunction) => void);
router.put("/:id", update_department as (req: Request, res: Response, next: NextFunction) => void);
router.delete("/:id", delete_department as (req: Request, res: Response, next: NextFunction) => void);

export default router;