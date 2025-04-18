import { Department } from "../model/department";
import { Request, Response, NextFunction } from "express";
import { department_schema } from "../zod/department";
import mongoose from "mongoose";

export const create_department = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, description, campus_zone, image, contact_person_name, contact_person_email, contact_person_title } = req.body;
        
        const parsed_body = department_schema.safeParse(req.body);
        if (!parsed_body.success) {
            return res.status(422).json({
                message: "Invalid request body",
                errors: parsed_body.error.issues,
            });
        }

        const existing_user = await Department.findOne({ title });
        if (existing_user) {
            return res.status(422).json({ message: "Department already exists" });
        }

        const new_department = new Department({
            title,
            description,
            campus_zone,
            image,
            contact_person_name,
            contact_person_email,
            contact_person_title
        });

        await new_department.save();

        return res.status(201).json({
            message: "Department created successfully",
            department: new_department
        });

    } catch (error) {
        next(error)
    }
};

export const get_all_department = async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const departments = await Department.find();

        if (!departments || departments.length === 0) {
            return res.status(404).json({ message: "No departments found" });
        }

        return res.status(200).json({
            message: "Departments fetched successfully",
            department: departments
        });
    } catch (error) {
        next(error)
    }
};

export const get_department = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        
        if (!id || mongoose.Types.ObjectId.isValid(id) === false) {
            return res.status(422).json({ message: "Department ID is required" });
        }
        
        const department = await Department.findById(id);
        
        if (!department) {
            return res.status(404).json({ message: "Department not found" });
        }

        return res.status(200).json({
            message: "Department fetched successfully",
            department
        });
    } catch (error) {
        next(error)
    }
};

export const update_department = async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const { id } = req.params;
        
        if (!id || mongoose.Types.ObjectId.isValid(id) === false) {
            return res.status(422).json({ message: "Department ID is required" });
        }

        const parsed_body = department_schema.safeParse(req.body);
        if (!parsed_body.success) {
            return res.status(422).json({
                message: "Invalid request body",
                errors: parsed_body.error.issues,
            });
        }

        const department = await Department.findByIdAndUpdate(id, req.body, { new: true });

        if (!department) {
            return res.status(404).json({ message: "Department not found" });
        }

        return res.status(200).json({
            message: "Department updated successfully",
            department
        });
    } catch (error) {
        next(error)
    }
};

export const delete_department = async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const { id } = req.params;
        
        if (!id || mongoose.Types.ObjectId.isValid(id) === false) {
            return res.status(422).json({ message: "Department ID is required" });
        }

        const department = await Department.findByIdAndDelete(id);

        if (!department) {
            return res.status(404).json({ message: "Department not found" });
        }

        return res.status(200).json({
            message: "Department deleted successfully",
            department
        });
    } catch (error) {
        next(error)
    }
};