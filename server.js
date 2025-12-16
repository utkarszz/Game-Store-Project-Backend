console.log("🔥 SERVER FILE LOADED");

const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, ".env")
});

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Import models to register them with Mongoose
require("./models/Game");
require("./models/User");

const authRoutes = require("./routes/authRoutes");
const gameRoutes = require("./routes/gameRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/games", gameRoutes);

console.log("DEBUG MONGODB_URI =>", process.env.MONGODB_URI);

const PORT = process.env.PORT|| 5000;
mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
  console.log("MongoDB connected");
  app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT} `);
  });
})
.catch((err)=> console.log(err));
