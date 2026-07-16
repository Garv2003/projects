import express from "express";
import cors from "cors";
import morgan from "morgan";
import compression from "compression";
import helmet from "helmet";
// import { PrismaClient } from "@prisma/client";

const app = express();
// const prisma = new PrismaClient();

app.use(cors());
app.use(morgan("dev"));
app.use(compression());
app.use(helmet());

app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

// prisma.$connect();

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
