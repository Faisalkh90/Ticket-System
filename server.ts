import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/DB";
const app = express();

// Load environment variables
dotenv.config();

app.get("/", (req, res) => {
  res.send("Hello world!");
});

// Connect to DB and listen to port
connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
  });
});
