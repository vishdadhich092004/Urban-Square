import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import connectDB from "./config/db";
import { notFound, errorHandler } from "./middleware/errorMiddleware";

// Import routes
import userRoutes from "./routes/users";
import propertyRoutes from "./routes/properties";
import favoriteRoutes from "./routes/favorites";
import appointmentRoutes from "./routes/appointments";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize express app
const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Set static folder for uploaded images
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Routes
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to Real Estate API" });
});

// Use routes
app.use("/api/users", userRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/appointments", appointmentRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
