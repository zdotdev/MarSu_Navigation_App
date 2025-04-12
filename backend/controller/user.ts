import { User } from "../model/user";
import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";
import { sign_up_schema, sign_in_schema } from "../zod/auth";
import { User_Interface } from "../interface/user";

function getUserInfo(user: User_Interface) {
  return {
    name: user.name,
    email: user.email
  };
}

export const sign_up = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      name,
      email,
      password,
    } = req.body;

    const parsed_body = sign_up_schema.safeParse(req.body);
    if (!parsed_body.success) {
      return res.status(422).json({
        message: "Invalid request body",
        errors: parsed_body.error.issues,
      });
    }

    const existing_user = await User.findOne({ email });
    if (existing_user) {
      return res.status(422).json({ message: "Email already exists" });
    }

    const hashed_password = await bcrypt.hash(password, 10);

    const new_user = new User({
      name,
      email,
      password: hashed_password,
    });

    await new_user.save();

    return res.status(201).json({
      message: "Sign up successful",
      user: getUserInfo(new_user)
    });
  } catch (error) {
    next(error);
  }
};

export const sign_in = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const parsed_body = sign_in_schema.safeParse(req.body);
    if (!parsed_body.success) {
      return res.status(422).json({
        message: "Invalid request body",
        errors: parsed_body.error.issues,
      });
    }

    const existing_user = await User.findOne({ email });
    if (!existing_user) {
      return res.status(422).json({ message: "Invalid email or password" });
    }

    const is_password_valid = await bcrypt.compare(
      password,
      existing_user.password,
    );
    if (!is_password_valid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    return res.status(200).json({
      message: "Sign in successful",
      user: getUserInfo(existing_user)
    });
  } catch (error) {
    next(error);
  }
};

export const get_user = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.find()

    if (!user) {
      return res.status(404).json({ message: 'No user found' })
    }

    return res
      .status(200)
      .json({ message: 'User retrieved successfully', user })
  } catch (error) {
    next(error)
  }
}