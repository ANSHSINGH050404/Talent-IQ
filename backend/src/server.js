import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import { ENV } from "./config/env.js";

// Connect to database
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Talent IQ API" });
});

// Routes
app.use("/api/users", userRoutes);

// Port configuration
const PORT = ENV.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running in ${ENV.NODE_ENV || "development"} mode on port ${PORT}`,
  );
});
