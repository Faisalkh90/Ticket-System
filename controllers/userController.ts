import { Request, Response } from "express";
import User from "../models/userModel";
import { checkUserExists } from "../middleware/errorMiddleware";

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
    await checkUserExists(req, res, email);
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

//get all users
async function getUsers(req: Request, res: Response) {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
}

//get specific user by id
async function getUserById(req: Request, res: Response) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ errorCode: "USER_NOT_FOUND", msg: "User not found" });
    }
    return res.status(200).json(user);
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
}

//update user
async function updateUser(req: Request, res: Response) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ errorCode: "USER_NOT_FOUND", msg: "User not found" });
    }
    const { name, email, role } = req.body;
    await checkUserExists(req, res, email);
    if (name && email && role) {
      user.name = name;
      user.email = email.toLowerCase();
      user.role = role;
    } else {
      return res.status(400).json({
        errorCode: "MISSING_FIELDS",
        msg: "Missing required fields: name, email, role",
      });
    }
    const updatedUser = await user.save();

    return res.status(200).json(updatedUser);
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
}

//delete user by id
async function deleteUser(req: Request, res: Response) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ errorCode: "USER_NOT_FOUND", msg: "User not found" });
    }
    await user.deleteOne();
    return res.status(200).json({ msg: "User deleted" });
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
}

export { createUser, getUsers, getUserById, updateUser, deleteUser };
