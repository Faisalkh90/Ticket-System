import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/DB";
import {
  createUser,
  getUsers,
  getUserById,
} from "./controllers/userController";
const app = express();

// Load environment variables
dotenv.config();
// Parse JSON bodies middleware (to let app understand JSON format
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.post("/users", createUser);
app.get("/users", getUsers);
app.get("/users/:id", getUserById);

// Connect to DB and listen to port
connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
  });
});
