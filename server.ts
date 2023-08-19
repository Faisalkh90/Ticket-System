import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/DB";
const app = express();

// Load environment variables
dotenv.config();
// Parse JSON bodies middleware (to let app understand JSON format
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

// Connect to DB and listen to port
connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
  });
});
