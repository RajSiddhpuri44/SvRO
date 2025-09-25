const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const connectDB = require("./config/db");
const bcrypt = require("bcrypt");
const userModel = require("./models/users.model");
var jwt = require("jsonwebtoken");

const authRoute = require("./routes/auth.routes");

const clientRoutes = require("./routes/client.routes");
const serviceRoutes = require("./routes/service.routes");

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// A simple test route
app.get("/", (req, res) => {
  res.send("RO Service CRM API is running...");
});
app.use("/api", authRoute);
app.use("/api/clients", clientRoutes);
app.use("/api/services", serviceRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
