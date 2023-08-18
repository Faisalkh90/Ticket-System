import express from "express";
import dotenv from "dotenv";

const app = express();

dotenv.config();
app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
