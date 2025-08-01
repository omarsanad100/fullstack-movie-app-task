import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import entryRoutes from "./routes/entries.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/entries", entryRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// npx nodemon server.js
