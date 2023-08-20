import express, { Request, Response } from "express";
import User from "../models/userModel";

async function checkUserExists(req: Request, res: Response, email: string) {
  const userExists = await User.findOne({ email: email.toLowerCase() }); // check in a case-insensitive also
  if (userExists) {
    throw new Error("User already exists");
  }
}

export { checkUserExists };
