import { Request, Response } from "express";
import User from "../models/userModel";
import {
  checkUserExistsByEmail,
  checkFields,
  checkUserById,
} from "../middleware/errorMiddleware";

// Create a new user
async function createUser(req: Request, res: Response) {
  try {
    const userFields = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };
    await checkFields(req, res, userFields);
    await checkUserExistsByEmail(req, res, userFields.email);
    const newUser = new User({
      name: userFields.name,
      email: userFields.email.toLowerCase(),
      role: userFields.role,
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
    if (users.length === 0) {
      return res.status(200).json({ msg: "No users exist. Please create one" });
    }
    return res.status(200).json(users);
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
}

//get specific user by id
async function getUserById(req: Request, res: Response) {
  try {
    const user = await User.findById(req.params.id);
    return res.status(200).json(user);
  } catch (err: any) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({
        errorCode: "USER_NOT_FOUND",
        msg: "User not found. Please enter valid ID",
      });
    }
    return res.status(500).json({ msg: err.message });
  }
}

//update user
async function updateUser(req: Request, res: Response) {
  try {
    const user: any = await User.findById(req.params.id);
    const { name, email, role } = req.body;
    // await checkUserExistsByEmail(req, res, email);
    await checkFields(req, res, { name, email, role }); //input validation
    for (const key in req.body) {
      //update user after validate fields
      user[key] = req.body[key];
    }
    const updatedUser = await user.save();

    return res
      .status(200)
      .json({ msg: "User updated successfully", updatedUser });
  } catch (err: any) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({
        errorCode: "USER_NOT_FOUND",
        msg: "User not found. Please enter valid ID",
      });
    }
    return res.status(500).json({ msg: err.message });
  }
}

//delete user by id
async function deleteUser(req: Request, res: Response) {
  try {
    const user: any | null = await User.findById(req.params.id);
    await user.deleteOne();
    return res.status(200).json({ msg: "User deleted successfully" });
  } catch (err: any) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({
        errorCode: "USER_NOT_FOUND",
        msg: "User not found. Please enter valid ID",
      });
    }
    return res.status(500).json({ msg: err.message });
  }
}

export { createUser, getUsers, getUserById, updateUser, deleteUser };
