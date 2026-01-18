import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import { ENV } from "./config/env.js";
import path from "path";
import { fileURLToPath } from "url";

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Routes
app.use("/api/users", userRoutes);

app.get("/api", (req, res) => {
  res.json({ message: "Welcome to Talent IQ API" });
});

//make our app for production
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../frontend/dist")));

  app.use((req, res) => {
    res.sendFile(path.resolve(__dirname, "../../frontend/dist/index.html"));
  });
}

// Port configuration
const PORT = ENV.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running in ${ENV.NODE_ENV || "development"} mode on port ${PORT}`,
  );
});
