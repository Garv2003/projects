const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(compression());
app.use(helmet());

// Routes
app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/user"));

// testing

app.get("/", (req, res) => {
  res.json({
    message: "Server is running",
  });
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
