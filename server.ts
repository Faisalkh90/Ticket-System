import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/DB";
import userRoutes from "./routes/userRoutes";
import ticketRoutes from "./routes/ticketRoutes";

const app = express();

// Load environment variables
dotenv.config();
// Parse JSON bodies middleware (to let app understand JSON format
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Ticketing System API");
});

// Routes
app.use("/users", userRoutes);
app.use("/tickets", ticketRoutes);

// Connect to DB and listen to port
connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
  });
});
