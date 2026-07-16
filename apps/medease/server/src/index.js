import express from 'express';
import { connectMongo } from './db/mongo.js';
import summaryRouter from './routes/summary.js';
import appointmentRouter from './routes/appointments.js';
import authRouter from './routes/auth.js';
import './cronjob/appointments.js';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import "dotenv/config";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('common'));
app.use(helmet());
app.use(cors());
app.use(compression());

app.use('/api', summaryRouter);
app.use('/api', appointmentRouter);
app.use('/api', authRouter);

app.listen(3000, async () => {
    await connectMongo();
    console.log('Server running on port 3000');
});