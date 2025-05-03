const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("MongoDB connected ✅");
        app.listen(port, () => {
            console.log(`Server running on port ${port} 🚀`);
        });
    })
    .catch((err) => {
        console.error("Error in MongoDB connection ❌", err);
    });
