import express, { Request, Response } from "express";
import User from "../models/userModel";

async function checkUserExistsByEmail(
  req: Request,
  res: Response,
  email: string,
) {
  const userExists = await User.findOne({ email: email.toLowerCase() }); // check in a case-insensitive also
  if (userExists) {
    throw new Error("User already exists");
  }
}

//generic function to check if all fields are present
async function checkFields<T>(req: Request, res: Response, fields: T) {
  for (const key in fields) {
    if (!fields[key] || String(fields[key]).trim().length === 0) {
      throw new Error(`Missing required field: ${key}`);
    }
  }
}

async function checkUserById(req: Request, res: Response, id: string) {
  console.log(id);
  const user = await User.findById(id);
  console.log(user);
  if (!user) {
    throw new Error("User not found. Please enter a valid user id");
  }
}

export { checkUserExistsByEmail, checkFields, checkUserById };
