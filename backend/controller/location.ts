import { Request, Response, NextFunction } from "express";
import { Location } from "../model/location";
import mongoose from "mongoose";

export const create_location = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { location_name, latitude, longtitude } = req.body;

        if (!location_name || !latitude || !longtitude) {
            return res.status(400).json({
                message: "All fields are required."
            });
        };

        const new_location = new Location({
            location_name,
            latitude,
            longtitude
        })

        await new_location.save();

        return res.status(201).json({
            message: "location successfully created."
        })
    } catch (error) {
        next(error)
    }
};

export const get_location = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const locations = await Location.find();

        if (!locations || locations.length === 0) {
            return res.status(404).json({
                message: "No location found."
            });
        };

        return res.status(200).json({
            message: "Location fetched successfully.",
            location: locations
        });

    } catch (error) {
        next(error)
    }
};

export const update_location = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const location_id = req.params.id;

        if (!location_id || !mongoose.Types.ObjectId.isValid(location_id)) {
            return res.status(400).json({
                message: "Invalid location ID provided."
            });
        };

        const { location_name, latitude, longtitude } = req.body;

        if (!location_name || !latitude || !longtitude) {
            return res.status(400).json({
                message: "All fields are required."
            })
        }

        await Location.findByIdAndUpdate(location_id, {
            location_name,
            latitude,
            longtitude
        });


        return res.status(201).json({
            message: "Location updated successfully."
        })


    } catch (error) {
        next(error)
    }
};

export const delete_location = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const location_id = req.params.id;

        if (!location_id || !mongoose.Types.ObjectId.isValid(location_id)) {
            return res.status(400).json({
                message: "Invalid location ID provided."
            });
        };

        await Location.findByIdAndDelete(location_id);

        return res.status(201).json({
            message: "Location deleted successfully."
        })

    } catch (error) {
        next(error)
    }
};