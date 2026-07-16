import express from "express"
import { rateLimit } from 'express-rate-limit'
import cors from "cors"
import helemt from "helmet"
import compression from "compression"
import morgan from "morgan"
import cookieParser from 'cookie-parser'
import dotenv from "dotenv"

dotenv.config({
    path: './.env'
})

const app: express.Application = express()

//cors
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

//cookie parser
app.use(cookieParser())

//body parsering
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))

//middlewares
app.use(compression())
app.use(helemt())
app.use(morgan("dev"))
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
}))

//routes import
import healthcheckRouter from "./routes/healthcheck.route"
import authRoutes from "./routes/auth.route"
import interviewRouter from "./routes/interview.route"

//routes declaration
app.use('/api/v1/auth', authRoutes);
app.use("/api/v1/healthcheck", healthcheckRouter)
app.use("/api/v1/interview", interviewRouter)

export { app }