const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const compression = require("compression");
const routes = require("./routes/routes");
const helmet = require("helmet");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 1234;

app.use(compression());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(helmet());

app.use("/", routes);

mongoose.connect(process.env.MONGOOSE_URL).then(() => {
  app.listen(PORT, () => {
    console.log(PORT);
  });
});
