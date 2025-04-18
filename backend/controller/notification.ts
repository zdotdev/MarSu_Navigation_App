import { Request, Response, NextFunction } from "express";
import { Notification } from "../model/notification";
import mongoose from "mongoose";

export const create_notification = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { notification_title, notification_details } = req.body;

        if (!notification_title || !notification_details) {
            return res.status(400).json({message: "All fields are required"})
        }

        const new_notification = new Notification({
            notification_title,
            notification_details
        });

        await new_notification.save();

        return res.status(201).json({
            message: "Notification created successfully"
        });

    } catch (error) {
        next(error)
    }
};

export const get_notification = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notifications = await Notification.find().sort({ createdAt: -1 }).limit(5);

        if (!notifications || notifications.length === 0) {
            return res.status(404).json({
                message: "No notification found."
            })
        };

        return res.status(200).json({
            message: "Notification fetched successfully",
            notification: notifications
        })
    } catch (error) {
        next(error);
    }
};

export const delete_notification = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const notification_id = req.params.id;

        if (!notification_id || !mongoose.Types.ObjectId.isValid(notification_id)) {
            return res.status(400).json({
                message: "Invalid location ID provided."
            });
        };

        await Notification.findByIdAndDelete(notification_id);

        return res.status(201).json({
            message: "Location deleted successfully."
        })

    } catch (error) {
        next(error)
    }
};