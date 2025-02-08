//Import Library
const express = require("express");
const cors = require("cors"); //cors
const morgan = require("morgan"); //Logger
const cookieParser = require("cookie-parser");

require("dotenv").config({ path: "./.env" }); //For env file

const PORT = process.env.PORT || 8080;
const app = express();

//Middleware
app.use(express.json()); // Middleware (for parsing JSON data)
app.use(morgan("dev")); //Logging settings

app.use(cookieParser());

const allowedOrigins = process.env.CLIENT_URL;
// Cors Setting
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Default Welcome Message
app.get("/", (req, res) => {
  res.send(`Welcome to Backend Service`);
});

//Main Routing
const route = require("./src/routes/route");
app.use("/", route);

// Error catcher
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ status: 401, message: "invalid token" });
  } else {
    next(err);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
