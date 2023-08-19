import { Request, Response } from "express";
import User from "../models/userModel";

// Create a new user
async function createUser(req: Request, res: Response) {
  try {
    const { name, email, role } = req.body;
    if (!name || !email || !role) {
      return res.status(400).json({
        errorCode: "MISSING_FIELDS",
        msg: "Missing required fields: name, email, role",
      });
    }
    const userExists = await User.findOne({ email: email.toLowerCase() }); // check in a case-insensitive also
    if (userExists) {
      return res
        .status(400)
        .json({ errorCode: "USER_EXISTS", msg: "User already exists" });
    }
    const newUser = new User({
      name,
      email: email.toLowerCase(),
      role,
    });
    const user = await newUser.save();
    return res.status(201).json(user);
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
}

async function getUsers(req: Request, res: Response) {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
}

export { createUser, getUsers };
